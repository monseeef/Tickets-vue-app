<!-- In src/components/MainLayout.vue -->
<template>
  <div class="app-container">
    <!-- 1. Add the Toaster component -->
    <Toaster position="top-right" />
    <div class="content-wrap">
      <!-- 
        This is Vue's version of <Outlet />
        All our child pages (Landing, Login, etc.) will be rendered here.
      -->
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Footer from './Footer.vue';
import { Toaster } from 'vue-hot-toast';
</script>

<!-- No <style> block needed, it uses all global styles -->