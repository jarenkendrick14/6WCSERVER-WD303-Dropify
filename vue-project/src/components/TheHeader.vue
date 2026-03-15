<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/auth';

const cartStore = useCartStore();
const authStore = useAuthStore();

const props = defineProps({
  mode: { type: String, default: 'default' },
  darkText: { type: Boolean, default: false },
  scrolled: { type: Boolean, default: false }
});

const headerClasses = computed(() => ({
  'is-shop-or-admin': props.mode === 'shop' || props.mode === 'admin',
  'is-scrolled': props.scrolled,
}));
</script>

<template>
  <header class="the-header" :class="headerClasses">
    <nav class="nav-inner">
      <div class="nav-left">
        <RouterLink to="/" class="logo">DROPIFY</RouterLink>
        <span v-if="mode === 'admin'" class="admin-tag">Admin</span>
      </div>

      <div class="nav-center" v-if="mode === 'default'">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/shop">Shop</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
        <RouterLink v-if="authStore.isAdmin" to="/admin">Admin</RouterLink>
      </div>

      <div class="nav-center" v-if="mode === 'shop'">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/shop/shirts">Shirts</RouterLink>
        <RouterLink to="/shop/hoodies">Hoodies</RouterLink>
        <RouterLink to="/shop/caps">Caps</RouterLink>
        <RouterLink v-if="authStore.isAdmin" to="/admin">Admin</RouterLink>
      </div>

      <div class="nav-center" v-if="mode === 'admin'">
        <RouterLink to="/admin">Products</RouterLink>
        <RouterLink to="/admin/users">Users</RouterLink>
        <RouterLink to="/admin/orders">Orders</RouterLink>
        <RouterLink to="/shop">View Site</RouterLink>
      </div>

      <div class="nav-right">
        <span v-if="authStore.user" class="welcome">{{ authStore.user.username }}</span>
        <a href="#" @click.prevent="authStore.logout()" class="logout-link">Logout</a>
        <RouterLink v-if="mode !== 'admin'" to="/cart" class="cart-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span v-if="cartStore.totalItems > 0" class="cart-badge">{{ cartStore.totalItems }}</span>
        </RouterLink>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.the-header {
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  z-index: 100;
  height: var(--header-h);
  background-color: transparent;
  color: var(--white);
  border-bottom: 1px solid transparent;
  transition: background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease;
}

.the-header.is-shop-or-admin {
  background-color: var(--surface);
  border-bottom-color: var(--border);
}

.the-header.is-scrolled {
  background-color: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom-color: var(--border);
}

.the-header:not(.is-shop-or-admin):not(.is-scrolled) {
  position: absolute;
}

.nav-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 48px;
  max-width: 1440px;
  margin: 0 auto;
}

.logo {
  font-family: var(--font-display);
  font-size: 1.8rem;
  letter-spacing: 0.05em;
  color: var(--white);
  transition: color var(--transition);
}
.logo:hover { color: var(--gold); }

.admin-tag {
  margin-left: 10px;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gold);
  border: 1px solid var(--gold);
  padding: 2px 8px;
}

.nav-center {
  display: flex;
  align-items: center;
  gap: 36px;
}

.nav-center a {
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gray-light);
  transition: color var(--transition);
  position: relative;
  padding-bottom: 2px;
}

.nav-center a::after {
  content: '';
  position: absolute;
  bottom: -2px; left: 0;
  width: 0; height: 1px;
  background-color: var(--gold);
  transition: width var(--transition);
}

.nav-center a:hover,
.nav-center .router-link-exact-active {
  color: var(--white);
}

.nav-center a:hover::after,
.nav-center .router-link-exact-active::after {
  width: 100%;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.welcome {
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gray);
}

.logout-link {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gray);
  transition: color var(--transition);
  cursor: pointer;
}
.logout-link:hover { color: var(--white); }

.cart-link {
  position: relative;
  display: flex;
  align-items: center;
  color: var(--white);
  transition: color var(--transition);
}
.cart-link:hover { color: var(--gold); }

.cart-badge {
  position: absolute;
  top: -8px; right: -10px;
  background-color: var(--gold);
  color: var(--black);
  border-radius: 50%;
  width: 18px; height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.65rem;
  font-weight: 700;
}

.nav-left { display: flex; align-items: center; }
</style>
