<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { RouterLink } from 'vue-router';

const authStore = useAuthStore();
const username = ref('');
const email = ref('');
const password = ref('');

function handleRegister() {
  if (!username.value || !email.value || !password.value) {
    return;
  }
  authStore.register(username.value, email.value, password.value);
}
</script>

<template>
  <div class="login-view">
    <div class="bg-panels">
      <div class="panel panel-1"></div>
      <div class="panel panel-2"></div>
      <div class="panel panel-3"></div>
    </div>

    <div class="login-box">
      <div class="box-top">
        <RouterLink to="/" class="brand">DROPIFY</RouterLink>
        <p class="box-tagline">Create your account.</p>
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

      <p class="alt-link">Already a member? <RouterLink to="/login">Sign in</RouterLink></p>
    </div>
  </div>
</template>

<style scoped>
.login-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

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
  filter: brightness(0.3) saturate(0.2);
}
.panel-1 { background-image: url('/images/login-bg-1.png'); }
.panel-2 { background-image: url('/images/login-bg-2.png'); }
.panel-3 { background-image: url('/images/login-bg-3.png'); }

.login-box {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 400px;
  background: rgba(12, 12, 12, 0.88);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--border);
  padding: 48px 40px;
  margin: 0 16px;
}

.box-top { margin-bottom: 36px; }

.brand {
  font-family: var(--font-display);
  font-size: 2.4rem;
  color: var(--white);
  letter-spacing: 0.06em;
  display: block;
  margin-bottom: 8px;
}

.box-tagline {
  font-size: 0.85rem;
  color: var(--gray);
  font-weight: 300;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
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
input::placeholder { color: var(--gray); }
input:focus { border-color: var(--gold); }

.submit-btn {
  margin-top: 8px;
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

.alt-link {
  text-align: center;
  margin-top: 28px;
  font-size: 0.82rem;
  color: var(--gray);
}
.alt-link a {
  color: var(--gold);
  font-weight: 500;
  transition: color var(--transition);
}
.alt-link a:hover { color: var(--gold-light); }
</style>
