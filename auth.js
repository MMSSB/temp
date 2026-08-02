// // // auth.js
// // import { auth, db } from './fl.js';
// // import { 
// //   signInWithEmailAndPassword, 
// //   createUserWithEmailAndPassword, 
// //   signOut 
// // } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// // import { 
// //   doc, 
// //   setDoc, 
// //   serverTimestamp 
// // } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// // document.addEventListener('DOMContentLoaded', () => {
  
// //   // LOGIN LOGIC (login.html)
// //   const loginEmailInput = document.getElementById('login-email');
// //   const loginPasswordInput = document.getElementById('login-password');

// //   if (loginEmailInput && loginPasswordInput) {
// //     const loginForm = loginEmailInput.closest('form');
    
// //     loginForm.addEventListener('submit', (e) => {
// //       e.preventDefault();
      
// //       signInWithEmailAndPassword(auth, loginEmailInput.value, loginPasswordInput.value)
// //         .then(() => {
// //           window.location.href = 'index.html';
// //         })
// //         .catch((error) => {
// //           alert("Invalid credentials. Please try again.");
// //         });
// //     });
// //   }

// //   // SIGN UP LOGIC (signup.html) - Normal Users
// //   const signupNameInput = document.getElementById('signup-name');
// //   const signupEmailInput = document.getElementById('signup-email');
// //   const signupPasswordInput = document.getElementById('signup-password');

// //   if (signupNameInput && signupEmailInput && signupPasswordInput) {
// //     const signupForm = signupEmailInput.closest('form');
    
// //     signupForm.addEventListener('submit', (e) => {
// //       e.preventDefault();

// //       createUserWithEmailAndPassword(auth, signupEmailInput.value, signupPasswordInput.value)
// //         .then(async (userCredential) => {
// //           const user = userCredential.user;
          
// //           try {
// //             await setDoc(doc(db, "users", user.uid), {
// //               uid: user.uid,
// //               name: signupNameInput.value,
// //               email: user.email,
// //               role: "user", // Normal user role
              
// //               // --- Default Platform Profile Data ---
// //               bio: "I design web and mobile apps that not only work seamlessly but also drive revenue growth for businesses.",
// //               tags: ["Dashboard", "Mobile App", "Web", "Dark", "Light", "UI kits", "3D"],
// //               followersCount: "0",
// //               website: "",
// //               photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
// //               socials: {
// //                   twitter: "",
// //                   dribbble: "",
// //                   behance: "",
// //                   instagram: ""
// //               },
// //               createdAt: serverTimestamp()
// //             });
            
// //             window.location.href = 'index.html';
            
// //           } catch (dbError) {
// //             alert("Account created, but failed to save profile data.");
// //           }
// //         })
// //         .catch((error) => {
// //           alert("Error creating account: " + error.message);
// //         });
// //     });
// //   }
// // });

// // export function logoutUser() {
// //   signOut(auth).then(() => {
// //     window.location.href = 'login.html';
// //   });
// // }


















// // // auth.js
// // import { auth, db } from './fl.js';
// // import { 
// //   signInWithEmailAndPassword, 
// //   createUserWithEmailAndPassword, 
// //   signOut,
// //   onAuthStateChanged 
// // } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// // import { 
// //   doc, 
// //   setDoc, 
// //   serverTimestamp 
// // } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// // document.addEventListener('DOMContentLoaded', () => {
  
// //   // ==========================================
// //   // 1. AUTH GUARD FOR LOGIN/SIGNUP PAGES
// //   // ==========================================
// //   // لو اليوزر مسجل دخول بالفعل، حوله فوراً للرئيسية لمنع الريفريش المستمر
// //   onAuthStateChanged(auth, (user) => {
// //     if (user) {
// //       window.location.replace('index.html');
// //     }
// //   });

// //   // ==========================================
// //   // 2. LOGIN LOGIC (login.html)
// //   // ==========================================
// //   const loginEmailInput = document.getElementById('login-email');
// //   const loginPasswordInput = document.getElementById('login-password');

// //   if (loginEmailInput && loginPasswordInput) {
// //     const loginForm = loginEmailInput.closest('form');
    
// //     loginForm.addEventListener('submit', (e) => {
// //       e.preventDefault(); // يمنع الريفريش التلقائي للمتصفح
      
// //       const submitBtn = loginForm.querySelector('button[type="submit"]');
// //       if(submitBtn) submitBtn.disabled = true;

