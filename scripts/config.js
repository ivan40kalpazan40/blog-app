const firebaseConfig = {
    apiKey: "AIzaSyDRX9-G_SL2PuVl-zAh6QqbPBDs6pSShdQ",
    authDomain: "myblog-a889d.firebaseapp.com",
    projectId: "myblog-a889d",
    storageBucket: "myblog-a889d.appspot.com",
    messagingSenderId: "679675924239",
    appId: "1:679675924239:web:ad453d664fd40caf96387a"
  };

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
