<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100"
  >
    <!-- Register Form -->
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4">Register</h2>
      <form @submit.prevent="handleRegister">
        <div class="mb-4">
          <input
            v-model="registerEmail"
            type="email"
            placeholder="Email"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="mb-4">
          <input
            v-model="registerPassword"
            type="password"
            placeholder="Password"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </div>
      </form>
    </div>

    <!-- Login Form -->
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
      <h2 class="text-2xl font-bold mb-4">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <input
            v-model="loginEmail"
            type="email"
            placeholder="Email"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="mb-6">
          <input
            v-model="loginPassword"
            type="password"
            placeholder="Password"
            required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      </form>
    </div>

    <!-- Error Message -->
    <div
      v-if="errorMessage"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-2"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { registerUser, loginUser } from "@/services/firebase.js";

export default {
  name: "UserLogin",
  setup() {
    const router = useRouter();
    const registerEmail = ref("");
    const registerPassword = ref("");
    const loginEmail = ref("");
    const loginPassword = ref("");
    const errorMessage = ref("");

    const handleRegister = async () => {
      try {
        await registerUser(registerEmail.value, registerPassword.value, {
          additional: "data",
        });
        alert("User registered successfully!");
      } catch (error) {
        console.error("Registration failed:", error);
        errorMessage.value = "Registration error: " + error.message;
      }
    };

    const handleLogin = async () => {
      try {
        await loginUser(loginEmail.value, loginPassword.value);
        alert("User logged in successfully!");
        // Aquí deberías verificar si el usuario está autenticado
        // Esto es un ejemplo simplificado, en una aplicación real necesitarás un mecanismo seguro para verificar la autenticación
        const isAuthenticated = true; // Cambia esto por tu lógica de autenticación real
        if (isAuthenticated) {
          router.push("/news-feed");
        } else {
          errorMessage.value = "Login error: User not authenticated";
        }
      } catch (error) {
        console.error("Login failed:", error);
        errorMessage.value = "Login error: " + error.message;
      }
    };

    return {
      registerEmail,
      registerPassword,
      loginEmail,
      loginPassword,
      handleRegister,
      handleLogin,
      errorMessage,
    };
  },
};
</script>

<style scoped>
/* Estilos específicos si es necesario */
</style>
