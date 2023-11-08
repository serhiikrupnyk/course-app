import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/database"
import {Vuelidate} from "vuelidate";
import messagePlugin from "@/utils/message.plugin";
import tooltipDirective from "../directives/tooltip.directive";
import PreLoader from "@/components/app/PreLoader.vue";

const firebaseConfig = {
  apiKey: "AIzaSyCPMyDYdlwhR-kHgVi7wGV93dwjH1UwGf8",
  authDomain: "course-tracker-76b7f.firebaseapp.com",
  projectId: "course-tracker-76b7f",
  storageBucket: "course-tracker-76b7f.appspot.com",
  messagingSenderId: "986350716887",
  appId: "1:986350716887:web:876b72e334d5991fc9ed92",
  measurementId: "G-8D2R8M6YGR"
};

firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.component('PreLoader', PreLoader)
Vue.directive('tooltip', tooltipDirective)

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
