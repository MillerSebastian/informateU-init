<template>
  <nav class="bg-gray-800 p-4 flex justify-between items-center">
    <div class="text-white text-xl font-bold">
      Informate
      <span class="text-yellow-500">ü</span>
    </div>
    <ul class="flex space-x-4">
      <li>
        <router-link to="/profile" class="text-white hover:text-gray-400"
          >PERFIL</router-link
        >
      </li>
      <li>
        <router-link to="/news-feed" class="text-white hover:text-red-500"
          >NOTICIAS</router-link
        >
      </li>
      <li>
        <router-link to="/moda-feed" class="text-white hover:text-purple-500"
          >MODA</router-link
        >
      </li>
      <li>
        <router-link to="/sport-feed" class="text-white hover:text-green-500"
          >DEPORTES</router-link
        >
      </li>
      <li>
        <router-link to="/gaming-feed" class="text-white hover:text-yellow-500"
          >GAMING</router-link
        >
      </li>
    </ul>

    <!-- Redes Sociales -->
    <div class="flex space-x-4">
      <a href="https://www.facebook.com" target="_blank" class="text-white">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="https://www.instagram.com" target="_blank" class="text-white">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="https://www.twitter.com" target="_blank" class="text-white">
        <i class="fab fa-twitter"></i>
      </a>
    </div>
  </nav>
</template>

<script>
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

export default {
  name: "AppNavbar",
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("auth-token");
    },
  },
};
</script>
