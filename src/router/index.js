import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/search",
      name: "search",
      component: () => import("../views/SearchView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegistrationView.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/recovery",
      name: "recovery",
      component: () => import("../views/RecoveryView.vue"),
    },
    {
      path: "/createitem",
      name: "createitem",
      component: () => import("../views/CreateItem.vue"),
    },
    {
      path: "/item/:id",
      name: "item",
      component: () => import("../views/ItemView.vue"),
    },
    {
      path: "/favorites",
      name: "favorites",
      component: () => import("../views/FavoritesView.vue"),
    },
    {
      path: "/my",
      name: "my",
      component: () => import("../views/OwnItems.vue"),
    },
  ],
});

export default router;
