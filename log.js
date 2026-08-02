// // log.js - Global Auth Guard, Navbar Avatar Loader, and Logout
// import { auth, db } from './fl.js';
// import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// document.addEventListener('DOMContentLoaded', () => {
//   const currentPage = window.location.pathname.split('/').pop();
//   const isAuthPage = currentPage === 'login.html' || currentPage === 'signup.html';

//   // ==========================================
//   // 1. AUTH GUARD: Protect pages from guests
//   // ==========================================
//   onAuthStateChanged(auth, async (user) => {
//     if (!user) {
//       // If user is NOT logged in and not already on an auth page, redirect to login
//       if (!isAuthPage) {
//         window.location.href = 'login.html';
//       }
//     } else {
//       // If user IS logged in and tries to access login/signup, redirect to index
//       if (isAuthPage) {
//         window.location.href = 'index.html';
//         return;
//       }

//       // ==========================================
//       // 2. LOAD NAVBAR AVATAR IMAGE DYNAMICALLY
//       // ==========================================
//       try {
//         const userDoc = await getDoc(doc(db, "users", user.uid));
//         let avatarUrl = user.photoURL; // Fallback
        
//         if (userDoc.exists() && userDoc.data().photoURL) {
//           avatarUrl = userDoc.data().photoURL;
//         }

//         // Update all navbar and dropdown avatar images across the page
//         const navbarAvatars = document.querySelectorAll('.user-avatar-btn img, .dropdown-header-avatar img');
//         navbarAvatars.forEach(img => {
//           if (avatarUrl) {
//             img.src = avatarUrl;
//           }
//         });
//       } catch (error) {
//         console.error("Error loading navbar avatar:", error);
//       }
//     }
//   });

//   // ==========================================
//   // 3. GLOBAL LOGOUT EVENT BINDING
//   // ==========================================
//   const signoutBtns = document.querySelectorAll('a[href="login.html"], .dropdown-item');
//   signoutBtns.forEach(btn => {
//     if (btn.innerText && btn.innerText.toLowerCase().includes('sign out')) {
//       btn.addEventListener('click', (e) => {
//         e.preventDefault();
//         logoutUser();
//       });
//     }
//   });
// });

// // Exportable Logout Function
// export function logoutUser() {
//   signOut(auth).then(() => {
//     window.location.href = 'login.html';
//   }).catch((error) => {
//     console.error("Logout Error:", error);
//   });
// }




















// // log.js - Global Auth Guard & Main User Data Loader
// import { auth, db } from './fl.js';
// import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// import { doc, getDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// document.addEventListener('DOMContentLoaded', () => {
//   const currentPage = window.location.pathname.split('/').pop();
//   const isAuthPage = currentPage === 'login.html' || currentPage === 'signup.html';

//   // ==========================================
//   // 1. AUTH GUARD: Protect pages from guests
//   // ==========================================
//   onAuthStateChanged(auth, async (user) => {
//     if (!user) {
//       if (!isAuthPage) {
//         window.location.href = 'login.html';
//       }
//     } else {
//       if (isAuthPage) {
//         window.location.href = 'index.html';
//         return;
//       }

//       // ==========================================
//       // 2. MAIN DATA LOADER (Navbar, Dropdown, Mini Profile)
//       // ==========================================
//       try {
//         const userDoc = await getDoc(doc(db, "users", user.uid));
        
//         // Default Fallback Data
//         let userData = {
//             name: user.displayName || "Nerd Arena User",
//             email: user.email || "",
//             photoURL: user.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
//             followersCount: "0",
//             website: ""
//         };

//         // Merge with Firestore Data if exists
//         if (userDoc.exists()) {
//             userData = { ...userData, ...userDoc.data() };
//         }

//         // A. Update ALL Avatars (Navbar, Dropdown, Mini Profile, Post Inputs)
//         const avatarImgs = document.querySelectorAll('.user-avatar-btn img, .dropdown-header-avatar img, .mini-avatar');
//         avatarImgs.forEach(img => {
//           if (userData.photoURL) img.src = userData.photoURL;
//         });

//         // B. Update Dropdown Header Info (If using Design B)
//         const dropdownName = document.querySelector('.dropdown-header-info strong');
//         const dropdownEmail = document.querySelector('.dropdown-header-info span');
//         if (dropdownName) dropdownName.innerText = userData.name;
//         if (dropdownEmail) dropdownEmail.innerText = userData.email;

