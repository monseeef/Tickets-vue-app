<!-- In src/pages/LoginPage.vue -->
<template>
  <div class="auth-container">
    <div class="auth-form-box">
      <h2>Log In</h2>
      <form @submit.prevent="handleSubmit">
        <!-- Simple inline error message -->
        <div v-if="error" class="form-error-inline">{{ error }}</div>

        <div class="form-group">
          <label for="email">Email</label>
          <!-- v-model binds the input to our 'email' state -->
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" class="auth-button">Log In</button>
      </form>
      <p class="auth-switch-link">
        Don't have an account?
        <!-- <router-link> is Vue's version of <Link> -->
        <router-link to="/auth/signup">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'; // ref is Vue's version of useState
import { useRouter } from 'vue-router';
import { useAuth } from '../store/auth'; // <-- Import our auth "hook"
import { toast } from 'vue-hot-toast'; // <-- Import toast functionality

const email = ref('');
const password = ref('');
const error = ref(''); // For our inline error

const { login } = useAuth(); // <-- Get the login function
const router = useRouter();

const handleSubmit = () => {
  error.value = ''; // Clear old errors

  // Validation per instructions
  if (!email.value || !password.value) {
    error.value = 'Email and password are required.';
    return;
  }

  // Try to log in
  const success = login(email.value, password.value);

  if (success) {
    toast.success('Logged in successfully!');
    router.push('/dashboard'); // Redirect on success
  } else {
    error.value = 'Invalid credentials. (Hint: test@user.com, password123)';
    toast.error('Invalid credentials.');
  }
};
</script>

<style scoped>
/*
 * This is the *EXACT SAME CSS* from react-app/src/pages/AuthForm.css
 */
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
  min-height: 70vh;
}

.auth-form-box {
  width: 100%;
  max-width: 450px;
  padding: 2.5rem;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.auth-form-box h2 {
  text-align: center;
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
}

.auth-button {
  width: 100%;
  padding: 0.85rem;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #6e8efb;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 0.5rem;
}

.auth-button:hover {
  background-color: #5a78d6;
}

.auth-switch-link {
  text-align: center;
  margin-top: 1.5rem;
}

.auth-switch-link a {
  color: #6e8efb;
  font-weight: 600;
  text-decoration: none;
}

/* This is new, for our inline error */
.form-error-inline {
  background: #fde2e2;
  color: #9b1c1c;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
}
</style>
