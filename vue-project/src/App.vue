<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { useCartStore } from './stores/cart'
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue'
import Notification from './components/Notification.vue';
import axios from 'axios';
import API_BASE_URL from './config/api';

const route = useRoute()
const authStore = useAuthStore()
const cartStore = useCartStore()

const scrolled = ref(false)
const handleScroll = () => { scrolled.value = window.scrollY > 50; };

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  if (authStore.isLoggedIn) {
    cartStore.fetchCart();
  }
  // Warm up Railway backend to avoid cold-start delay
  axios.get(`${API_BASE_URL}/`).catch(() => {});
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const isAuthPage = computed(() => route.name === 'login' || route.name === 'register');
const routeKey = computed(() => route.path);

const isShopPage = computed(() => route.path.startsWith('/shop') || route.path.startsWith('/product'));
const isAdminPage = computed(() => route.path.startsWith('/admin'));
const hasLightBackground = computed(() => ['/about', '/contact', '/cart', '/checkout'].includes(route.path));
const headerMode = computed(() => {
  if (isAdminPage.value) return 'admin';
  if (isShopPage.value) return 'shop';
  return 'default';
});
</script>

<template>
  <div class="app-container">
    <TheHeader
      v-if="!isAuthPage"
      :mode="headerMode"
      :dark-text="hasLightBackground"
      :scrolled="scrolled"
    />

    <main>
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="routeKey" />
        </Transition>
      </RouterView>
    </main>

    <TheFooter v-if="!isAuthPage && !isAdminPage" />
    <Notification />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-top: var(--header-h);
}

.app-container:has(main > .auth-view) main {
  padding-top: 0;
}

/* Page transition — slide up + fade */
.page-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.page-leave-active {
  transition: opacity 0.2s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(14px);
}
.page-leave-to {
  opacity: 0;
}
</style>
