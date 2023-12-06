import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnaAx4bFB4N99GwMhPXOd1oMzCQtHEI2Q",
  authDomain: "magnumopus-a5904.firebaseapp.com",
  projectId: "magnumopus-a5904",
  storageBucket: "magnumopus-a5904.appspot.com",
  messagingSenderId: "571023823002",
  appId: "1:571023823002:web:759d407ffa9a7e0e758f23"
};

initializeApp(firebaseConfig);

const app = createApp(App);

app.use(router);

app.mount("#app");
