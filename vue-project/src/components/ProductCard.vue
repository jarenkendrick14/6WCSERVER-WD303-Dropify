<script setup>
import { useCartStore } from '../stores/cart';
import { useRouter } from 'vue-router';

const props = defineProps({
  product: { type: Object, required: true }
});

const cartStore = useCartStore();
const router = useRouter();

function quickAdd(e) {
  e.stopPropagation();
  cartStore.addToCart(props.product);
}

function goToProduct() {
  router.push({ name: 'product', params: { id: props.product._id } });
}
</script>

<template>
  <div class="product-card" @click="goToProduct">
    <div class="image-wrap">
      <img
        :src="product.image"
        :alt="product.name"
        class="product-img"
        loading="lazy"
        @error="$event.target.src = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22><rect width=%22400%22 height=%22400%22 fill=%22%231A1A1A%22/><text x=%22200%22 y=%22210%22 font-family=%22sans-serif%22 font-size=%2214%22 fill=%22%23555%22 text-anchor=%22middle%22>No Image</text></svg>'"
      >
      <div class="card-overlay">
        <button @click="quickAdd" class="add-btn">Quick Add</button>
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
  padding: 16px;
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
  padding: 11px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: background-color var(--transition), transform 0.3s ease;
  transform: translateY(8px);
}

.product-card:hover .add-btn {
  transform: translateY(0);
}

.add-btn:hover {
  background-color: var(--gold-light);
}

.product-info {
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-name {
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--white);
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 8px;
}

.product-price {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--gold);
  white-space: nowrap;
}
</style>
