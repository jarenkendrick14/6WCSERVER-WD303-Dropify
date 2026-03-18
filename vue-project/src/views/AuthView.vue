<script setup>
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const mode = ref(route.name === 'register' ? 'register' : 'login');
const slideDirection = ref('right'); // which way new form slides in

const username = ref('');
const email = ref('');
const password = ref('');

// Keep URL in sync
watch(mode, (val) => {
  router.replace({ name: val, query: route.query });
});

watch(() => route.name, (val) => {
  if (val === 'login' || val === 'register') {
    slideDirection.value = val === 'register' ? 'right' : 'left';
    mode.value = val;
  }
});

function switchTo(target) {
  slideDirection.value = target === 'register' ? 'right' : 'left';
  username.value = '';
  email.value = '';
  password.value = '';
  mode.value = target;
}

function handleLogin() {
  authStore.login(username.value, password.value, false);
}

function handleRegister() {
  if (!username.value || !email.value || !password.value) return;
  authStore.register(username.value, email.value, password.value);
}
</script>

<template>
  <div class="auth-view">
    <!-- Background panels -->
    <div class="bg-panels">
      <div class="panel panel-1"></div>
      <div class="panel panel-2"></div>
      <div class="panel panel-3"></div>
    </div>

    <!-- Form card -->
    <div class="auth-card">
      <RouterLink to="/" class="brand">DROPIFY</RouterLink>

      <Transition :name="slideDirection === 'right' ? 'slide-right' : 'slide-left'" mode="out-in">
        <!-- LOGIN -->
        <div v-if="mode === 'login'" key="login" class="form-body">
          <div class="form-header">
            <h1>Welcome back.</h1>
            <p>Sign in to your account</p>
          </div>
          <form @submit.prevent="handleLogin">
            <div class="field">
              <label>Username</label>
              <input type="text" v-model="username" required autocomplete="username" />
            </div>
            <div class="field">
              <label>Password</label>
              <input type="password" v-model="password" required autocomplete="current-password" />
            </div>
            <button type="submit" class="submit-btn">Sign In</button>
          </form>
          <p class="switch-link">
            No account?
            <button @click="switchTo('register')" class="link-btn">Create one</button>
          </p>
        </div>

        <!-- REGISTER -->
        <div v-else key="register" class="form-body">
          <div class="form-header">
            <h1>Create account.</h1>
            <p>Join the Dropify crew</p>
          </div>
          <form @submit.prevent="handleRegister">
            <div class="field">
              <label>Username</label>
              <input type="text" v-model="username" required autocomplete="username" />
            </div>
            <div class="field">
              <label>Email Address</label>
              <input type="email" v-model="email" required autocomplete="email" placeholder="you@example.com" />
            </div>
            <div class="field">
              <label>Password</label>
              <input type="password" v-model="password" required autocomplete="new-password" />
            </div>
            <button type="submit" class="submit-btn">Create Account</button>
          </form>
          <p class="switch-link">
            Already a member?
            <button @click="switchTo('login')" class="link-btn">Sign in</button>
          </p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.auth-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

/* Background */
.bg-panels {
  position: absolute;
  inset: 0;
  display: flex;
  z-index: 1;
}
.panel {
  flex: 1;
  background-size: cover;
  background-position: center;
  filter: brightness(0.28) saturate(0.15);
}
.panel-1 { background-image: url('/images/login-bg-1.png'); }
.panel-2 { background-image: url('/images/login-bg-2.png'); }
.panel-3 { background-image: url('/images/login-bg-3.png'); }

/* Card */
.auth-card {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 420px;
  background: rgba(10, 10, 10, 0.9);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border: 1px solid var(--border);
  padding: 48px 40px;
  margin: 20px;
  overflow: hidden;
}

.brand {
  font-family: var(--font-display);
  font-size: 2rem;
  color: var(--white);
  letter-spacing: 0.06em;
  display: block;
  margin-bottom: 36px;
}
.brand:hover { color: var(--gold); }

.form-header {
  margin-bottom: 28px;
}
.form-header h1 {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 400;
  letter-spacing: 0.03em;
  color: var(--white);
  margin-bottom: 6px;
}
.form-header p {
  font-size: 0.82rem;
  color: var(--gray);
  font-weight: 300;
}

form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

label {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--gray);
}

input {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--white);
  padding: 13px 14px;
  font-size: 0.9rem;
  outline: none;
  transition: border-color var(--transition);
  text-transform: none;
  width: 100%;
}
input::placeholder { color: #444; }
input:focus { border-color: var(--gold); }

.submit-btn {
  margin-top: 6px;
  background-color: var(--gold);
  color: var(--black);
  padding: 15px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: background-color var(--transition);
  width: 100%;
}
.submit-btn:hover { background-color: var(--gold-light); }

.switch-link {
  text-align: center;
  margin-top: 24px;
  font-size: 0.82rem;
  color: var(--gray);
}

.link-btn {
  background: none;
  border: none;
  color: var(--gold);
  font-size: 0.82rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  transition: color var(--transition);
  text-decoration: underline;
  text-underline-offset: 3px;
}
.link-btn:hover { color: var(--gold-light); }

/* Slide transitions */
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  width: calc(100% - 80px);
}

.slide-right-enter-from { transform: translateX(40px); opacity: 0; }
.slide-right-leave-to  { transform: translateX(-40px); opacity: 0; }

.slide-left-enter-from { transform: translateX(-40px); opacity: 0; }
.slide-left-leave-to  { transform: translateX(40px); opacity: 0; }

.form-body { width: 100%; }

@media (max-width: 480px) {
  .auth-card { padding: 36px 24px; margin: 12px; }
  .brand { font-size: 1.7rem; margin-bottom: 28px; }
}
</style>
