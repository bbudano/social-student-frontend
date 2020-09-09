import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA1q_hQlSG5Lcjd-9azf2jY-yCLKPtUaPE",
    authDomain: "social-student-react-upload.firebaseapp.com",
    databaseURL: "https://social-student-react-upload.firebaseio.com",
    projectId: "social-student-react-upload",
    storageBucket: "social-student-react-upload.appspot.com",
    messagingSenderId: "757244682109",
    appId: "1:757244682109:web:68996326b99a7c21757614",
    measurementId: "G-EF5FRWZFPE"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };