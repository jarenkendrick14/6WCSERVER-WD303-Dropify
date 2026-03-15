<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import API_BASE_URL from '../../config/api';
import ProductCard from '../../components/ProductCard.vue';

const caps = ref([]);
const searchTerm = ref('');
const sortBy = ref('-createdAt');
const isLoading = ref(true);
let debounceTimer = null;

const fetchCaps = async () => {
  isLoading.value = true;
  try {
    const params = new URLSearchParams();
    params.append('category', 'caps');
    if (searchTerm.value) params.append('search', searchTerm.value);
    if (sortBy.value) params.append('sort', sortBy.value);
    const { data } = await axios.get(`${API_BASE_URL}/api/products?${params.toString()}`);
    caps.value = data.products;
  } catch (e) {
    console.error('Failed to fetch caps:', e);
  } finally {
    isLoading.value = false;
  }
};

watch(searchTerm, () => { clearTimeout(debounceTimer); debounceTimer = setTimeout(fetchCaps, 300); });
watch(sortBy, fetchCaps);
onMounted(fetchCaps);
</script>

<template>
  <div class="shop-page">
    <div class="page-header">
      <p class="eyebrow">Collection</p>
      <h1 class="page-title">Caps</h1>
    </div>

    <div class="filter-bar">
      <div class="search-wrap">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input type="text" v-model="searchTerm" placeholder="Search caps..." class="search-input" />
      </div>
      <select v-model="sortBy" class="sort-select">
        <option value="-createdAt">Newest</option>
        <option value="price">Price: Low to High</option>
        <option value="-price">Price: High to Low</option>
      </select>
    </div>

    <div v-if="isLoading" class="loading-grid">
      <div v-for="n in 8" :key="n" class="skeleton"></div>
    </div>
    <div v-else>
      <TransitionGroup tag="div" name="stagger" class="product-grid" appear>
        <ProductCard
          v-for="(cap, index) in caps"
          :key="cap._id"
          :product="cap"
          :style="{ transitionDelay: `${index * 40}ms` }"
        />
      </TransitionGroup>
      <div v-if="caps.length === 0" class="empty-state">
        <p>No caps found.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shop-page { color: var(--white); }

.page-header {
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

.page-title {
  font-family: var(--font-display);
  font-size: 3.5rem;
  font-weight: 400;
  letter-spacing: 0.03em;
  color: var(--white);
}

.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  gap: 16px;
  flex-wrap: wrap;
}

.search-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 10px 16px;
  width: 300px;
  color: var(--gray);
}

.search-input {
  background: transparent;
  border: none;
  outline: none;
  color: var(--white);
  font-size: 0.85rem;
  width: 100%;
}
.search-input::placeholder { color: var(--gray); }

.sort-select {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--white);
  padding: 10px 16px;
  font-size: 0.82rem;
  outline: none;
  cursor: pointer;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 2px;
}

.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 2px;
}

.skeleton {
  aspect-ratio: 1;
  background: var(--surface-2);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.7; }
}

.empty-state {
  text-align: center;
  padding: 80px;
  color: var(--gray);
  font-size: 0.9rem;
}

.stagger-enter-active { transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1); }
.stagger-enter-from { opacity: 0; transform: translateY(20px); }
</style>
