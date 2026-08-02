// /* 
// ==========================================================================
//    [ U.LIVE - HOW TO TRIGGER THE "CREATE POST" MODAL / REDIRECT ]
// ==========================================================================
   
//    You can easily control what happens when a user clicks the Create Post 
//    buttons (Plus button or Input Widget) using the 'data-post-action' attribute.

//    HTML Examples:
   
//    1. FORCE OPEN MODAL:
//    <button id="floatingPlusBtn" data-post-action="modal">Create Post</button>

//    2. FORCE REDIRECT TO PAGE:
//    <button id="floatingPlusBtn" data-post-action="page">Create Post</button>

//    3. SMART AUTO-DETECT (No attribute needed):
//    <button id="floatingPlusBtn">Create Post</button>
//    (If the modal HTML exists on the page, it opens it. If not, it redirects to the page!)
// ==========================================================================
// */

// import { db, auth, formatPostText } from './fl.js';
// import { collection, getDocs, addDoc, query, limit, serverTimestamp, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
// import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// document.addEventListener('DOMContentLoaded', () => {
    
//     // ==========================================
//     // 1. LOAD GLOBAL FEED
//     // ==========================================
//     const feedColumn = document.querySelector('.feed-column');
//     if (feedColumn) {
//         loadGlobalFeed();
//     }

//     async function loadGlobalFeed() {
//         try {
//             const postsRef = collection(db, "posts");
//             const q = query(postsRef, limit(50)); 
//             const querySnapshot = await getDocs(q);
            
//             // Remove skeleton/static posts but KEEP the Create Post Widget
//             const staticPosts = feedColumn.querySelectorAll('article');
//             staticPosts.forEach(post => post.remove());
            
//             if (querySnapshot.empty) {
//                 const emptyState = document.createElement('div');
//                 emptyState.innerHTML = `
//                     <div style="text-align: center; padding: 40px; color: var(--text-muted);">
//                         <i class="ph ph-files" style="font-size: 3rem; margin-bottom: 12px; opacity: 0.5;"></i>
//                         <p>No projects or posts yet. Be the first to share your work in the Arena!</p>
//                     </div>
//                 `;
//                 feedColumn.appendChild(emptyState);
//                 return;
//             }

//             let delayCounter = 0;

//             querySnapshot.forEach((doc) => {
//                 const postData = doc.data();
//                 delayCounter++;
                
//                 const safeTextContent = formatPostText(postData.content || "");
//                 const authorName = postData.authorName || "Anonymous Creator";
//                 const authorAvatar = postData.authorPhoto || "images/user.png";
                
//                 const article = document.createElement('article');
//                 article.className = 'feed-post-card animate-fade-up';
//                 article.style.setProperty('--delay', `${0.1 + (delayCounter * 0.05)}s`);
                
//                 article.innerHTML = `
//                   <div class="post-header">
//                     <img src="${authorAvatar}" alt="${authorName}" class="post-avatar">
//                     <div class="post-meta">
//                       <h4>${authorName} <i class="ph-fill ph-check-circle verified-badge"></i></h4>
//                       <span>Shared a project/post</span>
//                     </div>
//                     <button class="post-options-btn"><i class="ph ph-dots-three"></i></button>
//                   </div>
                  
//                   <div class="post-body">
//                     <p style="font-size: 1rem; color: var(--text-main); line-height: 1.6; word-wrap: break-word; white-space: pre-wrap;">${safeTextContent}</p>
//                   </div>
                  
//                   <div class="post-actions">
//                     <button class="action-btn"><i class="ph ph-heart"></i> Like</button>
//                     <button class="action-btn"><i class="ph ph-chat-circle"></i> Discuss</button>
//                     <button class="action-btn push-right"><i class="ph ph-bookmark-simple"></i></button>
//                   </div>
//                 `;
                
//                 feedColumn.appendChild(article);
//             });
            
//         } catch (error) {
//             console.error("Error loading global feed:", error);
//         }
//     }

//     // ==========================================
//     // 2. OPTIONAL & SMART POST TRIGGERS
//     // ==========================================
//     const floatingPlusBtn = document.getElementById('floatingPlusBtn');
//     const feedCreatePostTrigger = document.getElementById('feedCreatePostTrigger');
//     const createPostOverlay = document.getElementById('createPostOverlay');

