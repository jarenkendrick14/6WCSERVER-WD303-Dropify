<script setup>
import { computed, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/auth';

const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();

const props = defineProps({
  mode: { type: String, default: 'default' },
  darkText: { type: Boolean, default: false },
  scrolled: { type: Boolean, default: false }
});

const menuOpen = ref(false);
const toggleMenu = () => { menuOpen.value = !menuOpen.value; };
const closeMenu = () => { menuOpen.value = false; };

const headerClasses = computed(() => ({
  'is-shop-or-admin': props.mode === 'shop' || props.mode === 'admin',
  'is-scrolled': props.scrolled,
}));

function logout() {
  closeMenu();
  authStore.logout();
}
</script>

<template>
  <header class="the-header" :class="headerClasses">
    <nav class="nav-inner">
      <div class="nav-left">
        <RouterLink to="/" class="logo" @click="closeMenu">DROPIFY</RouterLink>
        <span v-if="mode === 'admin'" class="admin-tag">Admin</span>
      </div>

      <!-- Desktop nav -->
      <div class="nav-center desktop-only" v-if="mode === 'default'">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/shop">Shop</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
        <RouterLink v-if="authStore.isAdmin" to="/admin">Admin</RouterLink>
      </div>
      <div class="nav-center desktop-only" v-else-if="mode === 'shop'">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/shop/shirts">Shirts</RouterLink>
        <RouterLink to="/shop/hoodies">Hoodies</RouterLink>
        <RouterLink to="/shop/caps">Caps</RouterLink>
        <RouterLink v-if="authStore.isAdmin" to="/admin">Admin</RouterLink>
      </div>
      <div class="nav-center desktop-only" v-else-if="mode === 'admin'">
        <RouterLink to="/admin">Products</RouterLink>
        <RouterLink to="/admin/users">Users</RouterLink>
        <RouterLink to="/admin/orders">Orders</RouterLink>
        <RouterLink to="/shop">View Site</RouterLink>
      </div>

      <div class="nav-right">
        <span v-if="authStore.user" class="welcome desktop-only">{{ authStore.user.username }}</span>
        <a href="#" @click.prevent="logout" class="logout-link desktop-only">Logout</a>
        <RouterLink v-if="mode !== 'admin'" to="/cart" class="cart-link" @click="closeMenu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span v-if="cartStore.totalItems > 0" class="cart-badge">{{ cartStore.totalItems }}</span>
        </RouterLink>

        <!-- Hamburger -->
        <button class="hamburger mobile-only" @click="toggleMenu" :class="{ open: menuOpen }" aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div v-if="menuOpen" class="mobile-nav">
        <div class="mobile-nav-inner">
          <div class="mobile-links" v-if="mode === 'default' || mode === 'shop'">
            <RouterLink to="/" @click="closeMenu">Home</RouterLink>
            <RouterLink to="/shop/shirts" @click="closeMenu">Shirts</RouterLink>
            <RouterLink to="/shop/hoodies" @click="closeMenu">Hoodies</RouterLink>
            <RouterLink to="/shop/caps" @click="closeMenu">Caps</RouterLink>
            <RouterLink to="/about" @click="closeMenu">About</RouterLink>
            <RouterLink to="/contact" @click="closeMenu">Contact</RouterLink>
            <RouterLink v-if="authStore.isAdmin" to="/admin" @click="closeMenu">Admin Panel</RouterLink>
          </div>
          <div class="mobile-links" v-else-if="mode === 'admin'">
            <RouterLink to="/admin" @click="closeMenu">Products</RouterLink>
            <RouterLink to="/admin/users" @click="closeMenu">Users</RouterLink>
            <RouterLink to="/admin/orders" @click="closeMenu">Orders</RouterLink>
            <RouterLink to="/shop" @click="closeMenu">View Site</RouterLink>
          </div>
          <div class="mobile-footer">
            <span v-if="authStore.user" class="mobile-user">Signed in as {{ authStore.user.username }}</span>
            <a href="#" @click.prevent="logout" class="mobile-logout">Sign Out</a>
          </div>
        </div>
      </div>
    </Transition>
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
  background-color: rgba(10,10,10,0.88);
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
  height: var(--header-h);
  padding: 0 40px;
  max-width: 1440px;
  margin: 0 auto;
}

.logo {
  font-family: var(--font-display);
  font-size: 1.75rem;
  letter-spacing: 0.05em;
  color: var(--white);
  transition: color var(--transition);
}
.logo:hover { color: var(--gold); }

.admin-tag {
  margin-left: 10px;
  font-size: 0.62rem;
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
  gap: 32px;
}

.nav-center a {
  font-size: 0.78rem;
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
.nav-center .router-link-exact-active { color: var(--white); }

.nav-center a:hover::after,
.nav-center .router-link-exact-active::after { width: 100%; }

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.welcome {
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gray);
}

.logout-link {
  font-size: 0.72rem;
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
  font-size: 0.62rem;
  font-weight: 700;
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.hamburger span {
  display: block;
  width: 22px;
  height: 1.5px;
  background-color: var(--white);
  transition: all 0.3s ease;
  transform-origin: center;
}

.hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

/* Mobile Menu */
.mobile-nav {
  position: fixed;
  top: var(--header-h);
  left: 0; right: 0; bottom: 0;
  background-color: rgba(8, 8, 8, 0.97);
  backdrop-filter: blur(20px);
  z-index: 99;
  overflow-y: auto;
}

.mobile-nav-inner {
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.mobile-links {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.mobile-links a {
  font-family: var(--font-display);
  font-size: 2.5rem;
  color: var(--white);
  letter-spacing: 0.04em;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
  transition: color var(--transition);
}

.mobile-links a:first-child { border-top: 1px solid var(--border); }
.mobile-links a:hover { color: var(--gold); }

.mobile-footer {
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-user {
  font-size: 0.78rem;
  color: var(--gray);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.mobile-logout {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--red);
  cursor: pointer;
}

/* Transition */
.mobile-menu-enter-active, .mobile-menu-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.mobile-menu-enter-from, .mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Responsive */
.desktop-only { display: flex; }
.mobile-only { display: none; }

@media (max-width: 768px) {
  .desktop-only { display: none !important; }
  .mobile-only { display: flex !important; }
  .hamburger { display: flex; }
  .nav-inner { padding: 0 20px; }
}

.nav-left { display: flex; align-items: center; }
</style>
