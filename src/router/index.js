// In src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import { simpleCheckAuth, simpleIsAuthenticated } from "../store/auth";

// Import our layout and pages
import MainLayout from "../components/MainLayout.vue";
import LandingPage from "../pages/LandingPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import SignupPage from "../pages/SignupPage.vue";
import DashboardPage from "../pages/DashboardPage.vue";
import TicketsPage from "../pages/TicketsPage.vue";

const routes = [
  {
    // All our pages live inside the MainLayout
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "", // This is the default child route (homepage)
        component: LandingPage,
      },
      {
        path: "/auth/login",
        component: LoginPage,
      },
      {
        path: "/auth/signup",
        component: SignupPage,
      },
      {
        path: "/dashboard",
        component: DashboardPage,
        meta: { requiresAuth: true },
      },
      {
        path: "/tickets",
        component: TicketsPage,
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 3. This is our "Bouncer" (Navigation Guard)
router.beforeEach((to, from, next) => {
  // First, run the check to see if we have a session in localStorage
  simpleCheckAuth();

  const needsAuth = to.meta.requiresAuth;

  if (needsAuth && !simpleIsAuthenticated.value) {
    // If route needs auth and user is NOT logged in, redirect to login
    next("/auth/login");
  } else {
    // Otherwise, let them continue
    next();
  }
});

export default router;
