<!-- In src/pages/DashboardPage.vue -->
<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <!-- Show who is logged in -->
      <h2>Welcome, {{ session }}!</h2>
      
      <!-- The visible Logout button -->
      <button @click="handleLogout" class="btn-logout">
        Log Out
      </button>
    </header>

    <h3>Your Ticket Summary</h3>
    
    <!-- Summary Statistics (Real Data!) -->
    <section class="stats-grid">
      <div class="stat-card">
        <h3>Total Tickets</h3>
        <p class="stat-number">{{ totalTickets }}</p>
      </div>
      <div class="stat-card">
        <h3>Open Tickets</h3>
        <p class="stat-number">{{ openTickets }}</p>
      </div>
      <div class="stat-card">
        <h3>Resolved Tickets</h3>
        <p class="stat-number">{{ resolvedTickets }}</p>
      </div>
    </section>

    <!-- Navigation Links -->
    <section class="dashboard-nav">
      <h3>Manage Your Tickets</h3>
      <p>View, create, edit, and delete your support tickets.</p>
      <!-- Use <router-link> styled as a button -->
      <router-link to="/tickets" class="btn-primary-action">
        Go to Ticket Management
      </router-link>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuth } from '../store/auth';      // <-- 1. Import Auth
import { useTickets, simpleCheckTickets } from '../store/tickets'; // <-- 2. Import Tickets
import { toast } from 'vue-hot-toast';

// Load our auth state
const { session, logout } = useAuth();
const router = useRouter();

// Load our ticket state
// We call this simple check just in case this is the first page loaded
simpleCheckTickets(); 
const { totalTickets, openTickets, resolvedTickets } = useTickets();

const handleLogout = () => {
  logout();
  toast.success('Logged out.');
  router.push('/auth/login'); // Redirect to login
};
</script>

<style scoped>
/* * This is the *EXACT SAME CSS* from react-app/src/pages/DashboardPage.css
 * We just copy-paste it all right here.
 */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.dashboard-header h2 {
  margin: 0;
  /* Make sure email doesn't overflow */
  word-break: break-all;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.stat-card {
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.stat-card h3 {
  margin-top: 0;
  font-size: 1.2rem;
  color: #555;
}

.stat-card .stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0.5rem 0;
}

.dashboard-nav {
  margin-top: 3rem;
}

.btn-primary-action {
  padding: 0.85rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #6e8efb;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none; /* For the <router-link> */
  display: inline-block; /* So padding works */
}

.btn-logout {
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  font-weight: 600;
  color: #c94a4a;
  background-color: transparent;
  border: 1px solid #c94a4a;
  border-radius: 8px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>
