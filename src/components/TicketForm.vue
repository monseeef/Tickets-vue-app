    <!-- In src/components/TicketForm.vue -->
    <template>
      <form @submit.prevent="handleSubmit" class="ticket-form">
        <!-- This is our inline error display -->
        <div v-if="error" class="form-error-inline">{{ error }}</div>
    
        <div class="form-group">
          <label for="title">Title *</label>
          <input type="text" id="title" v-model="title" />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" v-model="description"></textarea>
        </div>
        <div class="form-group">
          <label for="status">Status *</label>
          <select id="status" v-model="status">
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>
    
        <div class="form-actions">
          <button type="button" class="btn-cancel" @click="$emit('cancel')">
            Cancel
          </button>
          <button type="submit" class="btn-submit">Save Ticket</button>
        </div>
      </form>
    </template>
    
    <script setup>
    import { ref, watch } from 'vue';
    
    // --- Props & Emits ---
    const props = defineProps({
      initialData: {
        type: Object,
        default: null,
      },
    });
    
    const emit = defineEmits(['submit', 'cancel']);
    
    // --- Form State ---
    const title = ref('');
    const description = ref('');
    const status = ref('open');
    const error = ref('');
    
    // --- Logic ---
    
    // This function populates the form
    const setFormData = (data) => {
      if (data) {
        title.value = data.title || '';
        description.value = data.description || '';
        status.value = data.status || 'open';
      } else {
        // Reset for "Create" mode
        title.value = '';
        description.value = '';
        status.value = 'open';
      }
      error.value = '';
    };
    
    // We use "watch" to monitor the initialData prop.
    // If it changes (e.g., user clicks "Edit"), we populate the form.
    // "immediate: true" runs this once on load.
    watch(() => props.initialData, (newData) => {
        setFormData(newData);
      }, { immediate: true }
    );
    
    const handleSubmit = () => {
      // This is our inline validation!
      if (!title.value || !status.value) {
        error.value = 'Title and status fields are mandatory.';
        return;
      }
    
      // Emit the form data up to the parent page
      emit('submit', {
        title: title.value,
        description: description.value,
        status: status.value,
      });
      
      // The parent will tell us if there's an error from the store
    };
    
    // We can also expose the "setError" function to the parent
    // (This is an advanced pattern, but useful)
    const setApiError = (message) => {
      error.value = message;
    }
    defineExpose({ setApiError });
    
    </script>
    
    <style scoped>
    /* * This is the *EXACT SAME CSS* from react-app/src/components/TicketForm.css
     */
    .ticket-form .form-group {
      margin-bottom: 1.25rem;
    }
    
    .ticket-form label {
      display: block;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    
    .ticket-form input,
    .ticket-form textarea,
    .ticket-form select {
      width: 100%;
      padding: 0.75rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      box-sizing: border-box;
    }
    
    .ticket-form textarea {
      min-height: 100px;
      resize: vertical;
    }
    
    .form-error-inline {
      background: #fde2e2;
      color: #9b1c1c;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 1.5rem;
    }
    
    .btn-submit {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      font-weight: bold;
      color: white;
      background-color: #6e8efb;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
    
    .btn-cancel {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      font-weight: bold;
      color: #333;
      background-color: #e5e7eb;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
    </style>
    
