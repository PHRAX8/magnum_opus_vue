import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("../views/UserHome.vue") },
    { path: "/register", component: () => import("../views/UserRegister.vue") },
    { path: "/sign-in", component: () => import("../views/UserSignIn.vue") },
    {
      path: "/feed",
      component: () => import("../views/UserFeed.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/favorites",
      component: () => import("../views/UserImageIds.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/search",
      component: () => import("../views/SearchCats.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const user = await getCurrentUser();
    if (user !== null) {
      next();
    } else {
      alert("You don't have access!");
      next("/");
    }
  } else {
    next();
  }
});

export default router;
