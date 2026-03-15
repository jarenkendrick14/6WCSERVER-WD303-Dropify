<script setup>
import { useNotificationStore } from '../stores/notification';
const notificationStore = useNotificationStore();
</script>

<template>
  <Transition name="slide-up">
    <div
      v-if="notificationStore.isVisible"
      class="toast"
      :class="notificationStore.type"
      @click="notificationStore.hideNotification"
    >
      <span class="toast-dot"></span>
      {{ notificationStore.message }}
    </div>
  </Transition>
</template>

<style scoped>
.toast {
  position: fixed;
  bottom: 32px;
  right: 32px;
  padding: 14px 22px;
  background-color: var(--surface);
  border: 1px solid var(--border);
  color: var(--white);
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  cursor: pointer;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
}

.toast-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.toast.success { border-left: 3px solid #22c55e; }
.toast.success .toast-dot { background-color: #22c55e; }

.toast.error { border-left: 3px solid var(--red); }
.toast.error .toast-dot { background-color: var(--red); }

.slide-up-enter-active,
.slide-up-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(16px);
}
</style>
