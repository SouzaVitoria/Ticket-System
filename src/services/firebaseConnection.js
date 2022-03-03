import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBrD03qCXk8mDlUONfDcbGd6ZWM_k-RV4I",
  authDomain: "ticket-system--161.firebaseapp.com",
  projectId: "ticket-system--161",
  storageBucket: "ticket-system--161.appspot.com",
  messagingSenderId: "454512221772",
  appId: "1:454512221772:web:821f82c3b5de0023c81ee9",
  measurementId: "G-E18QZJFY9R"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;