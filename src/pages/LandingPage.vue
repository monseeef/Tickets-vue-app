<!-- In src/pages/LandingPage.vue -->
<template>
  <div class="landing-page">
    <!-- ... hero-section ... -->
    <section class="hero-section">
      <!-- ... -->
      <div class="hero-content">
        <!-- ... h1 and p ... -->
        <h1>Welcome to TicketApp 🎟️</h1>
        <p>Your one-stop solution for managing customer support tickets.</p>
        <div class="hero-buttons">
          <!-- 3. ADD @click HANDLERS -->
          <button class="btn-primary" @click="goTo('/auth/login')">
            Login
          </button>
          <button class="btn-secondary" @click="goTo('/auth/signup')">
            Get Started
          </button>
        </div>
      </div>
      <!-- ... -->
    </section>
    <!-- ... features-section ... -->
  </div>
</template>
    
<script setup>
import { useRouter } from 'vue-router'; // <-- 1. IMPORT

const router = useRouter(); // <-- 2. SET IT UP

const goTo = (path) => {
  router.push(path);
};
</script>

<style scoped>
/* * This is the *EXACT SAME CSS* from react-app/src/pages/LandingPage.css
 * We can just copy-paste it all right here.
 */
.landing-page {
  width: 100%;
}

/* 1. Hero Section */
.hero-section {
  position: relative;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  text-align: center;
  overflow: hidden;
}

/* THE WAVY BOTTOM */
.hero-wave {
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 100px;
  background-color: #f4f7f6;
  clip-path: polygon(
    0% 100%,
    100% 100%,
    100% 25%,
    75% 50%,
    50% 25%,
    25% 50%,
    0% 25%
  );
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-content h1 {
  font-size: 3rem;
}

.hero-buttons button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin: 0 0.5rem;
}

.btn-primary {
  background-color: #ffffff;
  color: #6e8efb;
}

.btn-secondary {
  background-color: transparent;
  color: #ffffff;
  border: 2px solid #ffffff;
}

/* 2. Features Section */
.features-section {
  padding: 6rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

/* THE BOXES */
.feature-box {
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: left;
}

/* THE DECORATIVE CIRCLES */
.deco-circle {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  z-index: 0;
}

.circle-1 {
  top: -50px;
  left: -50px;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.15);
}

.circle-2 {
  bottom: -100px;
  right: -100px;
  width: 300px;
  height: 300px;
  background: #e0e7ff;
}

/* 3. Responsiveness (Mobile) */
@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }

  .hero-content h1 {
    font-size: 2.2rem;
  }
}
</style>