importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js",
);

firebase.initializeApp({
  apiKey: "AIzaSyBXp6of5LIVjmd7WTgDY8QcfMecGBJkGwQ",
  authDomain: "loggl-bcf98.firebaseapp.com",
  projectId: "loggl-bcf98",
  storageBucket: "loggl-bcf98.appspot.com",
  messagingSenderId: "284272360548",
  appId: "1:284272360548:web:99757eff998f46f6743371",
});

const messaging = firebase.messaging();
