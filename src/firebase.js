import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCudahxRuOEOs96Lb4YWl5RQmfCB7Cl7wI",
  authDomain: "cart-73136.firebaseapp.com",
  projectId: "cart-73136",
  storageBucket: "cart-73136.firebasestorage.app",
  messagingSenderId: "425022843306",
  appId: "1:425022843306:web:ef1aad3eed833db338e3d3"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);