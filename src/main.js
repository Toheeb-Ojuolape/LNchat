import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from './store/store'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import VueQRCodeComponent from 'vue-qrcode-component'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false;
Vue.component('qr-code', VueQRCodeComponent)


const options = {
  confirmButtonColor: "black",
  confirmButtonTextColor:"#0066f5",
  cancelButtonColor: '#000000',
  background:"#f97316",
  color:"#ffffff"
};

Vue.use(VueSweetalert2,options);


const firebaseConfig = {
  apiKey: "AIzaSyAJUSwtkE0c1G3oBOOH9py9VgxLdMsxDMo",
  authDomain: "lnchat-6331e.firebaseapp.com",
  projectId: "lnchat-6331e",
  storageBucket: "lnchat-6331e.appspot.com",
  messagingSenderId: "90166850034",
  appId: "1:90166850034:web:0964461e035d05e23dbb6b",
  measurementId: "G-FEMB12SRXS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  store.dispatch("fetchUser", user);
});

export default analytics;

new Vue({
  vuetify,
  router,
  store,
  VueSweetalert2,
  render: (h) => h(App),
}).$mount("#app");
