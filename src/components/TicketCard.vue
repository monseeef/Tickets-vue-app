    <!-- In src/components/TicketCard.vue -->
    <template>
      <div class="ticket-card">
        <div class="ticket-header">
          <!-- We use a computed property to get the right CSS class -->
          <span :class="['ticket-status', statusClass]">
            {{ formattedStatus }}
          </span>
        </div>
        <h3 class="ticket-title">{{ ticket.title }}</h3>
        <p class="ticket-description">{{ ticket.description || 'No description' }}</p>
        <div class="ticket-actions">
          <!-- 
            When clicked, these buttons will "emit" an event 
            up to the parent page.
          -->
          <button class="btn-edit" @click="$emit('edit')">Edit</button>
          <button class="btn-delete" @click="$emit('delete')">Delete</button>
        </div>
      </div>
    </template>
    
    <script setup>
    import { computed } from 'vue';
    
    // This component accepts a "ticket" object as a prop
    const props = defineProps({
      ticket: {
        type: Object,
        required: true,
      },
    });
    
    // This component tells the parent when "edit" or "delete" is clicked
    defineEmits(['edit', 'delete']);
    
    // Computed property for the status CSS class
    const statusClass = computed(() => {
      switch (props.ticket.status) {
        case 'open':
          return 'status-open'; // Green
        case 'in_progress':
          return 'status-in-progress'; // Amber
        case 'closed':
          return 'status-closed'; // Gray
        default:
          return '';
      }
    });
    
    // Computed property for the display text
    const formattedStatus = computed(() => {
      return props.ticket.status.replace('_', ' ');
    });
    </script>
    
    <style scoped>
    /* * This is the *EXACT SAME CSS* from react-app/src/components/TicketCard.css
     */
    .ticket-card {
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
    }
    
    .ticket-header {
      margin-bottom: 0.5rem;
    }
    
    .ticket-status {
      padding: 0.25rem 0.75rem;
      border-radius: 16px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: capitalize;
    }
    
    /* --- STATUS COLOR RULES --- */
    .status-open {
      background-color: #dcfce7; /* Light Green */
      color: #166534; /* Dark Green */
    }
    .status-in-progress {
      background-color: #fef3c7; /* Light Amber */
      color: #b45309; /* Dark Amber */
    }
    .status-closed {
      background-color: #e5e7eb; /* Light Gray */
      color: #374151; /* Dark Gray */
    }
    
    .ticket-title {
      margin: 0.5rem 0;
      font-size: 1.25rem;
    }
    
    .ticket-description {
      flex: 1; /* Pushes actions to the bottom */
      color: #555;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }
    
    .ticket-actions {
      display: flex;
      gap: 0.5rem;
    }
    
    .btn-edit,
    .btn-delete {
      padding: 0.5rem 1rem;
      border: 1px solid #ccc;
      background: #f9f9f9;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
    }
    
    .btn-delete {
      border-color: #c94a4a;
      color: #c94a4a;
    }
    </style>
    
