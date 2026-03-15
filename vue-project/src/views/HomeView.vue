<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';
import API_BASE_URL from '../config/api';
import ProductCard from '../components/ProductCard.vue';

const featuredProducts = ref([]);

onMounted(async () => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/products`);
    featuredProducts.value = data.products.slice(0, 4);
  } catch (e) {
    console.error('Failed to fetch featured products:', e);
  }
});
</script>

<template>
  <div class="home">
    <!-- HERO -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <p class="hero-eyebrow">New Collection — 2025</p>
        <h1 class="hero-title">DROPIFY</h1>
        <p class="hero-sub">Streetwear for those who build from the ground up.</p>
        <div class="hero-actions">
          <RouterLink to="/shop" class="btn btn-primary">Shop Now</RouterLink>
          <RouterLink to="/about" class="btn btn-ghost">Our Story</RouterLink>
        </div>
      </div>
      <div class="hero-scroll">
        <span>Scroll</span>
        <div class="scroll-line"></div>
      </div>
    </section>

    <!-- FEATURED -->
    <section class="featured">
      <div class="section-container">
        <div class="section-header">
          <div>
            <p class="eyebrow">Selected Works</p>
            <h2 class="section-title">Featured Drops</h2>
          </div>
          <RouterLink to="/shop" class="see-all">View All &rarr;</RouterLink>
        </div>
        <div class="product-grid" v-if="featuredProducts.length > 0">
          <ProductCard
            v-for="product in featuredProducts"
            :key="product._id"
            :product="product"
          />
        </div>
        <div v-else class="grid-placeholder">
          <div v-for="n in 4" :key="n" class="placeholder-card"></div>
        </div>
      </div>
    </section>

    <!-- MANIFESTO -->
    <section class="manifesto">
      <div class="manifesto-inner">
        <p class="eyebrow eyebrow-gold">Our Philosophy</p>
        <blockquote class="manifesto-text">
          "We don't just print on fabric.<br>We amplify the voices of creators."
        </blockquote>
        <p class="manifesto-body">
          Each drop is a collaboration, a story, and a piece of the culture
          you help build. Born from the streets of Angeles City —
          locally made, proudly independent.
        </p>
        <RouterLink to="/about" class="btn btn-outline-gold">Learn More About Us</RouterLink>
      </div>
    </section>

    <!-- CATEGORIES -->
    <section class="categories">
      <div class="section-container">
        <p class="eyebrow">Browse by Category</p>
        <div class="cat-grid">
          <RouterLink to="/shop/shirts" class="cat-card">
            <span class="cat-label">Shirts</span>
          </RouterLink>
          <RouterLink to="/shop/hoodies" class="cat-card">
            <span class="cat-label">Hoodies</span>
          </RouterLink>
          <RouterLink to="/shop/caps" class="cat-card">
            <span class="cat-label">Caps</span>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--black);
}

/* ── HERO ── */
.hero {
  position: relative;
  min-height: 100vh;
  margin-top: calc(-1 * var(--header-h));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-image: url('/images/hero-background.jpg');
  background-size: cover;
  background-position: center;
  transform: scale(1.05);
  filter: brightness(0.4) saturate(0.3);
  transition: transform 8s ease;
}

.hero:hover .hero-bg { transform: scale(1.0); }

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(10,10,10,0.2) 0%,
    rgba(10,10,10,0.6) 70%,
    rgba(10,10,10,1) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 24px;
  max-width: 900px;
  animation: fadeUp 1s ease forwards;
}

.hero-eyebrow {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 24px;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(5rem, 14vw, 14rem);
  line-height: 0.9;
  color: var(--white);
  letter-spacing: 0.04em;
  margin-bottom: 28px;
}

.hero-sub {
  font-size: clamp(0.95rem, 2vw, 1.15rem);
  color: var(--gray-light);
  font-weight: 300;
  margin-bottom: 48px;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-scroll {
  position: absolute;
  bottom: 40px;
  left: 48px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gray);
}

.scroll-line {
  width: 40px;
  height: 1px;
  background-color: var(--gray);
}

/* ── BUTTONS ── */
.btn {
  display: inline-block;
  padding: 14px 36px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: all var(--transition);
  cursor: pointer;
}

.btn-primary {
  background-color: var(--gold);
  color: var(--black);
}
.btn-primary:hover {
  background-color: var(--gold-light);
}

.btn-ghost {
  background-color: transparent;
  color: var(--white);
  border: 1px solid rgba(255,255,255,0.3);
}
.btn-ghost:hover {
  border-color: var(--white);
  background-color: rgba(255,255,255,0.05);
}

.btn-outline-gold {
  background-color: transparent;
  color: var(--gold);
  border: 1px solid var(--gold);
}
.btn-outline-gold:hover {
  background-color: var(--gold);
  color: var(--black);
}

/* ── FEATURED ── */
.featured {
  padding: 100px 0;
  background-color: var(--black);
}

.section-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 48px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 48px;
}

.eyebrow {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gray);
  margin-bottom: 10px;
}

.eyebrow-gold { color: var(--gold); }

.section-title {
  font-family: var(--font-display);
  font-size: 3rem;
  letter-spacing: 0.04em;
  color: var(--white);
  font-weight: 400;
}

.see-all {
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gold);
  transition: color var(--transition);
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
}
.see-all:hover {
  border-bottom-color: var(--gold);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
}

.placeholder-card {
  aspect-ratio: 1;
  background-color: var(--surface-2);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
}

/* ── MANIFESTO ── */
.manifesto {
  padding: 120px 48px;
  background-color: var(--surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.manifesto-inner {
  max-width: 760px;
  margin: 0 auto;
}

.manifesto-text {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1.15;
  color: var(--white);
  letter-spacing: 0.02em;
  margin: 24px 0 32px;
  font-weight: 400;
}

.manifesto-body {
  font-size: 0.95rem;
  color: var(--gray-light);
  line-height: 1.8;
  margin-bottom: 40px;
  font-weight: 300;
}

/* ── CATEGORIES ── */
.categories {
  padding: 100px 0;
  background-color: var(--black);
}

.categories .eyebrow { margin-bottom: 32px; }

.cat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  margin-top: 32px;
}

.cat-card {
  position: relative;
  height: 300px;
  background-color: var(--surface-2);
  display: flex;
  align-items: flex-end;
  padding: 28px;
  overflow: hidden;
  transition: background-color var(--transition);
  border: 1px solid var(--border);
}

.cat-card:hover {
  background-color: var(--surface);
  border-color: var(--gold);
}

.cat-label {
  font-family: var(--font-display);
  font-size: 2.2rem;
  letter-spacing: 0.06em;
  color: var(--white);
  transition: color var(--transition);
}

.cat-card:hover .cat-label { color: var(--gold); }

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 992px) {
  .product-grid { grid-template-columns: repeat(2, 1fr); }
  .cat-grid { grid-template-columns: 1fr; }
  .section-header { flex-direction: column; align-items: flex-start; gap: 16px; }
}

@media (max-width: 576px) {
  .product-grid { grid-template-columns: 1fr; }
  .hero-title { font-size: 5rem; }
  .hero-scroll { display: none; }
}
</style>
