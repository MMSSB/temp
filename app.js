// // app.js
// import { auth } from './fl.js';
// import { logoutUser } from './auth.js'; 

// document.addEventListener('DOMContentLoaded', () => {
//     // Stability fix for large desktop viewports to prevent layout squishing
//     const mainContainer = document.querySelector('.main-container');
//     if (mainContainer && window.innerWidth > 1024) {
//         mainContainer.classList.add('desktop-stable-view');
//     }

//     // Attach global logout to any sign out link
//     const signoutBtns = document.querySelectorAll('a[href="login.html"]');
//     signoutBtns.forEach(btn => {
//         if(btn.innerText.toLowerCase().includes('sign out')) {
//             btn.addEventListener('click', (e) => {
//                 e.preventDefault();
//                 logoutUser();
//             });
//         }
//     });
// });


















// app.js - App Maestro: Stability, Logout, and Follow System
import { auth, db } from './fl.js';
import { logoutUser } from './log.js'; 
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, collection, getDocs, query, limit, increment } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. DESKTOP STABILITY FIX
    // ==========================================
    const mainContainer = document.querySelector('.main-container');
    if (mainContainer && window.innerWidth > 1024) {
        mainContainer.classList.add('desktop-stable-view');
    }

    // ==========================================
    // 2. GLOBAL LOGOUT (Fallback for standalone buttons)
    // ==========================================
    const signoutBtns = document.querySelectorAll('a[href="login.html"]');
    signoutBtns.forEach(btn => {
        if(btn.innerText.toLowerCase().includes('sign out')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if(typeof logoutUser === 'function') logoutUser();
            });
        }
    });

    // ==========================================
    // 3. DYNAMIC FOLLOW SYSTEM & SUGGESTIONS
    // ==========================================
    let currentUser = null;
    let currentUserData = null;

    // Listen to Auth State to get current user data
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            currentUser = user;
            try {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    currentUserData = userDoc.data();
                    if (!currentUserData.following) currentUserData.following = [];
                }
                loadSuggestedUsers();
            } catch (e) {
                console.error("Error loading user for suggestions:", e);
            }
        } else {
            loadSuggestedUsers(); // Load for guests too, but prompt login on click
        }
    });

    // Fetch users from DB and inject them into the HTML
    async function loadSuggestedUsers() {
        const mobileSuggestionsList = document.querySelector('.mobile-suggestions-list');
        
        // Find the right sidebar suggested widget
        let desktopSuggestedWidget = null;
        document.querySelectorAll('.right-sidebar .widget-box h3').forEach(h3 => {
            if(h3.innerText.includes('Suggested for you')) {
                desktopSuggestedWidget = h3.parentElement;
            }
        });

        if (!mobileSuggestionsList && !desktopSuggestedWidget) return;

        try {
            const usersRef = collection(db, "users");
            const q = query(usersRef, limit(10)); // Fetch up to 10 users to pick from
            const querySnapshot = await getDocs(q);

            let mobileHTML = '';
            let desktopHTML = `<div class="widget-header-row">
                                 <h3 class="widget-title">Suggested for you</h3>
                               </div>`;
            let count = 0;

            querySnapshot.forEach((docSnap) => {
                if (count >= 4) return; // Limit to 4 suggestions

                const uid = docSnap.id;
                const userData = docSnap.data();

                // Skip showing the current logged-in user in their own suggestions
                if (currentUser && uid === currentUser.uid) return;

                // Check if already following
                const isFollowing = currentUserData && currentUserData.following && currentUserData.following.includes(uid);
                const btnText = isFollowing ? "Following" : "Follow";
                const btnClass = isFollowing ? "btn-follow-sm following-active follow-action-btn" : "btn-follow-sm follow-action-btn";
                
                const name = userData.name || userData.email.split('@')[0];
                const photo = userData.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80";
                const handle = `@${userData.email.split('@')[0]}`;

                // Mobile Horizontal Card HTML
                mobileHTML += `
                    <div class="mobile-suggestion-card">
                        <img src="${photo}" alt="${name}">
                        <h4>${name}</h4>
                        <button class="${btnClass}" data-uid="${uid}">${btnText}</button>
                    </div>
                `;

                // Desktop Sidebar Row HTML
                desktopHTML += `
                    <div class="suggested-user">
                        <img src="${photo}" alt="${name}">
                        <div class="suggested-user-info">
                            <h4>${name}</h4>
                            <span>${handle}</span>
                        </div>
                        <button class="${btnClass}" data-uid="${uid}">${btnText}</button>
                    </div>
                `;
                
                count++;
            });

            if (desktopSuggestedWidget) desktopHTML += `<a href="#" class="view-all-link">View all suggestions</a>`;

            if (mobileSuggestionsList) mobileSuggestionsList.innerHTML = mobileHTML;
            if (desktopSuggestedWidget) desktopSuggestedWidget.innerHTML = desktopHTML;

        } catch (error) {
            console.error("Error loading suggested users:", error);
        }
    }

    // ==========================================
    // 4. HANDLE FOLLOW BUTTON CLICKS (Event Delegation)
    // ==========================================
    document.addEventListener('click', async (e) => {
        if (e.target.classList.contains('follow-action-btn')) {
            e.preventDefault();
            if (!currentUser) return alert("Please log in to follow creators.");

            const btn = e.target;
            const targetUid = btn.getAttribute('data-uid');
            const isFollowing = btn.classList.contains('following-active');

            // Optimistic UI Update (Change instantly for smooth UX)
            btn.classList.toggle('following-active');
            btn.innerText = isFollowing ? "Follow" : "Following";

            try {
                const currentUserRef = doc(db, "users", currentUser.uid);
                const targetUserRef = doc(db, "users", targetUid);

                if (isFollowing) {
                    // UNFOLLOW Action
                    await updateDoc(currentUserRef, { following: arrayRemove(targetUid) });
                    
                    // Decrease target's follower count (using increment handles it safely)
                    await updateDoc(targetUserRef, { followersCount: increment(-1) });
                    
                    if (currentUserData && currentUserData.following) {
                         currentUserData.following = currentUserData.following.filter(id => id !== targetUid);
                    }
                } else {
                    // FOLLOW Action
                    await updateDoc(currentUserRef, { following: arrayUnion(targetUid) });
                    
                    // Increase target's follower count
                    await updateDoc(targetUserRef, { followersCount: increment(1) });
                    
                    if (currentUserData) {
                         if(!currentUserData.following) currentUserData.following = [];
                         currentUserData.following.push(targetUid);
                    }
                }
            } catch (error) {
                console.error("Error updating follow status:", error);
                // Revert UI if database update fails
                btn.classList.toggle('following-active');
                btn.innerText = isFollowing ? "Following" : "Follow";
                alert("Action failed. Please check your connection.");
            }
        }
    });
});