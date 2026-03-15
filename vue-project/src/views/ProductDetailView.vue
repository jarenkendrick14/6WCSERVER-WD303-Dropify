<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import { useCartStore } from '../stores/cart';
import { useNotificationStore } from '../stores/notification';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const notificationStore = useNotificationStore();

const product = ref(null);
const isLoading = ref(true);
const selectedSize = ref('');
const imgError = ref(false);

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

onMounted(async () => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/products/${route.params.id}`);
    product.value = data;
    // Caps typically don't have sizes
    if (data.category === 'caps') selectedSize.value = 'ONE SIZE';
  } catch {
    router.push('/shop');
  } finally {
    isLoading.value = false;
  }
});

function handleAddToCart() {
  if (product.value.category !== 'caps' && !selectedSize.value) {
    notificationStore.showNotification('Please select a size.', 'error');
    return;
  }
  cartStore.addToCart(product.value);
  notificationStore.showNotification(`${product.value.name} added to cart`);
}
</script>

<template>
  <div class="detail-view">
    <div v-if="isLoading" class="loading-screen">
      <div class="loading-skeleton-img"></div>
      <div class="loading-skeleton-text"></div>
    </div>

    <div v-else-if="product" class="detail-layout">
      <!-- Image side -->
      <div class="detail-image-col">
        <div class="image-wrap">
          <img
            v-if="!imgError"
            :src="product.image"
            :alt="product.name"
            class="product-img"
            @error="imgError = true"
          />
          <div v-else class="no-img">
            <span>Image not available</span>
          </div>
        </div>
      </div>

      <!-- Info side -->
      <div class="detail-info-col">
        <p class="detail-category">{{ product.category }}</p>
        <h1 class="detail-name">{{ product.name }}</h1>
        <p class="detail-price">₱{{ product.price.toFixed(2) }}</p>

        <div class="divider"></div>

        <!-- Size selector (not for caps) -->
        <div v-if="product.category !== 'caps'" class="size-section">
          <p class="size-label">Select Size</p>
          <div class="size-grid">
            <button
              v-for="size in sizes"
              :key="size"
              class="size-btn"
              :class="{ active: selectedSize === size }"
              @click="selectedSize = size"
            >{{ size }}</button>
          </div>
        </div>
        <div v-else class="size-section">
          <p class="size-label">Size</p>
          <p class="one-size">One Size Fits All</p>
        </div>

        <div class="divider"></div>

        <button class="add-btn" @click="handleAddToCart">
          Add to Cart
        </button>

        <button class="back-btn" @click="router.back()">
          &larr; Back
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-view {
  min-height: 100vh;
  background-color: var(--black);
  color: var(--white);
  padding: 0 0 80px;
}

/* Loading */
.loading-screen {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 48px 80px;
}
.loading-skeleton-img {
  aspect-ratio: 1;
  background: var(--surface-2);
  animation: pulse 1.5s infinite;
}
.loading-skeleton-text {
  padding-top: 40px;
  height: 300px;
  background: var(--surface-2);
  animation: pulse 1.5s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.7; }
}

/* Layout */
.detail-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  max-width: 1300px;
  margin: 0 auto;
  padding-top: 72px;
  align-items: start;
}

.detail-image-col {
  position: sticky;
  top: 72px;
}

.image-wrap {
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: var(--surface);
  overflow: hidden;
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease;
}
.product-img:hover { transform: scale(1.03); }

.no-img {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray);
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* Info column */
.detail-info-col {
  padding: 64px 64px 64px 72px;
}

.detail-category {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 16px;
}

.detail-name {
  font-family: var(--font-display);
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 400;
  letter-spacing: 0.04em;
  line-height: 1.1;
  color: var(--white);
  margin-bottom: 20px;
  text-transform: uppercase;
}

.detail-price {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--gold);
  margin-bottom: 0;
}

.divider {
  height: 1px;
  background: var(--border);
  margin: 32px 0;
}

/* Size */
.size-label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gray);
  margin-bottom: 16px;
}

.size-grid {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.size-btn {
  min-width: 52px;
  height: 44px;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--gray-light);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition: all var(--transition);
  padding: 0 12px;
}

.size-btn:hover {
  border-color: var(--white);
  color: var(--white);
}

.size-btn.active {
  border-color: var(--gold);
  color: var(--gold);
  background: rgba(201, 169, 110, 0.08);
}

.one-size {
  font-size: 0.88rem;
  color: var(--gray-light);
  letter-spacing: 0.06em;
}

/* Buttons */
.add-btn {
  width: 100%;
  background-color: var(--gold);
  color: var(--black);
  padding: 18px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: background-color var(--transition);
  margin-bottom: 16px;
}
.add-btn:hover { background-color: var(--gold-light); }

.back-btn {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--gray);
  padding: 12px 24px;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: all var(--transition);
}
.back-btn:hover { border-color: var(--white); color: var(--white); }

/* Responsive */
@media (max-width: 900px) {
  .detail-layout {
    grid-template-columns: 1fr;
  }
  .detail-image-col { position: relative; top: 0; }
  .detail-info-col { padding: 40px 24px; }
  .loading-screen { grid-template-columns: 1fr; padding: 100px 24px 60px; }
}
</style>
