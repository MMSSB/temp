// // fl.js - Firebase Configuration and Core Rules
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
// import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// const firebaseConfig = {
//   apiKey: "AIzaSyAxFiS4eFgjFfCLeLc_xWaLGeoVijNXI3M",
//   authDomain: "my-social-0.firebaseapp.com",
//   projectId: "my-social-0",
//   storageBucket: "my-social-0.firebasestorage.app",
//   messagingSenderId: "263507057041",
//   appId: "1:263507057041:web:7faab616c950f858872230",
//   measurementId: "G-96EBHDYN6Z"
// };
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = getAuth(app);

// // =========================================================================
// // SECURITY CODE (COMMENTED) - RESTRICT ACCESS WITHOUT LOGIN
// // =========================================================================

// onAuthStateChanged(auth, (user) => {
//   if (!user) {
//     window.location.href = 'login.html';
//   }
// });


// // =========================================================================
// // SECURITY CODE (ACTIVE) - ALLOW GUEST ACCESS (GitHub/LinkedIn Style)
// // =========================================================================
// // onAuthStateChanged(auth, (user) => {
// //   if (user) {
// //     console.log("Welcome back:", user.email);
// //   } else {
// //     console.log("Viewing as Guest - Read-only mode activated");
// //   }
// // });

// // =========================================================================
// // POST FORMATTER - TEXT ONLY & LINK DETECTION (NO IMAGES)
// // =========================================================================
// export function formatPostText(text) {
//   let cleanText = text.replace(/<img[^>]*>/g, "");
//   const urlRegex = /(https?:\/\/[^\s]+)/g;
//   cleanText = cleanText.replace(urlRegex, function(url) {
//     return `<a href="${url}" target="_blank" style="color: var(--accent-color); text-decoration: underline; font-weight: 500;">${url}</a>`;
//   });
//   return cleanText;
// }

// export { app, db, auth };





















// fl.js - Firebase Configuration and Core Rules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAxFiS4eFgjFfCLeLc_xWaLGeoVijNXI3M",
  authDomain: "my-social-0.firebaseapp.com",
  projectId: "my-social-0",
  storageBucket: "my-social-0.firebasestorage.app",
  messagingSenderId: "263507057041",
  appId: "1:263507057041:web:7faab616c950f858872230",
  measurementId: "G-96EBHDYN6Z"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// =========================================================================
// POST FORMATTER - TEXT ONLY & LINK DETECTION (NO IMAGES)
// =========================================================================
export function formatPostText(text) {
  let cleanText = text.replace(/<img[^>]*>/g, "");
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  cleanText = cleanText.replace(urlRegex, function(url) {
    return `<a href="${url}" target="_blank" style="color: var(--accent-color); text-decoration: underline; font-weight: 500;">${url}</a>`;
  });
  return cleanText;
}

export { app, db, auth };