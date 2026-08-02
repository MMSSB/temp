// profile.js - Dynamic Profile & Post Loading
import { db, auth, formatPostText } from './fl.js';
import { collection, getDocs, query, where, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    
    // DOM Elements Selector
    const galleryGrid = document.querySelector('.gallery-grid');
    const profileName = document.querySelector('.profile-name');
    const profileBio = document.querySelector('.profile-bio');
    const avatarImg = document.querySelector('.avatar-lg img');
    const tagsGrid = document.querySelector('.tags-grid');
    const statFollowers = document.querySelectorAll('.stat-item strong')[0];
    const statPosts = document.querySelectorAll('.stat-item strong')[1];
    const profileLink = document.querySelector('.profile-link a');
    const socialLinksContainer = document.querySelector('.social-links');

    // Listen for Authentication State
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            await loadUserProfile(user);
            await loadProfilePosts(user.uid);
        } else {
            if (galleryGrid) {
                galleryGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; color: var(--text-muted);">
                        <i class="ph ph-lock-key" style="font-size: 3rem; margin-bottom: 12px; opacity: 0.5;"></i>
                        <h3 style="color: var(--text-main); margin-bottom: 8px;">Authentication Required</h3>
                        <p>Please <a href="login.html" style="color: var(--accent-color);">log in</a> to view your personal posts and profile data.</p>
                    </div>
                `;
            }
        }
    });

    // ==========================================
    // 1. FETCH & RENDER USER PROFILE DATA
    // ==========================================
    async function loadUserProfile(user) {
        try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            let userData = {};
            
            if (userDoc.exists()) {
                userData = userDoc.data();
            }

            // 1. Avatar (Fallback to default if none provided)
            if (avatarImg) {
                avatarImg.src = userData.photoURL || "images/user.png";
            }

            // 2. Name & Verification Badge
            if (profileName) {
                const displayName = userData.name || user.email.split('@')[0];
                profileName.innerHTML = `${displayName} <i class="ph-fill ph-check-circle verified-badge"></i>`;
            }

            // 3. Bio
            if (profileBio) {
                profileBio.innerText = userData.bio || "I design web and mobile apps that not only work seamlessly but also drive revenue growth for businesses.";
            }

            // 4. Followers Count (Mocked default if not available)
            if (statFollowers) {
                statFollowers.innerText = userData.followersCount || "608";
            }

            // 5. Tags Grid
            if (tagsGrid) {
                const tags = userData.tags || ["Dashboard", "Mobile App", "Web", "Dark", "Light", "UI kits", "3D"];
                tagsGrid.innerHTML = tags.map(tag => `<span class="tag">${tag}</span>`).join('');
            }

            // 6. Custom Website Link
            if (profileLink) {
                const link = userData.website || "u.live/fabian";
                profileLink.href = link.startsWith('http') ? link : `https://${link}`;
                profileLink.innerText = link.replace(/^https?:\/\//, '');
            }

            // 7. Social Media Links
            if (socialLinksContainer) {
                const socials = userData.socials || {
                    twitter: "#",
                    dribbble: "#",
                    behance: "#",
                    instagram: "#"
                };
                
                socialLinksContainer.innerHTML = ''; // Clear default
                
                if (socials.twitter) socialLinksContainer.innerHTML += `<a href="${socials.twitter}" target="_blank" aria-label="Twitter"><i class="ri-twitter-x-line"></i></a>`;
                if (socials.dribbble) socialLinksContainer.innerHTML += `<a href="${socials.dribbble}" target="_blank" aria-label="Dribbble"><i class="ri-dribbble-line"></i></a>`;
                if (socials.behance) socialLinksContainer.innerHTML += `<a href="${socials.behance}" target="_blank" aria-label="Behance"><i class="ri-behance-line"></i></a>`;
                if (socials.instagram) socialLinksContainer.innerHTML += `<a href="${socials.instagram}" target="_blank" aria-label="Instagram"><i class="ri-instagram-line"></i></a>`;
            }
            
        } catch (error) {
            console.error("Error loading profile data:", error);
        }
    }

    // ==========================================
    // 2. FETCH & RENDER USER POSTS
    // ==========================================
    async function loadProfilePosts(userId) {
        if (!galleryGrid) return;

        try {
            const postsRef = collection(db, "posts");
            const q = query(postsRef, where("authorId", "==", userId));
            const querySnapshot = await getDocs(q);
            
            galleryGrid.innerHTML = ''; 
            
            let postCount = 0;

            querySnapshot.forEach((doc) => {
                postCount++;
                const postData = doc.data();
                
                // Text formatting & link injection
                const safeTextContent = formatPostText(postData.content);
                
                const postElement = document.createElement('div');
                postElement.className = 'card card-square animate-fade-up';
                postElement.style.setProperty('--delay', `${0.1 + (postCount * 0.05)}s`); // Staggered Animation
                
                postElement.innerHTML = `
                    <div class="card-preview dark-preview" style="padding: 24px; align-items: flex-start; justify-content: flex-start; overflow-y: auto;">
                        <p style="font-size: 1rem; line-height: 1.6; color: var(--text-main); word-wrap: break-word; white-space: pre-wrap;">
                            ${safeTextContent}
                        </p>
                    </div>
                `;
                
                galleryGrid.appendChild(postElement);
            });

            // Update Post Count Dynamically based on actual fetched posts
            if (statPosts) {
                statPosts.innerText = postCount;
            }

            // Handle Empty State
            if (postCount === 0) {
                galleryGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; color: var(--text-muted);">
                        <i class="ph ph-note-blank" style="font-size: 3rem; margin-bottom: 12px; opacity: 0.5;"></i>
                        <p>No posts yet. Your text-only posts will appear here once you create them.</p>
                    </div>
                `;
            }
            
        } catch (error) {
            console.error("Error loading profile posts:", error);
            galleryGrid.innerHTML = `
                <div style="grid-column: 1 / -1; padding: 40px; text-align: center; color: #ef4444;">
                    Failed to load posts. Please check your connection.
                </div>
            `;
        }
    }
});