//         // C. Update Mini Profile Card (Sidebar)
//         const miniInfoName = document.querySelector('.mini-info h4');
//         const miniInfoHandle = document.querySelector('.mini-info p');
        
//         if (miniInfoName) {
//             // Update name but keep the verified badge icon!
//             miniInfoName.innerHTML = `${userData.name} <i class="ph-fill ph-check-circle verified-badge"></i>`;
//         }
        
//         if (miniInfoHandle) {
//             // Create a smart handle (e.g., @mms_builder) from their email
//             const handle = userData.email.split('@')[0];
//             miniInfoHandle.innerText = `@${handle}`;
//         }

//         // D. Update Stats (Followers & Real Post Count)
//         const statsStrongTags = document.querySelectorAll('.mini-stats div strong');
//         if (statsStrongTags.length >= 2) {
//             // Set Followers
//             statsStrongTags[0].innerText = userData.followersCount || "0";
            
//             // Dynamically count this user's posts from Firestore
//             try {
//                 const postsRef = collection(db, "posts");
//                 const q = query(postsRef, where("authorId", "==", user.uid));
//                 const qs = await getDocs(q);
//                 statsStrongTags[1].innerText = qs.size.toString(); // Real post count!
//             } catch (err) {
//                 console.error("Error fetching post count:", err);
//                 statsStrongTags[1].innerText = "0";
//             }
//         }

//       } catch (error) {
//         console.error("Error loading main user data:", error);
//       }
//     }
//   });

//   // ==========================================
//   // 3. GLOBAL LOGOUT EVENT BINDING
//   // ==========================================
//   const signoutBtns = document.querySelectorAll('a[href="login.html"], .dropdown-item');
//   signoutBtns.forEach(btn => {
//     if (btn.innerText && btn.innerText.toLowerCase().includes('sign out')) {
//       btn.addEventListener('click', (e) => {
//         e.preventDefault();
//         logoutUser();
//       });
//     }
//   });
// });

// // Exportable Logout Function
// export function logoutUser() {
//   signOut(auth).then(() => {
//     window.location.href = 'login.html';
//   }).catch((error) => {
//     console.error("Logout Error:", error);
//   });
// }











































// // log.js - Global Auth Guard & Main User Data Loader
// import { auth, db } from './fl.js';
// import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// import { doc, getDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// document.addEventListener('DOMContentLoaded', () => {
//   const currentPage = window.location.pathname.split('/').pop();
//   const isAuthPage = currentPage === 'login.html' || currentPage === 'signup.html';

//   // ==========================================
//   // 1. AUTH GUARD: Protect pages from guests
//   // ==========================================
//   onAuthStateChanged(auth, async (user) => {
//     if (!user) {
//       if (!isAuthPage) {
//         window.location.replace('login.html'); // استخدام replace بيمنع اليوزر من الرجوع بالـ Back
//       }
//     } else {
//       if (isAuthPage) {
//         window.location.replace('index.html');
//         return;
//       }

//       // ==========================================
//       // 2. MAIN DATA LOADER (Navbar, Dropdown, Mini Profile)
//       // ==========================================
//       try {
//         const userDoc = await getDoc(doc(db, "users", user.uid));
        
//         let userData = {
//             name: user.displayName || "Nerd Arena User",
//             email: user.email || "",
//             photoURL: user.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
//             followersCount: "0"
//         };

//         if (userDoc.exists()) {
//             userData = { ...userData, ...userDoc.data() };
//         }

//         // Update Avatars
//         const avatarImgs = document.querySelectorAll('.user-avatar-btn img, .dropdown-header-avatar img, .mini-avatar');
//         avatarImgs.forEach(img => {
//           if (userData.photoURL) img.src = userData.photoURL;
//         });

//         // Update Dropdown Header
//         const dropdownName = document.querySelector('.dropdown-header-info strong');
//         const dropdownEmail = document.querySelector('.dropdown-header-info span');
//         if (dropdownName) dropdownName.innerText = userData.name;
//         if (dropdownEmail) dropdownEmail.innerText = userData.email;

//         // Update Mini Profile Card
//         const miniInfoName = document.querySelector('.mini-info h4');
//         const miniInfoHandle = document.querySelector('.mini-info p');
        
//         if (miniInfoName) miniInfoName.innerHTML = `${userData.name} <i class="ph-fill ph-check-circle verified-badge"></i>`;
//         if (miniInfoHandle) miniInfoHandle.innerText = `@${userData.email.split('@')[0]}`;

