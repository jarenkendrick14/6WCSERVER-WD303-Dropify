<script setup>
import { useCartStore } from '../stores/cart';
import { useNotificationStore } from '../stores/notification';

const props = defineProps({
  product: { type: Object, required: true }
});

const cartStore = useCartStore();
const notificationStore = useNotificationStore();

function addItemToCart() {
  cartStore.addToCart(props.product);
  notificationStore.showNotification(`${props.product.name} added to cart`);
}
</script>

<template>
  <div class="product-card">
    <div class="image-wrap">
      <img :src="product.image" :alt="product.name" class="product-img">
      <div class="card-overlay">
        <button @click="addItemToCart" class="add-btn">Add to Cart</button>
      </div>
    </div>
    <div class="product-info">
      <p class="product-name">{{ product.name }}</p>
      <p class="product-price">₱{{ product.price.toFixed(2) }}</p>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  background-color: var(--surface);
  border: 1px solid var(--border);
  transition: border-color var(--transition), transform 0.3s ease;
  cursor: pointer;
}

.product-card:hover {
  border-color: var(--gold);
  transform: translateY(-3px);
}

.image-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background-color: var(--surface-2);
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  display: block;
}

.product-card:hover .product-img {
  transform: scale(1.06);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: flex-end;
  padding: 20px;
  opacity: 0;
  transition: opacity var(--transition);
}

.product-card:hover .card-overlay {
  opacity: 1;
}

.add-btn {
  width: 100%;
  background-color: var(--gold);
  color: var(--black);
  padding: 12px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: background-color var(--transition);
  transform: translateY(8px);
  transition: transform 0.3s ease, background-color var(--transition);
}

.product-card:hover .add-btn {
  transform: translateY(0);
}

.add-btn:hover {
  background-color: var(--gold-light);
}

.product-info {
  padding: 16px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-name {
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--white);
  flex: 1;
}

.product-price {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--gold);
  white-space: nowrap;
  margin-left: 12px;
}
</style>
