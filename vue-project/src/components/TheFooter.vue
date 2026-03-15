<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <span class="footer-logo">DROPIFY</span>
        <p class="footer-tagline">Locally made. Unapologetically bold.</p>
      </div>
      <div class="footer-links">
        <span class="footer-heading">Explore</span>
        <nav>
          <RouterLink to="/shop/shirts">Shirts</RouterLink>
          <RouterLink to="/shop/hoodies">Hoodies</RouterLink>
          <RouterLink to="/shop/caps">Caps</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/contact">Contact</RouterLink>
        </nav>
      </div>
      <div class="footer-info">
        <span class="footer-heading">Info</span>
        <p>WD — 303</p>
        <p>Angeles City, Philippines</p>
        <p class="footer-copy">&copy; 2026 Dropify. All rights reserved.</p>
      </div>
    </div>
    <div class="footer-bottom">
      <span>Made with passion by the Dropify crew.</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--surface);
  border-top: 1px solid var(--border);
  color: var(--gray);
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 64px 48px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 48px;
}

.footer-logo {
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--white);
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 12px;
}

.footer-tagline {
  font-size: 0.85rem;
  color: var(--gray);
  line-height: 1.6;
}

.footer-heading {
  display: block;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 20px;
}

.footer-links nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-links a {
  font-size: 0.85rem;
  color: var(--gray);
  transition: color var(--transition);
}
.footer-links a:hover { color: var(--white); }

.footer-info p {
  font-size: 0.85rem;
  line-height: 2;
}

.footer-copy {
  margin-top: 12px;
  font-size: 0.75rem !important;
  color: var(--gray) !important;
}

.footer-bottom {
  border-top: 1px solid var(--border);
  padding: 16px 48px;
  max-width: 1200px;
  margin: 0 auto;
  font-size: 0.75rem;
  color: var(--gray);
  text-align: center;
  width: 100%;
}

@media (max-width: 768px) {
  .footer-inner {
    grid-template-columns: 1fr;
    padding: 40px 24px;
    gap: 32px;
  }
  .footer-bottom { padding: 14px 24px; }
}
</style>
