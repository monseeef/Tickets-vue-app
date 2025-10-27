TicketApp - Vue.js Implementation

This is the Vue.js implementation of the Multi-Framework Ticket Web App. It is a complete, standalone application built with Vue 3, Vite, and Vue Router, using the modern <script setup> (Composition API) syntax.

The app features a complete user authentication flow (simulated with localStorage) and full CRUD (Create, Read, Update, Delete) functionality for managing support tickets.

Features

Landing Page: A responsive hero page with a CSS-wave background.

Authentication: Secure login and signup pages.

Protected Routes: Dashboard and Ticket pages are only accessible to logged-in users via Vue Router's navigation guards.

Dashboard: Displays real-time summary statistics based on ticket status.

Ticket Management (CRUD):

Create: Create new tickets via a modal form.

Read: View all tickets in a responsive card grid.

Update: Edit existing tickets using the same modal form.

Delete: Remove tickets with a confirmation prompt.

Notifications: User-friendly success/error toasts for all actions.

Persistence: All user sessions and ticket data are persisted in localStorage.

Tech Stack (Frameworks & Libraries)

Core: Vue 3 (Composition API)

Build Tool: Vite

Routing: vue-router (v4)

Global State (Auth & Tickets): Vue Composables (in src/store). This is Vue's modern, hook-like replacement for global state management like Vuex or Context.

Notifications: vue-hot-toast

Unique IDs: uuid

Styling: Plain CSS (scoped to components in <style scoped>).

Data Storage: localStorage

Setup & Running the App

Navigate to the directory:

cd ticket-vue-app


Install dependencies:

npm install


Run the development server:

npm run dev


Open in your browser:
The app will be running at http://localhost:5173 (or the next available port).

Test User Credentials

You can use the following hard-coded test user to log in:

Email: test@user.com

Password: password123

Alternatively, you can create a new account on the "Sign Up" page. Any email/password will work, and you will be logged in immediately.

Project Structure & State

src/pages: Contains the top-level components for each route (e.g., LandingPage.vue, DashboardPage.vue).

src/components: Contains reusable UI elements used across various pages (e.g., MainLayout.vue, TicketCard.vue, Modal.vue).

src/router/index.js: Defines all application routes and includes the navigation guard (router.beforeEach) for protecting auth-only routes.

src/store/auth.js: A "composable" (Vue's version of a hook) that encapsulates all authentication logic. It provides reactive state (session, isAuthenticated) and methods (login, logout) to any component that imports useAuth(). It persists data to localStorage under the key ticketapp_session.

src/store/tickets.js: A composable that encapsulates all ticket management (CRUD) logic. It provides the reactive tickets array, loading/error state, and CRUD functions. It syncs all changes to localStorage under the key ticketapp_tickets.

Notes

Accessibility: Basic accessibility is implemented using semantic HTML, form labels, and button elements. <Teleport> is used for the modal to ensure it renders at the top of the DOM tree.

Known Issues: This is a frontend-only simulation. All data is stored in localStorage, which is not secure. The test user (test@user.com) is hard-coded in src/store/auth.js.

Other Versions: This is the Vue version of the project. The other implementations can be found in the /react-app and /twig-app folders in the root directory.