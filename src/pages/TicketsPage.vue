<!-- In src/pages/TicketsPage.vue -->
<template>
  <div class="tickets-page-container">
    <header class="tickets-header">
      <h2>Ticket Management</h2>
      <!-- This button opens the modal for "Create" mode -->
      <button class="btn-primary-action" @click="handleOpenCreateModal">
        Create New Ticket
      </button>
    </header>

    <!-- Handle loading and error states -->
    <p v-if="loading">Loading tickets...</p>
    <p v-if="error" style="color: red">{{ error }}</p>

    <!-- Handle no tickets -->
    <div
      v-if="!loading && !error && tickets.length === 0"
      class="no-tickets-found"
    >
      <p>No tickets found. Get started by creating one!</p>
    </div>

    <!-- The main ticket list -->
    <div
      v-if="!loading && !error && tickets.length > 0"
      class="tickets-grid"
    >
      <!-- Loop over tickets and pass props/listeners -->
      <TicketCard
        v-for="ticket in tickets"
        :key="ticket.id"
        :ticket="ticket"
        @edit="handleOpenEditModal(ticket)"
        @delete="handleDeleteTicket(ticket.id)"
      />
    </div>

    <!-- --- OUR MODAL --- -->
    <Modal
      :isOpen="isModalOpen"
      :title="modalTitle"
      @close="handleCloseModal"
    >
      <TicketForm
        ref="ticketFormRef"
        :initialData="ticketToEdit"
        @submit="handleTicketSubmit"
        @cancel="handleCloseModal"
      />
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useTickets } from '../store/tickets';
import { toast } from 'vue-hot-toast';

// Import our components
import TicketCard from '../components/TicketCard.vue';
import Modal from '../components/Modal.vue';
import TicketForm from '../components/TicketForm.vue';

// --- State ---
const {
  tickets,
  loading,
  error,
  createTicket,
  updateTicket,
  deleteTicket,
} = useTickets();

const isModalOpen = ref(false);
const ticketToEdit = ref(null);
const ticketFormRef = ref(null); // A ref to access the form component's methods

// --- Computed ---
const modalTitle = computed(() => {
  return ticketToEdit.value ? 'Edit Ticket' : 'Create New Ticket';
});

// --- Modal Handlers ---
const handleOpenCreateModal = () => {
  ticketToEdit.value = null; // Ensure we are in "Create" mode
  isModalOpen.value = true;
};

const handleOpenEditModal = (ticket) => {
  ticketToEdit.value = ticket; // Set the ticket to edit
  isModalOpen.value = true;
};

const handleCloseModal = () => {
  isModalOpen.value = false;
  ticketToEdit.value = null; // Always clear on close
};

// --- CRUD Handlers ---
const handleTicketSubmit = (ticketData) => {
  let validationError = null;

  if (ticketToEdit.value) {
    // --- UPDATE ---
    validationError = updateTicket(ticketToEdit.value.id, ticketData);
    if (!validationError) {
      toast.success('Ticket updated successfully!');
    }
  } else {
    // --- CREATE ---
    validationError = createTicket(ticketData);
    if (!validationError) {
      toast.success('Ticket created successfully!');
    }
  }

  if (validationError) {
    // If the store returned an error, show it in the form
    ticketFormRef.value?.setApiError(validationError);
  } else {
    handleCloseModal(); // All good, close modal
  }
};

const handleDeleteTicket = (id) => {
  // Use a simple built-in confirm box
  if (window.confirm('Are you sure you want to delete this ticket?')) {
    deleteTicket(id);
    toast.success('Ticket deleted.');
  }
};
</script>

<style scoped>
/* * This is the *EXACT SAME CSS* from react-app/src/pages/TicketsPage.css
 */
.tickets-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.tickets-grid {
  display: grid;
  /* This makes a responsive grid */
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.no-tickets-found {
  text-align: center;
  padding: 4rem 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Re-using this style from the dashboard */
.btn-primary-action {
  padding: 0.85rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #6e8efb;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
}
</style>
