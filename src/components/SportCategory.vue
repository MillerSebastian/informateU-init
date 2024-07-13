<template>
  <div class="sport-feed p-4">
    <h1 class="text-3xl font-bold mb-6">Sport</h1>
    <form @submit.prevent="submitNews" class="mb-6">
      <div class="mb-4">
        <label for="title" class="block text-lg mb-2">Titulo</label>
        <input
          type="text"
          id="title"
          v-model="newPost.title"
          class="border p-2 rounded w-full border-white focus:border-green-500"
          placeholder="Enter the news title"
        />
      </div>
      <div class="mb-4">
        <label for="description" class="block text-lg mb-2">Description</label>
        <textarea
          id="description"
          v-model="newPost.description"
          class="border p-2 rounded w-full border-white focus:border-green-500"
          placeholder="Enter the news description"
        ></textarea>
      </div>
      <div class="col-span-full mb-4">
        <label
          for="file-upload"
          class="block text-lg font-medium text-gray-900"
        >
          Upload your video or image
        </label>
        <div
          class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
        >
          <div class="text-center">
            <svg
              class="mx-auto h-12 w-12 text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 7h4M3 11h4m-4 4h4m5-10h9a2 2 0 012 2v9a2 2 0 01-2 2h-4l-5 5V7z"
              />
            </svg>
            <div class="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                for="file-upload"
                class="relative cursor-pointer rounded-md bg-white font-semibold text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2 hover:text-green-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  class="sr-only"
                  @change="handleFileUpload"
                />
              </label>
              <p class="pl-1">or drag and drop</p>
            </div>
            <p class="text-xs leading-5 text-gray-600">PNG, JPG, GIF</p>
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
      >
        Post News
      </button>
    </form>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="post in posts"
        :key="post.id"
        class="bg-white p-4 rounded shadow-lg"
      >
        <img
          v-if="post.image"
          :src="post.image"
          alt="News Image"
          class="w-full h-48 object-cover mb-4"
        />
        <video
          v-if="post.video"
          controls
          :src="post.video"
          class="w-full h-48 object-cover mb-4"
        ></video>
        <h2 class="text-xl font-semibold mb-2">{{ post.title }}</h2>
        <p>{{ post.description }}</p>

        <div class="flex mt-4">
          <button
            @click="editPost(post)"
            class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-2"
          >
            Edit
          </button>
          <button
            @click="confirmDelete(post.id)"
            class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      newPost: {
        id: null,
        title: "",
        description: "",
        image: null,
        video: null,
      },
      postIdToDelete: null,
    };
  },
  computed: {
    ...mapState(["feeds"]),
    posts() {
      return this.feeds.sport;
    },
  },
  methods: {
    ...mapActions(["fetchFeed", "addPost", "deletePost", "updatePost"]),

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (file.type.startsWith("image/")) {
            this.newPost.image = e.target.result;
            this.newPost.video = null;
          } else if (file.type.startsWith("video/")) {
            this.newPost.video = e.target.result;
            this.newPost.image = null;
          }
        };
        reader.readAsDataURL(file);
      }
    },

    submitNews() {
      if (
        this.newPost.title &&
        this.newPost.description &&
        (this.newPost.image || this.newPost.video)
      ) {
        if (this.newPost.id) {
          this.updatePost({ type: "sport", updatedPost: this.newPost });
        } else {
          const newPost = { ...this.newPost, id: Date.now() };
          this.addPost({ type: "sport", post: newPost });
        }
        this.newPost = {
          id: null,
          title: "",
          description: "",
          image: null,
          video: null,
        };
      }
    },

    editPost(post) {
      this.newPost = { ...post };
      console.log("Edit post:", post);
    },

    confirmDelete(postId) {
      this.postIdToDelete = postId;
      console.log("Confirm delete post:", postId);
    },

    deletePost(postId) {
      this.$store.dispatch("deletePost", { type: "sport", postId });
      console.log("Delete post:", postId);
      this.postIdToDelete = null;
    },
  },

  created() {
    this.fetchFeed("sport");
  },
};
</script>

<style scoped>
.sport-feed h1 {
  color: #09ff00;
}
input.border-white:focus,
textarea.border-white:focus,
input[type="file"].border-white:focus {
  outline: none;
  border-color: #00ff15;
}
</style>
