// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCMuS3VU-vUbBg0egU6peGjVoBjkIoV3H0",
    authDomain: "universo-refugio-app.firebaseapp.com",
    projectId: "universo-refugio-app",
    storageBucket: "universo-refugio-app.firebasestorage.app",
    messagingSenderId: "676590037531",
    appId: "1:676590037531:web:4344da6d762e6d6758e6be",
    measurementId: "12128347726"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore y guarda su instancia
const db = getFirestore(app);

// Exporta las instancias para que puedan ser usadas en otros componentes
export { app, db };