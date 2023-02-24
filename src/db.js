import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAJUSwtkE0c1G3oBOOH9py9VgxLdMsxDMo",
    authDomain: "lnchat-6331e.firebaseapp.com",
    projectId: "lnchat-6331e",
    storageBucket: "lnchat-6331e.appspot.com",
    messagingSenderId: "90166850034",
    appId: "1:90166850034:web:0964461e035d05e23dbb6b",
    measurementId: "G-FEMB12SRXS"
  };


  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  export default db