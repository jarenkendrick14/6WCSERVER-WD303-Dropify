<template>
  <div class="about-view">
    <div class="about-hero">
      <div class="about-hero-text">
        <p class="eyebrow">Who We Are</p>
        <h1 class="about-title">Built from<br>the ground up.</h1>
      </div>
    </div>

    <div class="about-body">
      <div class="about-image-wrap">
        <img src="/images/about-us-img.png" alt="About Dropify" class="about-img" />
      </div>
      <div class="about-text">
        <p class="about-label">The Crew — DJ, Aaron, Kendrick, Mika, Kenneth</p>
        <p class="about-copy">
          Born from the creative fire of a five-person crew, Dropify is more than
          just merch — it's a movement. This project blends streetwear grit with
          personal stories, turning everyday pieces into wearable statements.
        </p>
        <p class="about-copy">
          Locally made, proudly independent, and unapologetically bold. Each item
          reflects the crew's journey from concept to creation. Whether you're
          repping the team or just vibing with the design — Dropify is for those
          who build from the ground up and wear it loud.
        </p>
        <RouterLink to="/shop" class="about-cta">Shop the Collection &rarr;</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-view {
  background-color: var(--black);
  color: var(--white);
  flex-grow: 1;
}

.about-hero {
  padding: 160px 48px 80px;
  border-bottom: 1px solid var(--border);
  max-width: 1280px;
  margin: 0 auto;
}

.eyebrow {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 20px;
}

.about-title {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 7vw, 7rem);
  line-height: 1.0;
  color: var(--white);
  letter-spacing: 0.03em;
  font-weight: 400;
}

.about-body {
  max-width: 1280px;
  margin: 0 auto;
  padding: 80px 48px 120px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: start;
}

.about-img {
  width: 100%;
  display: block;
  filter: grayscale(20%) contrast(1.05);
}

.about-label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gray);
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--border);
}

.about-copy {
  font-size: 1.05rem;
  color: var(--gray-light);
  line-height: 1.85;
  font-weight: 300;
  margin-bottom: 24px;
}

.about-cta {
  display: inline-block;
  margin-top: 16px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gold);
  border-bottom: 1px solid var(--gold);
  padding-bottom: 4px;
  transition: color var(--transition), border-color var(--transition);
}
.about-cta:hover { color: var(--gold-light); border-color: var(--gold-light); }

@media (max-width: 768px) {
  .about-hero { padding: 100px 20px 48px; }
  .about-title { font-size: 3rem; }
  .about-body { grid-template-columns: 1fr; gap: 32px; padding: 48px 20px 60px; }
}

@media (max-width: 480px) {
  .about-title { font-size: 2.2rem; }
}
</style>
