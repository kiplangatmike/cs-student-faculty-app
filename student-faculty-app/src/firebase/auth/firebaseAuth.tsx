import { getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBRFsknIr1Os_b0wt8FhoLoD0RKwUTF6uc",
    authDomain: "alu-cs-faculty.firebaseapp.com",
    projectId: "alu-cs-faculty",
    storageBucket: "alu-cs-faculty.appspot.com",
    messagingSenderId: "827567341422",
    appId: "1:827567341422:web:32f0e11b3dce2e30f28b7f"
  };

  let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;