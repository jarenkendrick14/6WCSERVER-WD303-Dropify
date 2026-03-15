<script setup>
import { useCartStore } from '../stores/cart';
import { RouterLink } from 'vue-router';

const cartStore = useCartStore();

let debounceTimer = null;
const handleQuantityInput = (productId, event) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    cartStore.updateQuantity(productId, event.target.value);
  }, 500);
};
</script>

<template>
  <div class="cart-view">
    <div class="cart-header-row">
      <div>
        <p class="eyebrow">Your Bag</p>
        <h1 class="cart-title">Shopping Cart</h1>
      </div>
      <RouterLink to="/shop" class="continue-link">Continue Shopping &rarr;</RouterLink>
    </div>

    <div v-if="!cartStore.items || cartStore.items.length === 0" class="empty-cart">
      <p class="empty-title">Your bag is empty.</p>
      <RouterLink to="/shop" class="shop-btn">Browse Collection</RouterLink>
    </div>

    <div v-else class="cart-body">
      <div class="cart-items">
        <div class="cart-col-headers">
          <span>Product</span>
          <span class="center">Quantity</span>
          <span class="right">Total</span>
          <span></span>
        </div>

        <div v-for="item in cartStore.items" :key="item.product._id" class="cart-row">
          <div class="product-col">
            <img :src="item.product.image" :alt="item.product.name" class="item-img" />
            <div>
              <p class="item-name">{{ item.product.name }}</p>
              <p class="item-unit-price">₱{{ item.product.price.toFixed(2) }} each</p>
            </div>
          </div>

          <div class="qty-col">
            <div class="qty-control">
              <button @click="cartStore.decreaseQuantity(item.product._id)" class="qty-btn">−</button>
              <input
                type="number"
                :value="item.quantity"
                @input="handleQuantityInput(item.product._id, $event)"
                min="0"
                class="qty-input"
              />
              <button @click="cartStore.increaseQuantity(item.product._id)" class="qty-btn">+</button>
            </div>
          </div>

          <div class="total-col">
            <p class="item-total">₱{{ (item.product.price * item.quantity).toFixed(2) }}</p>
          </div>

          <div class="remove-col">
            <button @click="cartStore.removeFromCart(item.product._id)" class="remove-btn" title="Remove">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
      </div>

      <div class="cart-summary">
        <div class="summary-box">
          <p class="summary-label">Order Summary</p>
          <div class="summary-row">
            <span>Subtotal</span>
            <span>₱{{ cartStore.cartTotal.toFixed(2) }}</span>
          </div>
          <div class="summary-row summary-total">
            <span>Total</span>
            <span class="total-amount">₱{{ cartStore.cartTotal.toFixed(2) }}</span>
          </div>
          <RouterLink to="/checkout" class="checkout-btn">Proceed to Checkout</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 48px 80px;
  color: var(--white);
  background-color: var(--black);
  min-height: 100vh;
  box-sizing: border-box;
  width: 100%;
}

.cart-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 48px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--border);
  gap: 32px;
  flex-wrap: wrap;
}

.eyebrow {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 8px;
}

.cart-title {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 400;
  letter-spacing: 0.03em;
}

.continue-link {
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gray);
  transition: color var(--transition);
}
.continue-link:hover { color: var(--white); }

/* Empty */
.empty-cart {
  text-align: center;
  padding: 100px 0;
}
.empty-title {
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--gray);
  margin-bottom: 32px;
  letter-spacing: 0.04em;
}
.shop-btn {
  display: inline-block;
  background-color: var(--gold);
  color: var(--black);
  padding: 14px 40px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: background-color var(--transition);
}
.shop-btn:hover { background-color: var(--gold-light); }

/* Cart body */
.cart-body {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 60px;
  align-items: start;
}

.cart-col-headers {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 40px;
  gap: 16px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gray);
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 0;
}
.center { text-align: center; }
.right { text-align: right; }

.cart-row {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 40px;
  gap: 16px;
  align-items: center;
  padding: 24px 0;
  border-bottom: 1px solid var(--border);
}

.product-col {
  display: flex;
  align-items: center;
  gap: 20px;
}

.item-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  background-color: var(--surface-2);
  flex-shrink: 0;
}

.item-name {
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--white);
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.item-unit-price {
  font-size: 0.78rem;
  color: var(--gray);
}

.qty-col { display: flex; justify-content: center; }

.qty-control {
  display: flex;
  align-items: center;
  border: 1px solid var(--border);
}

.qty-btn {
  background: var(--surface);
  color: var(--white);
  border: none;
  width: 32px;
  height: 36px;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color var(--transition);
}
.qty-btn:hover { background: var(--surface-2); }

.qty-input {
  width: 44px;
  height: 36px;
  text-align: center;
  border: none;
  border-left: 1px solid var(--border);
  border-right: 1px solid var(--border);
  background: transparent;
  color: var(--white);
  font-size: 0.9rem;
  -moz-appearance: textfield;
}
.qty-input::-webkit-outer-spin-button,
.qty-input::-webkit-inner-spin-button { -webkit-appearance: none; }

.total-col { text-align: right; }
.item-total { font-size: 0.9rem; font-weight: 600; color: var(--gold); }

.remove-col { display: flex; justify-content: flex-end; }
.remove-btn {
  background: transparent;
  border: none;
  color: var(--gray);
  cursor: pointer;
  padding: 4px;
  transition: color var(--transition);
}
.remove-btn:hover { color: var(--red); }

/* Summary */
.summary-box {
  background-color: var(--surface);
  border: 1px solid var(--border);
  padding: 32px;
}

.summary-label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.88rem;
  color: var(--gray-light);
  padding: 10px 0;
}

.summary-total {
  border-top: 1px solid var(--border);
  margin-top: 8px;
  padding-top: 16px;
  font-weight: 600;
  color: var(--white);
  font-size: 1rem;
}

.total-amount { color: var(--gold); }

.checkout-btn {
  display: block;
  text-align: center;
  margin-top: 24px;
  background-color: var(--gold);
  color: var(--black);
  padding: 15px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: background-color var(--transition);
}
.checkout-btn:hover { background-color: var(--gold-light); }

@media (max-width: 768px) {
  .cart-view { padding: 20px 14px 60px; }
  .cart-body { grid-template-columns: 1fr; gap: 32px; }
  .cart-header-row { flex-direction: column; align-items: flex-start; gap: 8px; }
  .cart-title { font-size: 2rem; }
  .cart-col-headers { display: none; }
  .cart-row {
    grid-template-columns: 1fr;
    gap: 12px;
    position: relative;
    padding: 20px 0;
  }
  .product-col { flex-direction: row; }
  .item-img { width: 64px; height: 64px; }
  .qty-col { justify-content: flex-start; }
  .total-col { text-align: left; }
  .remove-col {
    position: absolute;
    top: 20px; right: 0;
    justify-content: flex-end;
  }
}
</style>
