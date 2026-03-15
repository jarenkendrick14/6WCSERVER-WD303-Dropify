<template>
  <div class="shop-container">
    <RouterView />
  </div>
</template>

<style scoped>
.shop-container {
  padding: 48px 48px 80px;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  background-color: var(--black);
  min-height: 100vh;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .shop-container {
    padding: 24px 14px 60px;
  }
}
</style>