// //       signInWithEmailAndPassword(auth, loginEmailInput.value, loginPasswordInput.value)
// //         .then(() => {
// //           // التحويل بيتم من خلال الـ Auth Guard فوق، بس بنأكد عليه هنا
// //           window.location.replace('index.html');
// //         })
// //         .catch((error) => {
// //           if(submitBtn) submitBtn.disabled = false;
// //           alert("Invalid credentials. Please try again.");
// //         });
// //     });
// //   }

// //   // ==========================================
// //   // 3. SIGN UP LOGIC (signup.html)
// //   // ==========================================
// //   const signupNameInput = document.getElementById('signup-name');
// //   const signupEmailInput = document.getElementById('signup-email');
// //   const signupPasswordInput = document.getElementById('signup-password');

// //   if (signupNameInput && signupEmailInput && signupPasswordInput) {
// //     const signupForm = signupEmailInput.closest('form');
    
// //     signupForm.addEventListener('submit', (e) => {
// //       e.preventDefault(); // يمنع الريفريش التلقائي للمتصفح

// //       const submitBtn = signupForm.querySelector('button[type="submit"]');
// //       if(submitBtn) submitBtn.disabled = true;

// //       createUserWithEmailAndPassword(auth, signupEmailInput.value, signupPasswordInput.value)
// //         .then(async (userCredential) => {
// //           const user = userCredential.user;
          
// //           try {
// //             await setDoc(doc(db, "users", user.uid), {
// //               uid: user.uid,
// //               name: signupNameInput.value,
// //               email: user.email,
// //               role: "user",
// //               bio: "I design web and mobile apps that not only work seamlessly but also drive revenue growth for businesses.",
// //               tags: [""],
// //               followersCount: 0, // خليتها رقم مش نص عشان الحسابات
// //               following: [],
// //               website: "",
// //               photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
// //               socials: {
// //                   twitter: "",
// //                   dribbble: "",
// //                   behance: "",
// //                   instagram: ""
// //               },
// //               createdAt: serverTimestamp()
// //             });
            
// //             window.location.replace('index.html');
            
// //           } catch (dbError) {
// //             if(submitBtn) submitBtn.disabled = false;
// //             alert("Account created, but failed to save profile data.");
// //           }
// //         })
// //         .catch((error) => {
// //           if(submitBtn) submitBtn.disabled = false;
// //           alert("Error creating account: " + error.message);
// //         });
// //     });
// //   }
// // });

// // export function logoutUser() {
// //   signOut(auth).then(() => {
// //     window.location.replace('login.html');
// //   }).catch((error) => {
// //     console.error("Logout Error:", error);
// //   });
// // }







































// // auth.js
// import { auth, db } from './fl.js';
// import { 
//   signInWithEmailAndPassword, 
//   createUserWithEmailAndPassword, 
//   onAuthStateChanged 
// } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// import { 
//   doc, 
//   setDoc, 
//   serverTimestamp 
// } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// document.addEventListener('DOMContentLoaded', () => {
  
//   // ==========================================
//   // 1. SAFE AUTH GUARD FOR LOGIN/SIGNUP PAGES
//   // ==========================================
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//         // إذا كان المستخدم مسجل دخول ويحاول فتح login أو signup، يتم تحويله للرئيسية
//         const currentPath = window.location.pathname.toLowerCase();
//         if (currentPath.includes('login') || currentPath.includes('signup')) {
//             window.location.replace('index.html');
//         }
//     }
//   });

//   // ==========================================
//   // 2. LOGIN LOGIC (login.html)
//   // ==========================================
//   const loginEmailInput = document.getElementById('login-email');
//   const loginPasswordInput = document.getElementById('login-password');

//   if (loginEmailInput && loginPasswordInput) {
//     const loginForm = document.getElementById('login-form');
    
//     if (loginForm) {
//       loginForm.addEventListener('submit', (e) => {
//         e.preventDefault(); 
        
//         const submitBtn = loginForm.querySelector('button[type="submit"]');
//         if(submitBtn) submitBtn.disabled = true;

//         signInWithEmailAndPassword(auth, loginEmailInput.value, loginPasswordInput.value)
//           .then(() => {
//             window.location.replace('index.html');
//           })
//           .catch((error) => {
//             if(submitBtn) submitBtn.disabled = false;
//             alert("Invalid credentials. Please try again.");
//           });
//       });
//     }
//   }

