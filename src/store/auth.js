// In src/store/auth.js
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

// This is the key we MUST use per the instructions
const SESSION_KEY = "ticketapp_session";

// This `ref` is our reactive state.
// It's like React's `useState`
const session = ref(null);

// A "computed" property is a value that's derived from other state.
// It's like a `useMemo` that updates automatically.
const isAuthenticated = computed(() => !!session.value);

// --- The Login Function ---
const login = (email, password) => {
  // MOCK AUTHENTICATION
  if (email === "test@user.com" && password === "password123") {
    const mockToken = email;
    localStorage.setItem(SESSION_KEY, mockToken);
    session.value = mockToken; // Update the state
    return true;
  }
  return false; // Failed login
};

// --- The Signup Function ---
const signup = (name, email, password) => {
  // MOCK SIGNUP (always works)
  const mockToken = email;
  localStorage.setItem(SESSION_KEY, mockToken);
  session.value = mockToken;
  return true;
};

// --- The Logout Function ---
const logout = () => {
  localStorage.removeItem(SESSION_KEY);
  session.value = null;
};

// --- The Initialization Function ---
// This runs once to check localStorage on app load
const checkAuth = () => {
  const storedSession = localStorage.getItem(SESSION_KEY);
  if (storedSession) {
    session.value = storedSession;
  }
};

// This is our main "composable" function.
// Any component can call this to get the auth state and methods.
export const useAuth = () => {
  // We use onMounted to check auth *once* when the hook is first used.
  // A better place might be main.js, but this works well.
  onMounted(() => {
    if (session.value === null) {
      // Only check if not already checked
      checkAuth();
    }
  });

  return {
    session,
    isAuthenticated,
    login,
    signup,
    logout,
  };
};

// We also export this for our router guard, which can't use onMounted
export const simpleCheckAuth = checkAuth;
export const simpleIsAuthenticated = isAuthenticated;