//     // Flexible routing logic based on attributes or DOM presence
//     function triggerPostUI(e) {
//         e.preventDefault();
        
//         // Get the specific action if the user added it in HTML
//         const action = this.getAttribute('data-post-action');

//         // 1. Force Page Redirect
//         if (action === 'page') {
//             window.location.href = 'create-post.html';
//             return;
//         }

//         // 2. Force Modal Open (only if modal exists on page)
//         if (action === 'modal' && createPostOverlay) {
//             createPostOverlay.classList.add('active');
//             return;
//         }

//         // 3. Smart Fallback (If no attribute is used)
//         if (createPostOverlay) {
//             createPostOverlay.classList.add('active'); // Modal exists, open it
//         } else {
//             window.location.href = 'create-post.html'; // No modal on page, redirect
//         }
//     }

//     // Attach the logic to both IDs
//     if (floatingPlusBtn) floatingPlusBtn.addEventListener('click', triggerPostUI);
//     if (feedCreatePostTrigger) feedCreatePostTrigger.addEventListener('click', triggerPostUI);

//     // ==========================================
//     // 3. CREATE POST LOGIC (MODAL & STANDALONE)
//     // ==========================================
//     let currentUser = null;
//     let currentUserData = null;

//     onAuthStateChanged(auth, async (user) => {
//         if (user) {
//             currentUser = user;
//             try {
//                 const userDoc = await getDoc(doc(db, "users", user.uid));
//                 if (userDoc.exists()) currentUserData = userDoc.data();
//             } catch (e) {
//                 console.error("Error fetching user for post:", e);
//             }
//         }
//     });

//     const createPostForm = document.getElementById('createPostForm');
//     const postContentInput = document.getElementById('postContentInput');
//     const publishBtn = document.getElementById('publishPostBtn');

//     if (createPostForm && postContentInput && publishBtn) {
//         createPostForm.addEventListener('submit', async (e) => {
//             e.preventDefault();
//             if (!currentUser || !currentUserData) return alert("Please log in to post.");
            
//             const content = postContentInput.value.trim();
//             if (!content) return;

//             publishBtn.innerText = "Publishing...";
//             publishBtn.disabled = true;

//             try {
//                 await addDoc(collection(db, "posts"), {
//                     authorId: currentUser.uid,
//                     authorName: currentUserData.name || currentUser.email.split('@')[0],
//                     authorPhoto: currentUserData.photoURL || "images/user.png",
//                     content: content,
//                     createdAt: serverTimestamp()
//                 });
                
//                 postContentInput.value = "";
//                 publishBtn.innerText = "Publish";
//                 publishBtn.disabled = false;

//                 // Close Modal if exists
//                 if (createPostOverlay) createPostOverlay.classList.remove('active');

//                 // Reload or redirect
//                 if (window.location.pathname.toLowerCase().endsWith('create-post.html')) {
//                     window.location.href = 'index.html';
//                 } else {
//                     if (feedColumn) loadGlobalFeed();
//                 }

//             } catch (error) {
//                 console.error("Error creating post:", error);
//                 alert("Failed to publish post.");
//                 publishBtn.innerText = "Publish";
//                 publishBtn.disabled = false;
//             }
//         });
//     }

//     // ==========================================
//     // 4. DRAG TO CLOSE FOR MOBILE BOTTOM SHEET
//     // ==========================================
//     const closeCreatePostBtn = document.getElementById('closeCreatePostBtn');
//     const createPostDragHeader = document.getElementById('createPostDragHeader');

//     if (closeCreatePostBtn && createPostOverlay) {
//         closeCreatePostBtn.addEventListener('click', () => createPostOverlay.classList.remove('active'));
//         createPostOverlay.addEventListener('click', (e) => {
//             if (e.target === createPostOverlay) createPostOverlay.classList.remove('active');
//         });
//     }

//     if (createPostDragHeader && createPostOverlay) {
//         let startY = 0;
//         let isDragging = false;

//         createPostDragHeader.addEventListener('touchstart', (e) => {
//             startY = e.touches[0].clientY;
//             isDragging = true;
//         }, { passive: true });