//         // Update Stats (Followers & Posts)
//         const statsStrongTags = document.querySelectorAll('.mini-stats div strong');
//         if (statsStrongTags.length >= 2) {
//             statsStrongTags[0].innerText = userData.followersCount || "0";
            
//             try {
//                 const postsRef = collection(db, "posts");
//                 const q = query(postsRef, where("authorId", "==", user.uid));
//                 const qs = await getDocs(q);
//                 statsStrongTags[1].innerText = qs.size.toString();
//             } catch (err) {
//                 console.error("Error fetching post count:", err);
//             }
//         }

//       } catch (error) {
//         console.error("Error loading main user data:", error);
//       }
//     }
//   });

//   // ==========================================
//   // 3. SECURE LOGOUT EVENT BINDING
//   // ==========================================
//   // بنستهدف الزرار الجديد اللي عملناه
//   const signoutBtns = document.querySelectorAll('.logout-action-btn');
  
//   signoutBtns.forEach(btn => {
//     btn.addEventListener('click', async (e) => {
//       e.preventDefault();
//       try {
//         // بنقفل الجلسة الأول من الفايربيز
//         await signOut(auth);
//         // بنمسح الـ Cache أو أي بيانات محلية لو حابب
//         localStorage.removeItem('ulive-theme'); // اختياري
//         // بنحول اليوزر لصفحة اللوجين وبنمنعه يرجع باك
//         window.location.replace('login.html');
//       } catch (error) {
//         console.error("Logout Error:", error);
//         alert("Failed to sign out. Please try again.");
//       }
//     });
//   });
// });

// export function logoutUser() {
//   signOut(auth).then(() => {
//     window.location.replace('login.html');
//   }).catch((error) => {
//     console.error("Logout Error:", error);
//   });
// }






























// log.js - Global Auth Guard & Main User Data Loader
import { auth, db } from './fl.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, getDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop();
  const isAuthPage = currentPage === 'login.html' || currentPage === 'signup.html';

  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      if (!isAuthPage) {
        window.location.replace('login.html');
      }
    } else {
      if (isAuthPage) {
        window.location.replace('index.html');
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        
        let userData = {
            name: user.displayName || "Nerd Arena User",
            email: user.email || "",
            photoURL: user.photoURL || "images/user.png",
            followersCount: "0"
        };

        if (userDoc.exists()) {
            userData = { ...userData, ...userDoc.data() };
        }

        // Update Avatars
        const avatarImgs = document.querySelectorAll('.user-avatar-btn img, .dropdown-header-avatar img, .mini-avatar');
        avatarImgs.forEach(img => {
          if (userData.photoURL) img.src = userData.photoURL;
        });

        // Update Dropdown Header
        const dropdownName = document.querySelector('.dropdown-header-info strong');
        const dropdownEmail = document.querySelector('.dropdown-header-info span');
        if (dropdownName) dropdownName.innerText = userData.name;
        if (dropdownEmail) dropdownEmail.innerText = userData.email;

        // Update Mini Profile Card (Fixed Username Load)[cite: 14]
        const miniInfoName = document.querySelector('.mini-info h4');
        const miniInfoHandle = document.querySelector('.mini-info p');
        
        if (miniInfoName) miniInfoName.innerHTML = `${userData.name} <i class="ph-fill ph-check-circle verified-badge"></i>`;
        if (miniInfoHandle) {
            const handle = userData.username || userData.email.split('@')[0];
            miniInfoHandle.innerText = `@${handle}`;
        }

        // Update Stats
        const statsStrongTags = document.querySelectorAll('.mini-stats div strong');
        if (statsStrongTags.length >= 2) {
            statsStrongTags[0].innerText = userData.followersCount || "0";
            try {
                const postsRef = collection(db, "posts");
                const q = query(postsRef, where("authorId", "==", user.uid));
                const qs = await getDocs(q);
                statsStrongTags[1].innerText = qs.size.toString();
            } catch (err) {
                console.error("Error fetching post count:", err);
            }
        }

      } catch (error) {
        console.error("Error loading main user data:", error);
      }
    }
  });

  const signoutBtns = document.querySelectorAll('.logout-action-btn');
  signoutBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await signOut(auth);
        localStorage.removeItem('ulive-theme');
        window.location.replace('login.html');
      } catch (error) {
        console.error("Logout Error:", error);
      }
    });
  });
});

export function logoutUser() {
  signOut(auth).then(() => {
    window.location.replace('login.html');
  }).catch((error) => {
    console.error("Logout Error:", error);
  });
}