import { createStore } from "vuex";

export default createStore({
  state: {
    user: null,
    feeds: {
      news: JSON.parse(localStorage.getItem("news_feed")) || [],
      moda: JSON.parse(localStorage.getItem("moda_feed")) || [],
      sport: JSON.parse(localStorage.getItem("sport_feed")) || [],
      gaming: JSON.parse(localStorage.getItem("gaming_feed")) || [],
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setFeed(state, { type, data }) {
      state.feeds[type] = data;
      localStorage.setItem(`${type}_feed`, JSON.stringify(state.feeds[type]));
    },
    addPost(state, { type, post }) {
      state.feeds[type].push(post);
      localStorage.setItem(`${type}_feed`, JSON.stringify(state.feeds[type]));
    },
    deletePost(state, { type, postId }) {
      state.feeds[type] = state.feeds[type].filter(
        (post) => post.id !== postId
      );
      localStorage.setItem(`${type}_feed`, JSON.stringify(state.feeds[type]));
    },
    updatePost(state, { type, updatedPost }) {
      const index = state.feeds[type].findIndex(
        (post) => post.id === updatedPost.id
      );
      if (index !== -1) {
        state.feeds[type].splice(index, 1, updatedPost);
        localStorage.setItem(`${type}_feed`, JSON.stringify(state.feeds[type]));
      }
    },
  },
  actions: {
    fetchFeed({ commit }, type) {
      const feedData = JSON.parse(localStorage.getItem(`${type}_feed`)) || [];
      commit("setFeed", { type, data: feedData });
    },
    addPost({ commit }, { type, post }) {
      commit("addPost", { type, post });
    },
    deletePost({ commit }, { type, postId }) {
      commit("deletePost", { type, postId });
    },
    updatePost({ commit }, { type, updatedPost }) {
      commit("updatePost", { type, updatedPost });
    },
  },
});
