    <!-- In src/components/Modal.vue -->
    <template>
      <!-- 
        We use <Teleport> to move this modal's HTML
        to the end of the <body> tag. This is a best practice
        to avoid CSS (z-index, overflow) issues.
      -->
      <Teleport to="body">
        <!-- 
          We use <Transition> for a nice fade-in/out effect.
          The classes (e.g., "fade-enter-active") are defined in the CSS.
        -->
        <Transition name="fade">
          <!-- The modal only renders if the "isOpen" prop is true -->
          <div
            v-if="isOpen"
            class="modal-backdrop"
            @click="$emit('close')"
          >
            <!-- 
              @click.stop prevents a click inside the modal
              from bubbling up and closing the modal.
            -->
            <div class="modal-content" @click.stop>
              <div class="modal-header">
                <h3>{{ title }}</h3>
                <button @click="$emit('close')" class="modal-close-btn">
                  &times;
                </button>
              </div>
              <div class="modal-body">
                <!-- 
                  <slot> is Vue's version of {children}.
                  This is where the <TicketForm> will go.
                -->
                <slot></slot>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
    </template>
    
    <script setup>
    // This component accepts these props
    defineProps({
      isOpen: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: 'Modal Title',
      },
    });
    
    // And it emits this event
    defineEmits(['close']);
    </script>
    
    <style scoped>
    /* * This is the *EXACT SAME CSS* from react-app/src/components/Modal.css
     * Plus, we add the "fade" transition styles
     */
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    
    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      width: 100%;
      max-width: 500px;
      z-index: 1001;
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eee;
      padding-bottom: 1rem;
      margin-bottom: 1rem;
    }
    
    .modal-header h3 {
      margin: 0;
    }
    
    .modal-close-btn {
      background: transparent;
      border: none;
      font-size: 2rem;
      cursor: pointer;
      line-height: 1;
      padding: 0;
    }
    
    /* --- Transition Styles --- */
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.2s ease;
    }
    
    .fade-enter-from,
    .fade-leave-to {
      opacity: 0;
    }
    </style>
    
