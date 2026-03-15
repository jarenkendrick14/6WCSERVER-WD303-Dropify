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
    { path: '/login', name: 'login', component: AuthView },
    { path: '/register', name: 'register', component: AuthView },
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
    { path: '/cart', name: 'cart', component: () => import('../views/CartView.vue') },
    { path: '/checkout', name: 'checkout', component: () => import('../views/CheckoutView.vue') },
    
    // Admin Section
    {
      path: '/admin',
      component: AdminLayout,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (authStore.isLoggedIn && authStore.isAdmin) {
          next();
        } else {
          next({ name: 'home' });
        }
      },
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
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !authStore.isLoggedIn) {
    return next('/login');
  }
  if (!authRequired && authStore.isLoggedIn) {
    return next('/');
  }

  next();
});

export default router;