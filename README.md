## Undecided ABA – 4661 Class Project

Undecided ABA is a mobile application built for an upper‑level course project (4661) Mobile Application Development. It is an ABA (Applied Behavior Analysis) or client‑tracking–style app where a practitioner can log in, manage clients, track goals/sessions, take notes, and review basic reports.

This project was developed by Dylan Tran, Blake Tapie, Bryceton White, Jevon Julian, and Micah Pierce. 

The project was broken up into several milestones to modularize development into abstract, user feedback, and physical implementations.
Such milestones include things like creating wireframes or storyboard for the app and getting interviews with people in the demographic that would be using our app. The last set of milestones were coding, revising and showcasing our app. 

## Key Features

- **Authentication**
  - Email/password style auth built on top of Firebase (via `api/firebase.js`).
  - Screens for both `Login` and `Sign Up`.

- **Client Management**
  - Dedicated screen for listing or viewing clients: `ClientScreen`.
  - Screen to create new clients: `CreateClientScreen`.

- **Session and Goal Tracking**
  - `GoalsScreen` for managing client goals.
  - `SessionTaskListScreen` for tasks within a session.
  - `GroupTrackingScreen` for tracking groups of clients/sessions.

- **Notes and Reports**
  - `NotesScreen` for capturing session or client notes.
  - `ReportsScreen` intended for summarizing progress and other reporting views.

- **Navigation / App Shell**
  - `HomeScreen` as the landing or hub screen after authentication.
  - Centralized navigation and app bootstrap logic in `App.js` and `index.js`.

---

## Tech Stack

- **Frontend**
  - React Native (JavaScript)
  - Expo (see `app.json` and `index.js` using `registerRootComponent` from `expo`)

- **Backend / Services**
  - Firebase Realtime Database (via REST API calls in `api/firebase.js`) for authentication-like user handling and client data storage.
  - Password hashing with `crypto-js` (`SHA256`).
  - HTTP requests with `axios`.

- **Tooling**
  - npm (see `package.json` / `package-lock.json`)

---

## Project Structure (High Level)

- **`UndecidedABA/App.js`**
  - Main application entry point, sets up React Navigation stack, wraps the app in `SafeAreaProvider`, and provides `Auth`, `Clients`, and `Tasks` context providers.
  - Determines whether to start on `SignUp` or `Login` based on `checkIfFirstTimeUser` from `api/firebase.js`.

- **`UndecidedABA/index.js`**
  - Root entry for the Expo app, using `registerRootComponent(App)` from `expo`.

- **`UndecidedABA/api/firebase.js`**
  - Wraps calls to the Firebase Realtime Database REST API.
  - Implements:
    - `signInWithEmailAndPassword`
    - `signUpWithEmailAndPassword`
    - `checkIfFirstTimeUser`
    - `saveClients`
    - `loadClients`

- **`UndecidedABA/contexts/index.js`**
  - Central place to define and export React Contexts for:
    - `Auth` (`AuthProvider`, `useAuth`) – stores `currentUser`, `login`, and `logout`.
    - `Clients` (`ClientsProvider`, `useClients`) – loads and saves clients per user using Firebase, exposes `clients` and `addClient`.
    - `Tasks` (`TasksProvider`, `useTasks`) – manages in-memory per-client task lists (`getTasks`, `setTasks`, `addTask`, `updateTask`, `deleteTask`).

- **`UndecidedABA/screens/`**
  - `LoginScreen.js` / `SignUpScreen.js`: User authentication flows.
  - `HomeScreen.js`: Main landing screen after login, shows the current user, their clients, and navigation to client details and other areas.
  - `ClientScreen.js`: View/manage clients.
  - `CreateClientScreen.js`: Add new client records.
  - `GoalsScreen.js`: Manage goals per client.
  - `SessionTaskListScreen.js`: Track tasks during a session.
  - `GroupTrackingScreen.js`: Group‑level session tracking.
  - `NotesScreen.js`: Session notes.
  - `ReportsScreen.js`: Reporting and summaries.

- **`UndecidedABA/assets/`**
  - App icons, splash images, and other static assets (`icon.png`, `splash-icon.png`, etc.).

---

## Getting Started (Local Development)

> Note: The steps below assume a standard React Native / Expo setup. Adjust commands as needed based on how this project was originally scaffolded.

- **1. Install Dependencies**

  From the `UndecidedABA` directory:

  ```bash
  npm install
  ```

- **2. Configure Firebase**

  - Open `api/firebase.js`.
  - Ensure the Firebase project configuration (API key, project ID, etc.) is filled in for your own Firebase project if you are running this outside the original environment.

- **3. Run the App**

  From the `UndecidedABA` directory, one of the following (depending on `package.json` scripts and whether Expo is used):

  ```bash
  # Common Expo start command
  npx expo start

  # or if defined in package.json
  npm start
  ```

  Then:
  - Use the Expo Go app (on iOS/Android) or an emulator/simulator to run the app, depending on your setup.

---