//   // ==========================================
//   // 3. SIGN UP LOGIC (signup.html)
//   // ==========================================
//   const signupNameInput = document.getElementById('signup-name');
//   const signupEmailInput = document.getElementById('signup-email');
//   const signupPasswordInput = document.getElementById('signup-password');

//   if (signupNameInput && signupEmailInput && signupPasswordInput) {
//     const signupForm = document.getElementById('signup-form');
    
//     if (signupForm) {
//       signupForm.addEventListener('submit', (e) => {
//         e.preventDefault(); 

//         const submitBtn = signupForm.querySelector('button[type="submit"]');
//         if(submitBtn) submitBtn.disabled = true;

//         createUserWithEmailAndPassword(auth, signupEmailInput.value, signupPasswordInput.value)
//           .then(async (userCredential) => {
//             const user = userCredential.user;
            
//             try {
//               await setDoc(doc(db, "users", user.uid), {
//                 uid: user.uid,
//                 name: signupNameInput.value,
//                 email: user.email,
//                 role: "user",
//                 bio: "I design web and mobile apps that not only work seamlessly but also drive revenue growth for businesses.",
//                 tags: [""],
//                 followersCount: 0,
//                 following: [],
//                 website: "",
//                 photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
//                 socials: {
//                     twitter: "",
//                     dribbble: "",
//                     behance: "",
//                     instagram: ""
//                 },
//                 createdAt: serverTimestamp()
//               });
              
//               window.location.replace('index.html');
              
//             } catch (dbError) {
//               if(submitBtn) submitBtn.disabled = false;
//               alert("Account created, but failed to save profile data.");
//             }
//           })
//           .catch((error) => {
//             if(submitBtn) submitBtn.disabled = false;
//             alert("Error creating account: " + error.message);
//           });
//       });
//     }
//   }
// });



























// auth.js
import { auth, db } from './fl.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, setDoc, serverTimestamp, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
  
  const loader = document.getElementById('globalLoader');
  const loaderMsg = document.getElementById('loaderMsg');

  function showLoader(msg) {
    if(loaderMsg) loaderMsg.innerText = msg;
    if(loader) loader.classList.add('active');
  }

  function hideLoader() {
    if(loader) loader.classList.remove('active');
  }

  // 1. AUTH GUARD
  onAuthStateChanged(auth, (user) => {
    if (user) {
        const currentPath = window.location.pathname.toLowerCase();
        if (currentPath.includes('login') || currentPath.includes('signup')) {
            window.location.replace('index.html');
        }
    }
  });

  // 2. SIGN UP LOGIC (WITH UNIQUE USERNAME CHECK)
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault(); 

      const name = document.getElementById('signup-name').value;
      const username = document.getElementById('signup-username').value.trim(); // Capitalized via HTML
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;

      showLoader('Verifying Username...');

      try {
        // Check if username is already taken
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            hideLoader();
            alert("This Username is already taken! Please choose another one.");
            return; // Stop signup
        }

        showLoader('Creating Account...');
        
        // Proceed with Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Save to Firestore with the unique username
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: name,
          username: username, // Save uppercase username
          email: user.email,
          role: "user",
          bio: "I design web and mobile apps that not only work seamlessly but also drive revenue growth for businesses.",
          tags: [""],
          followersCount: 0,
          following: [],
          website: "",
          photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
          createdAt: serverTimestamp()
        });
        
        window.location.replace('index.html');
        
      } catch (error) {
        hideLoader();
        alert("Error: " + error.message);
      }
    });
  }

  // 3. LOGIN LOGIC (SUPPORT EMAIL OR USERNAME)
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault(); 
      
      let inputVal = document.getElementById('login-email-user').value.trim();
      const password = document.getElementById('login-password').value;

      showLoader('Authenticating...');

      try {
        let finalEmail = inputVal;

        // If the input does NOT contain '@', treat it as a Username and fetch the associated email
        if (!inputVal.includes('@')) {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("username", "==", inputVal));
            const querySnapshot = await getDocs(q);
            
            if (querySnapshot.empty) {
                hideLoader();
                alert("Username not found. Please check and try again.");
                return;
            }
            // Extract the email from the matched user document
            finalEmail = querySnapshot.docs[0].data().email;
        }

        // Proceed to sign in with the resolved email
        await signInWithEmailAndPassword(auth, finalEmail, password);
        window.location.replace('index.html');

      } catch (error) {
        hideLoader();
        alert("Invalid credentials. Please try again.");
      }
    });
  }
});