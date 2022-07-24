import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Rellax from 'rellax'

createApp(App).mount('#app')

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
  new Rellax('.rellax')

  window.addEventListener("scroll", reveal);
