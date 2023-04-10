import { getApp, getApps, initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOt7AnP2cjZSTNcNbziONgLtAOLCc3wjw",
  authDomain: "mygpt-86e66.firebaseapp.com",
  projectId: "mygpt-86e66",
  storageBucket: "mygpt-86e66.appspot.com",
  messagingSenderId: "960697169292",
  appId: "1:960697169292:web:87d929140ca2f127ff12a9",
  measurementId: "G-7YKNH2KSKB"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

export { db }