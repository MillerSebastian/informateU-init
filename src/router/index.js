import { createRouter, createWebHistory } from "vue-router";
import UserProfile from "../components/UserProfile.vue";
import NewsFeedList from "../components/NewsFeedList.vue";
import UserLogin from "../components/UserLogin.vue";
import ModaCategory from "../components/ModaCategory.vue";
import SportCategory from "../components/SportCategory.vue";
import GamingCategory from "../components/GamingCategory.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: UserLogin },
  { path: "/profile", component: UserProfile },
  { path: "/news-feed", component: NewsFeedList },
  { path: "/moda-feed", component: ModaCategory },
  { path: "/sport-feed", component: SportCategory },
  { path: "/gaming-feed", component: GamingCategory },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
