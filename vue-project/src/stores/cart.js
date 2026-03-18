import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import router from '../router'
import { useAuthStore } from './auth'
import { useNotificationStore } from './notification'
import API_BASE_URL from '../config/api'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const cartTotal = computed(() => {
    return items.value.reduce((total, item) => {
      return total + (item.product ? item.product.price * item.quantity : 0);
    }, 0)
  })

  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const requireAuth = (message) => {
    const authStore = useAuthStore();

    if (authStore.isLoggedIn) {
      return true;
    }

    const notificationStore = useNotificationStore();
    notificationStore.showNotification(message, 'error');

    const redirect = router.currentRoute.value.fullPath;
    router.push({
      name: 'login',
      query: {
        redirect: typeof redirect === 'string' && redirect.startsWith('/') ? redirect : '/',
      },
    });

    return false;
  }

  const getAuthConfig = () => {
    const authStore = useAuthStore();
    return {
      headers: { Authorization: `Bearer ${authStore.token}` },
    };
  };

  async function fetchCart() {
    const authStore = useAuthStore();
    if (!authStore.isLoggedIn) {
      items.value = [];
      return;
    }
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/cart`, getAuthConfig());
      items.value = data;
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      items.value = [];
    }
  }

  async function addToCart(product) {
    if (!requireAuth('Please sign in to add items to your cart.')) {
      return false;
    }

    const notificationStore = useNotificationStore();
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/cart`, {
        productId: product._id,
        quantity: 1,
      }, getAuthConfig());
      items.value = data;
      notificationStore.showNotification(`${product.name} added to cart`);
      return true;
    } catch (error) {
      notificationStore.showNotification('Failed to add item to your cart.', 'error');
      console.error("Failed to add to cart:", error);
      return false;
    }
  }

  async function updateQuantity(productId, newQuantity) {
    if (!requireAuth('Please sign in to manage your cart.')) {
      return;
    }

    const quantity = parseInt(newQuantity, 10);
    if (isNaN(quantity) || quantity < 1) {
      removeFromCart(productId);
      return;
    }
    try {
      const { data } = await axios.put(`${API_BASE_URL}/api/cart`, {
        productId,
        quantity: quantity,
      }, getAuthConfig());
      items.value = data;
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  }

  function increaseQuantity(productId) {
    const item = items.value.find(item => item.product._id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + 1);
    }
  }

  function decreaseQuantity(productId) {
    const item = items.value.find(item => item.product._id === productId);
    if (item) {
      if (item.quantity > 1) {
        updateQuantity(productId, item.quantity - 1);
      } else {
        removeFromCart(productId);
      }
    }
  }
  
  async function removeFromCart(productId) {
    if (!requireAuth('Please sign in to manage your cart.')) {
      return;
    }

    try {
      const { data } = await axios.delete(`${API_BASE_URL}/api/cart/${productId}`, getAuthConfig());
      items.value = data;
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  }
  
  async function clearCart() {
    if (!requireAuth('Please sign in to manage your cart.')) {
      return;
    }

    try {
      const { data } = await axios.delete(`${API_BASE_URL}/api/cart`, getAuthConfig());
      items.value = data; 
    } catch (error) {
      console.error("Failed to clear cart:", error);
      items.value = [];
    }
  }

  function resetCart() {
    items.value = [];
  }

  return { 
    items, 
    cartTotal, 
    totalItems,
    fetchCart, 
    addToCart, 
    increaseQuantity, 
    decreaseQuantity, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    resetCart
  }
})
