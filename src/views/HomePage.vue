<template>
  <div>
    <app-navbar></app-navbar>
    <news-feed-list></news-feed-list>
  </div>
</template>

<script>
import AppNavbar from "../components/AppNavbar.vue";
import NewsFeedList from "../components/NewsFeedList.vue";

export default {
  name: "HomePage",
  components: {
    AppNavbar,
    NewsFeedList,
  },
};
</script>
