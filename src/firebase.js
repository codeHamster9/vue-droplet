import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyC-JqDPAYDMST3kuBkZgyV3k_BonrTCyqk',
  authDomain: 'vuetoo-6546b.firebaseapp.com',
  databaseURL: 'https://vuetoo-6546b.firebaseio.com',
  projectId: 'vuetoo-6546b',
  storageBucket: 'vuetoo-6546b.appspot.com',
  messagingSenderId: '636018148355',
};

firebase.initializeApp(config);

export default firebase.firestore();
