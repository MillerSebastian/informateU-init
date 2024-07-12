<template>
  <div class="p-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="news in newsList"
        :key="news.id"
        class="bg-white p-4 rounded shadow"
      >
        <img :src="news.image" alt="News Image" class="w-full h-auto rounded" />
        <h3 class="text-xl mt-2">{{ news.title }}</h3>
        <p class="mt-2">{{ news.content }}</p>
      </div>
    </div>

    <!-- Formulario para subir noticias -->
    <form @submit.prevent="submitNews" class="mt-8">
      <h2 class="text-lg font-semibold mb-4">Subir tu estilo</h2>
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700"
          >Título</label
        >
        <input
          v-model="newTitle"
          type="text"
          id="title"
          name="title"
          class="w-full mt-2 p-2 border rounded"
          required
        />
      </div>
      <div class="mb-4">
        <label for="content" class="block text-sm font-medium text-gray-700"
          >Contenido</label
        >
        <textarea
          v-model="newContent"
          id="content"
          name="content"
          rows="4"
          class="w-full mt-2 p-2 border rounded"
          required
        ></textarea>
      </div>
      <div class="mb-4">
        <label for="image" class="block text-sm font-medium text-gray-700"
          >Imagen</label
        >
        <input
          type="file"
          accept="image/*"
          @change="handleImageUpload"
          class="w-full mt-2 p-2 border rounded"
        />
      </div>
      <button type="submit" class="bg-purple-600 text-white p-2 rounded">
        Subir Noticia
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "FashionNewsList",
  data() {
    return {
      newsList: [
        {
          id: 1,
          title: "Noticia de Moda 1",
          content: "Contenido de la noticia de moda 1",
          image: "/path-to-image/news1.jpg",
        },
        {
          id: 2,
          title: "Noticia de Moda 2",
          content: "Contenido de la noticia de moda 2",
          image: "/path-to-image/news2.jpg",
        },
        {
          id: 3,
          title: "Noticia de Moda 3",
          content: "Contenido de la noticia de moda 3",
          image: "/path-to-image/news3.jpg",
        },
        {
          id: 4,
          title: "Noticia de Moda 4",
          content: "Contenido de la noticia de moda 4",
          image: "/path-to-image/news4.jpg",
        },
        // Agregar más noticias según sea necesario
      ],
      newTitle: "",
      newContent: "",
      newImage: null,
    };
  },
  methods: {
    submitNews() {
      // Aquí se simularía el envío del formulario y la subida de la noticia con la imagen
      // Idealmente, se enviaría esta información al servidor para procesamiento
      const newNews = {
        id: this.newsList.length + 1,
        title: this.newTitle,
        content: this.newContent,
        image: URL.createObjectURL(this.newImage), // Simulación de URL de imagen local
      };
      this.newsList.push(newNews);
      // Limpia los campos después de subir la noticia
      this.newTitle = "";
      this.newContent = "";
      this.newImage = null;
    },
    handleImageUpload(event) {
      this.newImage = event.target.files[0];
    },
  },
};
</script>

<style scoped>
/* Estilos adicionales según sea necesario */
</style>
