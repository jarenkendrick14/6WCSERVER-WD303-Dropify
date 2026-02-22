import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { useAuthStore } from './auth'

// REPLACE THIS URL WITH YOUR RENDER URL
const API_BASE_URL = 'https://sixwcserver-wd303-dropify.onrender.com';

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

  const getAuthConfig = () => {
    const authStore = useAuthStore();
    return {
      headers: { Authorization: `Bearer ${authStore.token}` },
    };
  };

  async function fetchCart() {
    const authStore = useAuthStore();
    if (!authStore.isLoggedIn) return;
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/cart`, getAuthConfig());
      items.value = data;
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      items.value = [];
    }
  }

  async function addToCart(product) {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/api/cart`, {
        productId: product._id,
        quantity: 1,
      }, getAuthConfig());
      items.value = data;
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  }

  async function updateQuantity(productId, newQuantity) {
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
    try {
      const { data } = await axios.delete(`${API_BASE_URL}/api/cart/${productId}`, getAuthConfig());
      items.value = data;
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  }
  
  async function clearCart() {
    try {
      const { data } = await axios.delete(`${API_BASE_URL}/api/cart`, getAuthConfig());
      items.value = data; 
    } catch (error) {
      console.error("Failed to clear cart:", error);
      items.value = [];
    }
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
    clearCart
  }
})