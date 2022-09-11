import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Particles from 'particles.vue3'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import store from './store'
import router from './router'

createApp(App).use(Particles).use(store).use(router).use(VueSweetalert2).mount('#app')

function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 70;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }

 window.addEventListener("scroll", reveal);
