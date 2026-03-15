<script setup>
import { ref } from 'vue';
import { useCartStore } from '../stores/cart';
import { useAuthStore } from '../stores/auth';
import { useNotificationStore } from '../stores/notification';
import { useRouter } from 'vue-router';
import axios from 'axios';
import API_BASE_URL from '../config/api';

const cartStore = useCartStore();
const authStore = useAuthStore();
const notificationStore = useNotificationStore();
const router = useRouter();

const form = ref({
  name: authStore.user?.username || '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
});

const isLoading = ref(false);

async function placeOrder() {
  if (cartStore.items.length === 0) {
    notificationStore.showNotification('Your cart is empty.', 'error');
    router.push('/shop');
    return;
  }
  isLoading.value = true;
  const orderData = {
    orderItems: cartStore.items.map(item => ({
      _id: item.product._id,
      name: item.product.name,
      quantity: item.quantity,
      image: item.product.image,
      price: item.product.price,
    })),
    shippingAddress: {
      name: form.value.name,
      email: form.value.email,
      address: form.value.address,
      city: form.value.city,
      postalCode: form.value.postalCode,
    },
    totalPrice: cartStore.cartTotal,
  };
  try {
    const config = { headers: { Authorization: `Bearer ${authStore.token}` } };
    await axios.post(`${API_BASE_URL}/api/orders`, orderData, config);
    notificationStore.showNotification('Order placed successfully!');
    await cartStore.fetchCart();
    router.push({ name: 'home' });
  } catch (error) {
    notificationStore.showNotification(error.response?.data?.message || 'Failed to place order.', 'error');
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="checkout-view">
    <div class="checkout-header">
      <p class="eyebrow">Almost There</p>
      <h1 class="checkout-title">Checkout</h1>
    </div>

    <div class="checkout-layout">
      <div class="shipping-section">
        <p class="section-label">Shipping Details</p>
        <form @submit.prevent="placeOrder" id="checkout-form">
          <div class="field">
            <label>Full Name</label>
            <input type="text" v-model="form.name" required />
          </div>
          <div class="field">
            <label>Email Address</label>
            <input type="email" v-model="form.email" required />
          </div>
          <div class="field">
            <label>Street Address</label>
            <input type="text" v-model="form.address" required />
          </div>
          <div class="field-row">
            <div class="field">
              <label>City</label>
              <input type="text" v-model="form.city" required />
            </div>
            <div class="field">
              <label>Postal Code</label>
              <input type="text" v-model="form.postalCode" required />
            </div>
          </div>
        </form>
      </div>

      <div class="order-section">
        <p class="section-label">Your Order</p>
        <div class="order-items">
          <div v-for="item in cartStore.items" :key="item.product._id" class="order-item">
            <div class="order-item-left">
              <img :src="item.product.image" :alt="item.product.name" class="order-img" />
              <div>
                <p class="order-item-name">{{ item.product.name }}</p>
                <p class="order-item-qty">Qty: {{ item.quantity }}</p>
              </div>
            </div>
            <p class="order-item-price">₱{{ (item.product.price * item.quantity).toFixed(2) }}</p>
          </div>
        </div>
        <div class="order-total">
          <span>Total</span>
          <span class="total-val">₱{{ cartStore.cartTotal.toFixed(2) }}</span>
        </div>
        <button type="submit" form="checkout-form" class="place-btn" :disabled="isLoading">
          {{ isLoading ? 'Placing Order...' : 'Place Order' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkout-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 48px 80px;
  color: var(--white);
  background-color: var(--black);
  min-height: 100vh;
}

.checkout-header {
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--border);
}

.eyebrow {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 10px;
}

.checkout-title {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 400;
  letter-spacing: 0.03em;
}

.checkout-layout {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 60px;
  align-items: start;
}

.section-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 28px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
}

.shipping-section form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gray);
}

input {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--white);
  padding: 12px 14px;
  font-size: 0.9rem;
  outline: none;
  transition: border-color var(--transition);
  text-transform: none;
}
input:focus { border-color: var(--gold); }

/* Order section */
.order-section {
  background-color: var(--surface);
  border: 1px solid var(--border);
  padding: 32px;
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid var(--border);
  gap: 12px;
}

.order-item-left {
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
  min-width: 0;
}

.order-img {
  width: 56px;
  height: 56px;
  object-fit: cover;
  background-color: var(--surface-2);
  flex-shrink: 0;
}

.order-item-name {
  font-size: 0.82rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--white);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.order-item-qty {
  font-size: 0.75rem;
  color: var(--gray);
  margin-top: 2px;
}

.order-item-price {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--gold);
  white-space: nowrap;
}

.order-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  font-size: 0.88rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--white);
  border-top: 1px solid var(--border);
  margin-top: 4px;
}

.total-val {
  font-size: 1.1rem;
  color: var(--gold);
}

.place-btn {
  width: 100%;
  margin-top: 20px;
  background-color: var(--gold);
  color: var(--black);
  padding: 16px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: background-color var(--transition);
}
.place-btn:hover:not(:disabled) { background-color: var(--gold-light); }
.place-btn:disabled { background-color: var(--border); color: var(--gray); cursor: not-allowed; }

@media (max-width: 768px) {
  .checkout-view { padding: 20px 14px 60px; }
  .checkout-layout { grid-template-columns: 1fr; gap: 32px; }
  .checkout-title { font-size: 2rem; }
  .field-row { grid-template-columns: 1fr; }
}
</style>
