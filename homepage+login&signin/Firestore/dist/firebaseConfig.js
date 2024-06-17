import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB-yncjKZs8ZjxniipHZFVrGzW9mvjNAyA",
    authDomain: "fir-9-dojo-f4852.firebaseapp.com",
    projectId: "fir-9-dojo-f4852",
    storageBucket: "fir-9-dojo-f4852.appspot.com",
    messagingSenderId: "124390811486",
    appId: "1:124390811486:web:948e7e333cb20adf64d1cf"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
