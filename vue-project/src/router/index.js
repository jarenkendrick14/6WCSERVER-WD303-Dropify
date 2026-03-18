import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Import Layouts
import AdminLayout from '../views/layouts/AdminLayout.vue'

// Import Core Views
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'
import ShopView from '../views/ShopView.vue'
import AdminDashboard from '../views/AdminDashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: AuthView, meta: { guestOnly: true } },
    { path: '/register', name: 'register', component: AuthView, meta: { guestOnly: true } },
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
    { path: '/contact', name: 'contact', component: () => import('../views/ContactView.vue') },
    {
      path: '/shop',
      component: ShopView,
      children: [
        { path: '', redirect: '/shop/shirts' },
        { path: 'shirts', name: 'shirts', component: () => import('../views/shop/ShirtsView.vue') },
        { path: 'hoodies', name: 'hoodies', component: () => import('../views/shop/HoodiesView.vue') },
        { path: 'caps', name: 'caps', component: () => import('../views/shop/CapsView.vue') }
      ]
    },
    { path: '/product/:id', name: 'product', component: () => import('../views/ProductDetailView.vue') },
    { path: '/cart', name: 'cart', component: () => import('../views/CartView.vue'), meta: { requiresAuth: true } },
    { path: '/checkout', name: 'checkout', component: () => import('../views/CheckoutView.vue'), meta: { requiresAuth: true } },
    
    // Admin Section
    {
      path: '/admin',
      component: AdminLayout,
      meta: { requiresAdmin: true },
      children: [
        {
          path: '', // Default admin page is Product Management
          name: 'admin-dashboard',
          component: AdminDashboard
        },
        {
          path: 'users',
          name: 'admin-users',
          component: () => import('../views/UserManagement.vue')
        },
        {
          path: 'orders',
          name: 'admin-orders',
          component: () => import('../views/OrderManagement.vue')
        }
      ]
    },
  ]
})

// Global Navigation Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);
  const requiresAuth = requiresAdmin || to.matched.some((record) => record.meta.requiresAuth);
  const guestOnly = to.matched.some((record) => record.meta.guestOnly);

  if (requiresAuth && !authStore.isLoggedIn) {
    return next({ name: 'login', query: { redirect: to.fullPath } });
  }

  if (requiresAdmin && !authStore.isAdmin) {
    return next({ name: 'home' });
  }

  if (guestOnly && authStore.isLoggedIn) {
    return next(authStore.isAdmin ? '/admin' : '/');
  }

  next();
});

export default router;
