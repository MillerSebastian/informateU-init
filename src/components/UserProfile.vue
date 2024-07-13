<template>
  <div
    class="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen"
  >
    <form
      @submit.prevent="saveProfile"
      class="bg-white p-6 rounded shadow-md w-full max-w-3xl"
    >
      <div class="flex items-center">
        <div class="mr-6">
          <img
            :src="profileImageUrl"
            alt="Profile Image"
            class="h-24 w-24 rounded-full object-cover"
          />
          <input
            v-if="!saved"
            type="file"
            @change="onFileChange"
            class="mt-2 text-sm text-gray-600"
          />
        </div>
        <div class="flex-1">
          <div class="mb-4">
            <label
              for="username"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Username</label
            >
            <input
              type="text"
              v-model="profile.username"
              :disabled="saved"
              id="username"
              class="w-full mt-2 p-2 border rounded"
            />
          </div>
          <div class="mb-4">
            <label
              for="about"
              class="block text-sm font-medium leading-6 text-gray-900"
              >About</label
            >
            <textarea
              v-model="profile.about"
              :disabled="saved"
              id="about"
              rows="3"
              class="w-full mt-2 p-2 border rounded"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
        <div class="sm:col-span-3">
          <label
            for="first-name"
            class="block text-sm font-medium leading-6 text-gray-900"
            >First name</label
          >
          <input
            type="text"
            v-model="profile.firstName"
            :disabled="saved"
            id="first-name"
            class="w-full mt-2 p-2 border rounded"
          />
        </div>

        <div class="sm:col-span-3">
          <label
            for="last-name"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Last name</label
          >
          <input
            type="text"
            v-model="profile.lastName"
            :disabled="saved"
            id="last-name"
            class="w-full mt-2 p-2 border rounded"
          />
        </div>

        <div class="sm:col-span-4">
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <input
            type="email"
            v-model="profile.email"
            :disabled="saved"
            id="email"
            class="w-full mt-2 p-2 border rounded"
          />
        </div>

        <div class="sm:col-span-2">
          <label
            for="country"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Country</label
          >
          <select
            v-model="profile.country"
            :disabled="saved"
            id="country"
            class="w-full mt-2 p-2 border rounded"
          >
            <option>United States</option>
            <option>Canada</option>
            <option>Mexico</option>
          </select>
        </div>

        <div class="sm:col-span-6">
          <label
            for="street-address"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Street address</label
          >
          <input
            type="text"
            v-model="profile.streetAddress"
            :disabled="saved"
            id="street-address"
            class="w-full mt-2 p-2 border rounded"
          />
        </div>

        <div class="sm:col-span-2">
          <label
            for="city"
            class="block text-sm font-medium leading-6 text-gray-900"
            >City</label
          >
          <input
            type="text"
            v-model="profile.city"
            :disabled="saved"
            id="city"
            class="w-full mt-2 p-2 border rounded"
          />
        </div>

        <div class="sm:col-span-2">
          <label
            for="region"
            class="block text-sm font-medium leading-6 text-gray-900"
            >State / Province</label
          >
          <input
            type="text"
            v-model="profile.region"
            :disabled="saved"
            id="region"
            class="w-full mt-2 p-2 border rounded"
          />
        </div>

        <div class="sm:col-span-2">
          <label
            for="postal-code"
            class="block text-sm font-medium leading-6 text-gray-900"
            >ZIP / Postal code</label
          >
          <input
            type="text"
            v-model="profile.postalCode"
            :disabled="saved"
            id="postal-code"
            class="w-full mt-2 p-2 border rounded"
          />
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <!-- Botón Cancel -->
        <button
          type="button"
          @click="cancelEdit"
          v-if="!saved"
          class="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>

        <button
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {{ saved ? "Edit" : "Save" }}
        </button>

        <button
          @click="logout"
          class="text-sm font-semibold leading-6 text-gray-900"
        >
          Cerrar session
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "UserProfile",
  data() {
    return {
      saved: false,
      profile: {
        username: "",
        about: "",
        firstName: "",
        lastName: "",
        email: "",
        country: "United States",
        streetAddress: "",
        city: "",
        region: "",
        postalCode: "",
      },
      profileImageUrl: "https://via.placeholder.com/150",
      selectedFile: null,
    };
  },
  methods: {
    saveProfile() {
      if (this.saved) {
        this.saved = false;
      } else {
        this.saved = true;
      }
    },
    cancelEdit() {
      this.saved = true;
    },
    onFileChange(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profileImageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
        this.selectedFile = file;
      }
    },
    logout() {
      // Lógica para cerrar sesión
      localStorage.removeItem("auth-token"); // O cualquier otro método de limpieza de sesión
      // Redirigir a la página de inicio de sesión u otra página relevante
      this.$router.push("/login"); // Ajusta la ruta según tu configuración
    },
  },
};
</script>

<style scoped>
/* Agrega aquí los estilos personalizados si es necesario */
</style>
