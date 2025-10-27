// In src/store/tickets.js
import { ref, computed, onMounted } from "vue";
import { v4 as uuidv4 } from "uuid"; // For creating unique IDs

const TICKETS_KEY = "ticketapp_tickets"; // Our localStorage key

// --- Reactive State ---
const tickets = ref([]); // Our main array of tickets
const loading = ref(true);
const error = ref(null);

// --- Helper Functions ---
const getInitialData = () => {
  try {
    const storedData = localStorage.getItem(TICKETS_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (e) {
    console.error("Failed to parse tickets from localStorage", e);
    return [];
  }
};

// Helper to save updates to state AND localStorage
const saveTickets = (newTickets) => {
  try {
    localStorage.setItem(TICKETS_KEY, JSON.stringify(newTickets));
    tickets.value = newTickets; // Update the reactive state
    error.value = null;
  } catch (e) {
    console.error("Failed to save tickets", e);
    error.value = "Failed to save tickets.";
  }
};

// --- CREATE Function ---
// Returns an error message string for validation
const createTicket = (ticketData) => {
  const { title, status } = ticketData;

  // Validation per the rules
  if (!title || !status) {
    return "Title and status are mandatory.";
  }
  const validStatuses = ["open", "in_progress", "closed"];
  if (!validStatuses.includes(status)) {
    return 'Status must be "open", "in_progress", or "closed".';
  }

  // All good, create the ticket
  const newTicket = {
    id: uuidv4(),
    ...ticketData,
    createdAt: new Date().toISOString(),
  };

  saveTickets([...tickets.value, newTicket]);
  return null; // No error!
};

// --- UPDATE Function ---
const updateTicket = (id, updatedData) => {
  const { title, status } = updatedData;

  // Validation
  if (!title || !status) {
    return "Title and status are mandatory.";
  }
  const validStatuses = ["open", "in_progress", "closed"];
  if (!validStatuses.includes(status)) {
    return 'Status must be "open", "in_progress", or "closed".';
  }

  // Find and update
  const newTickets = tickets.value.map((ticket) => (ticket.id === id ? { ...ticket, ...updatedData } : ticket));

  saveTickets(newTickets);
  return null; // No error!
};

// --- DELETE Function ---
const deleteTicket = (id) => {
  const newTickets = tickets.value.filter((ticket) => ticket.id !== id);
  saveTickets(newTickets);
};

// --- Initialization ---
const checkTickets = () => {
  if (tickets.value.length === 0) {
    // Only load if not already loaded
    tickets.value = getInitialData();
  }
  loading.value = false;
};

// --- The Composable "Hook" ---
export const useTickets = () => {
  // Run the check once when the hook is first used
  onMounted(checkTickets);

  return {
    tickets,
    loading,
    error,
    createTicket,
    updateTicket,
    deleteTicket,
    // We also return computed stats for the dashboard
    totalTickets: computed(() => tickets.value.length),
    openTickets: computed(() => tickets.value.filter((t) => t.status === "open").length),
    resolvedTickets: computed(() => tickets.value.filter((t) => t.status === "closed").length),
  };
};

// Export a simple checker for our dashboard
// This ensures data is loaded even if dashboard is first page
export const simpleCheckTickets = checkTickets;
