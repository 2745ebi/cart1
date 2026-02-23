import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCudahxRuOEOs96Lb4YWl5RQmfCB7Cl7wI",
  authDomain: "cart-73136.firebaseapp.com",
  projectId: "cart-73136",
  storageBucket: "cart-73136.firebasestorage.app",
  messagingSenderId: "425022843306",
  appId: "1:425022843306:web:ef1aad3eed833db338e3d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
