import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const routes = [
  {
    path: "/login",
    component: () => import("../views/Auth/Login.vue"),
  },
  {
    path: "/oauth/authorize",
    component: () => import("../views/Auth/ConsentScreen.vue"),
  },
  {
    path: "/",
    meta: { requiresAuth: true },
    component: () => import("../views/Home"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters.isLoggedIn;

  if (to.meta.requiresAuth && !isLoggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