//         createPostDragHeader.addEventListener('touchmove', (e) => {
//             if (!isDragging || window.innerWidth > 640) return;
//             const currentY = e.touches[0].clientY;
//             const diff = startY - currentY;
//             if (diff < -50) {
//                 createPostOverlay.classList.remove('active');
//                 isDragging = false;
//             }
//         }, { passive: true });

//         createPostDragHeader.addEventListener('touchend', () => isDragging = false);
//     }
// });



































/* 
==========================================================================
   [ U.LIVE - POSTS, TRENDING TAGS & FEED MAESTRO ]
   Features: Formatting, Tags, Likes, Bookmarks, Deletion & Trending Filter
==========================================================================
*/

import { db, auth } from './fl.js';
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc, query, limit, serverTimestamp, getDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
    let currentUser = null;
    let currentUserData = null;

    // 1. Authenticate and get user details
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            currentUser = user;
            try {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) currentUserData = userDoc.data();
                if (document.querySelector('.feed-column')) loadGlobalFeed();
            } catch (e) {
                console.error("Error fetching user details:", e);
            }
        } else {
            if (document.querySelector('.feed-column')) loadGlobalFeed();
        }
    });

    // Helper: Format text and detect Links
    function formatPostText(text) {
        if (!text) return "";
        let safeText = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        safeText = safeText.replace(urlRegex, '<a href="$1" target="_blank" class="post-link">$1</a>');
        return safeText;
    }

    // ==========================================
    // 2. LOAD GLOBAL FEED & CALCULATE TRENDING
    // ==========================================
    const feedColumn = document.querySelector('.feed-column');

    async function loadGlobalFeed() {
        try {
            const postsRef = collection(db, "posts");
            const q = query(postsRef, limit(100)); // Load more to get better trending data
            const querySnapshot = await getDocs(q);
            
            const staticPosts = feedColumn.querySelectorAll('article');
            staticPosts.forEach(post => post.remove());
            
            if (querySnapshot.empty) {
                const emptyState = document.createElement('div');
                emptyState.innerHTML = `
                    <div style="text-align: center; padding: 40px; color: var(--text-muted);">
                        <i class="ph ph-files" style="font-size: 3rem; margin-bottom: 12px; opacity: 0.5;"></i>
                        <p>No projects or posts yet. Be the first to share your work in the Arena!</p>
                    </div>
                `;
                feedColumn.appendChild(emptyState);
                return;
            }

            let delayCounter = 0;
            let tagCounts = {}; // To store trending tags

            querySnapshot.forEach((postDoc) => {
                const postData = postDoc.data();
                const postId = postDoc.id;
                delayCounter++;
                
                const safeTextContent = formatPostText(postData.content);
                const authorName = postData.authorName || "Anonymous Creator";
                const authorAvatar = postData.authorPhoto || "images/user.png";
                
                // Calculate Tags for Trending & HTML
                let tagsHTML = '';
                let dataTagsAttr = '';
                
                if (postData.tags && postData.tags.length > 0) {
                    // Update Tag Counts
                    postData.tags.forEach(tag => {
                        const cleanTag = tag.replace('#', '').trim().toLowerCase();
                        if (cleanTag) {
                            tagCounts[cleanTag] = (tagCounts[cleanTag] || 0) + 1;
                        }
                    });

                    // Build HTML
                    tagsHTML = `<div class="post-tags-display">` + 
                        postData.tags.map(tag => {
                            const cleanTag = tag.replace('#', '').trim().toLowerCase();
                            return `<span class="post-tag filter-tag-trigger" data-tag="${cleanTag}">#${cleanTag}</span>`;
                        }).join('') + 
                    `</div>`;

                    dataTagsAttr = postData.tags.map(t => t.replace('#', '').trim().toLowerCase()).join(',');
                }

                // Interaction States
                const likesCount = postData.likes ? postData.likes.length : 0;
                const isLiked = currentUser && postData.likes && postData.likes.includes(currentUser.uid) ? 'active-like' : '';
                const likeIcon = isLiked ? 'ph-fill ph-heart' : 'ph ph-heart';

                const savesCount = postData.bookmarks ? postData.bookmarks.length : 0;
                const isSaved = currentUser && postData.bookmarks && postData.bookmarks.includes(currentUser.uid) ? 'active-bookmark' : '';
                const saveIcon = isSaved ? 'ph-fill ph-bookmark-simple' : 'ph ph-bookmark-simple';

                // Post Options
                const isAuthor = currentUser && postData.authorId === currentUser.uid;
                const optionsMenuHTML = isAuthor ? `
                    <div class="post-options-wrapper">
                        <button class="post-options-btn trigger-dropdown" data-target="dropdown-${postId}"><i class="ph ph-dots-three"></i></button>
                        <div class="post-dropdown-menu" id="dropdown-${postId}">
                            <button class="dropdown-action-btn delete-btn delete-post-trigger" data-post-id="${postId}">
                                <i class="ph ph-trash"></i> Delete Post
                            </button>
                        </div>
                    </div>
                ` : `<button class="post-options-btn"><i class="ph ph-dots-three"></i></button>`;

                // Build Element
                const article = document.createElement('article');
                article.className = 'feed-post-card animate-fade-up';
                article.id = `post-${postId}`;
                article.setAttribute('data-tags', dataTagsAttr); // For filtering
                article.style.setProperty('--delay', `${0.1 + (delayCounter * 0.05)}s`);
                
                article.innerHTML = `
                  <div class="post-header">
                    <img src="${authorAvatar}" alt="${authorName}" class="post-avatar">
                    <div class="post-meta">
                      <h4>${authorName} <i class="ph-fill ph-check-circle verified-badge"></i></h4>
                      <span>Shared a post</span>
                    </div>
                    ${optionsMenuHTML}
                  </div>
                  
                  <div class="post-body">
                    <p style="font-size: 1rem; color: var(--text-main); line-height: 1.6; white-space: pre-wrap; word-wrap: break-word;">${safeTextContent}</p>
                    ${tagsHTML}
                  </div>
                  
                  <div class="post-actions">
                    <button class="action-btn like-post-btn ${isLiked}" data-post-id="${postId}">
                        <i class="${likeIcon}"></i> <span class="count">${likesCount}</span>
                    </button>
                    <button class="action-btn comment-btn"><i class="ph ph-chat-circle"></i> Discuss</button>
                    <button class="action-btn push-right bookmark-post-btn ${isSaved}" data-post-id="${postId}">
                        <i class="${saveIcon}"></i>
                    </button>
                  </div>
                `;
                
                feedColumn.appendChild(article);
            });

            // UPDATE TRENDING TOPICS SIDEBAR
            updateTrendingTags(tagCounts);
            
        } catch (error) {
            console.error("Error loading global feed:", error);
        }
    }

    // ==========================================
    // 3. RENDER TRENDING TAGS
    // ==========================================
    function updateTrendingTags(tagCounts) {
        const trendingGrid = document.querySelector('.tags-grid');
        if (!trendingGrid) return;

        // Sort tags by frequency
        const sortedTags = Object.entries(tagCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6); // Top 6 tags

        if (sortedTags.length > 0) {
            trendingGrid.innerHTML = sortedTags.map(([tag, count]) => `
                <span class="tag filter-tag-trigger" data-tag="${tag}" style="cursor: pointer; transition: all 0.2s; border: 1px solid transparent;">
                    #${tag}
                </span>
            `).join('');
        }
    }

    // ==========================================
    // 4. EVENT DELEGATION (Filter, Likes, Saves)
    // ==========================================
    document.addEventListener('click', async (e) => {
        
        // 4.1 Filter Feed by Tag
        if (e.target.closest('.filter-tag-trigger')) {
            const btn = e.target.closest('.filter-tag-trigger');
            const selectedTag = btn.getAttribute('data-tag');
            
            // Highlight active trending tag
            document.querySelectorAll('.tags-grid .tag').forEach(t => {
                t.style.borderColor = 'transparent';
                t.style.color = 'var(--text-muted)';
            });
            if (btn.classList.contains('tag')) {
                btn.style.borderColor = 'var(--accent-color)';
                btn.style.color = 'var(--accent-color)';
            }

            // Filter Posts
            const allPosts = document.querySelectorAll('.feed-post-card[id^="post-"]');
            let visibleCount = 0;

            allPosts.forEach(post => {
                const postTags = post.getAttribute('data-tags');
                if (postTags && postTags.split(',').includes(selectedTag)) {
                    post.style.display = 'block';
                    visibleCount++;
                } else {
                    post.style.display = 'none';
                }
            });

            // Add/Update "Clear Filter" Button in feed tabs
            let clearFilterBtn = document.getElementById('clearFilterBtn');
            const feedTabs = document.querySelector('.feed-tabs');
            
            if (feedTabs) {
                if (!clearFilterBtn) {
                    clearFilterBtn = document.createElement('button');
                    clearFilterBtn.id = 'clearFilterBtn';
                    clearFilterBtn.className = 'tab-btn active';
                    clearFilterBtn.style.background = 'var(--accent-color)';
                    clearFilterBtn.style.color = '#fff';
                    feedTabs.appendChild(clearFilterBtn);
                }
                clearFilterBtn.innerHTML = `Clear: #${selectedTag} <i class="ph ph-x"></i>`;
                clearFilterBtn.style.display = 'inline-flex';
                clearFilterBtn.style.alignItems = 'center';
                clearFilterBtn.style.gap = '6px';
                
                clearFilterBtn.onclick = () => {
                    allPosts.forEach(p => p.style.display = 'block');
                    clearFilterBtn.style.display = 'none';
                    document.querySelectorAll('.tags-grid .tag').forEach(t => {
                        t.style.borderColor = 'transparent';
                        t.style.color = 'var(--text-muted)';
                    });
                };
            }
        }

        // 4.2 Dropdown, Delete, Like, Save logic remains the same...
        if (e.target.closest('.trigger-dropdown')) {
            const btn = e.target.closest('.trigger-dropdown');
            const dropdownId = btn.getAttribute('data-target');
            const dropdown = document.getElementById(dropdownId);
            document.querySelectorAll('.post-dropdown-menu').forEach(menu => {
                if (menu.id !== dropdownId) menu.classList.remove('show');
            });
            if (dropdown) dropdown.classList.toggle('show');
        } else {
            document.querySelectorAll('.post-dropdown-menu').forEach(menu => menu.classList.remove('show'));
        }

        if (e.target.closest('.delete-post-trigger')) {
            if (!confirm("Are you sure you want to delete this post?")) return;
            const btn = e.target.closest('.delete-post-trigger');
            const postId = btn.getAttribute('data-post-id');
            const postCard = document.getElementById(`post-${postId}`);
            
            try {
                postCard.classList.add('deleting');
                setTimeout(() => postCard.remove(), 300);
                await deleteDoc(doc(db, "posts", postId));
            } catch (err) {
                console.error("Error deleting post:", err);
                postCard.classList.remove('deleting');
                alert("Failed to delete post.");
            }
        }

        if (e.target.closest('.like-post-btn')) {
            if (!currentUser) return alert("Please login to like posts.");
            const btn = e.target.closest('.like-post-btn');
            const postId = btn.getAttribute('data-post-id');
            const icon = btn.querySelector('i');
            const countSpan = btn.querySelector('.count');
            const isCurrentlyLiked = btn.classList.contains('active-like');
            
            btn.classList.toggle('active-like');
            icon.className = isCurrentlyLiked ? 'ph ph-heart' : 'ph-fill ph-heart';
            countSpan.innerText = parseInt(countSpan.innerText) + (isCurrentlyLiked ? -1 : 1);

            const postRef = doc(db, "posts", postId);
            try {
                await updateDoc(postRef, {
                    likes: isCurrentlyLiked ? arrayRemove(currentUser.uid) : arrayUnion(currentUser.uid)
                });
            } catch (err) {
                console.error("Error liking post:", err); 
            }
        }

        if (e.target.closest('.bookmark-post-btn')) {
            if (!currentUser) return alert("Please login to save posts.");
            const btn = e.target.closest('.bookmark-post-btn');
            const postId = btn.getAttribute('data-post-id');
            const icon = btn.querySelector('i');
            const isCurrentlySaved = btn.classList.contains('active-bookmark');
            
            btn.classList.toggle('active-bookmark');
            icon.className = isCurrentlySaved ? 'ph ph-bookmark-simple' : 'ph-fill ph-bookmark-simple';

            const postRef = doc(db, "posts", postId);
            try {
                await updateDoc(postRef, {
                    bookmarks: isCurrentlySaved ? arrayRemove(currentUser.uid) : arrayUnion(currentUser.uid)
                });
            } catch (err) {
                console.error("Error saving post:", err);
            }
        }
    });

    // ==========================================
    // 5. CREATE POST UI (Routing & Modals)
    // ==========================================
    const floatingPlusBtn = document.getElementById('floatingPlusBtn');
    const feedCreatePostTrigger = document.getElementById('feedCreatePostTrigger');
    const createPostOverlay = document.getElementById('createPostOverlay');

    function triggerPostUI(e) {
        e.preventDefault();
        const action = this.getAttribute('data-post-action');
        if (action === 'page') {
            window.location.href = 'create-post.html';
            return;
        }
        if (action === 'modal' && createPostOverlay) {
            createPostOverlay.classList.add('active');
            return;
        }
        if (createPostOverlay) {
            createPostOverlay.classList.add('active'); 
        } else {
            window.location.href = 'create-post.html';
        }
    }

    if (floatingPlusBtn) floatingPlusBtn.addEventListener('click', triggerPostUI);
    if (feedCreatePostTrigger) feedCreatePostTrigger.addEventListener('click', triggerPostUI);

    // ==========================================
    // 6. PUBLISH NEW POST
    // ==========================================
    const createPostForm = document.getElementById('createPostForm');
    const postContentInput = document.getElementById('postContentInput');
    const postTagsInput = document.getElementById('postTagsInput'); 
    const publishBtn = document.getElementById('publishPostBtn');

    if (createPostForm && postContentInput && publishBtn) {
        createPostForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!currentUser || !currentUserData) return alert("Please log in to post.");
            
            const content = postContentInput.value.trim();
            if (!content) return;

            let tagsArray = [];
            if (postTagsInput && postTagsInput.value.trim() !== '') {
                tagsArray = postTagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
            }

            publishBtn.innerText = "Publishing...";
            publishBtn.disabled = true;

            try {
                await addDoc(collection(db, "posts"), {
                    authorId: currentUser.uid,
                    authorName: currentUserData.name || currentUser.email.split('@')[0],
                    authorPhoto: currentUserData.photoURL || "images/user.png",
                    content: content,
                    tags: tagsArray,
                    likes: [],
                    bookmarks: [],
                    comments: [],
                    createdAt: serverTimestamp()
                });
                
                postContentInput.value = "";
                if(postTagsInput) postTagsInput.value = "";
                publishBtn.innerText = "Publish";
                publishBtn.disabled = false;

                if (createPostOverlay) createPostOverlay.classList.remove('active');

                if (window.location.pathname.toLowerCase().endsWith('create-post.html')) {
                    window.location.href = 'index.html';
                } else {
                    if (feedColumn) loadGlobalFeed();
                }

            } catch (error) {
                console.error("Error creating post:", error);
                alert("Failed to publish post.");
                publishBtn.innerText = "Publish";
                publishBtn.disabled = false;
            }
        });
    }

    // Bottom Sheet Close Drag Logic
    const closeCreatePostBtn = document.getElementById('closeCreatePostBtn');
    const createPostDragHeader = document.getElementById('createPostDragHeader');

    if (closeCreatePostBtn && createPostOverlay) {
        closeCreatePostBtn.addEventListener('click', () => createPostOverlay.classList.remove('active'));
        createPostOverlay.addEventListener('click', (e) => {
            if (e.target === createPostOverlay) createPostOverlay.classList.remove('active');
        });
    }

    if (createPostDragHeader && createPostOverlay) {
        let startY = 0;
        let isDragging = false;

        createPostDragHeader.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            isDragging = true;
        }, { passive: true });

        createPostDragHeader.addEventListener('touchmove', (e) => {
            if (!isDragging || window.innerWidth > 640) return;
            const currentY = e.touches[0].clientY;
            if ((startY - currentY) < -50) {
                createPostOverlay.classList.remove('active');
                isDragging = false;
            }
        }, { passive: true });

        createPostDragHeader.addEventListener('touchend', () => isDragging = false);
    }
});