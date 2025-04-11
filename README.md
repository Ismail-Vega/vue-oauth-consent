# Vue OAuth2 Consent Screen

This project demonstrates a working OAuth 2.0 consent screen with PKCE, routing, and responsive UI powered by Vuex, Vue Router, Tailwind CSS, and Vite.

## 🛠 Tech Stack

- [Vue 3](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vuex](https://vuex.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)
- [UUID](https://github.com/uuidjs/uuid)
- [QS](https://github.com/ljharb/qs)

## Project Setup

Clone the repository:

```bash
git clone https://github.com/your-username/vue-oauth-consent.git
cd vue-oauth-consent
```

### Install dependencies

```bash 
npm install
```

### Start the development server

```bash 
npm run dev
```

Then open http://localhost:5173 in your browser.

### Build for Production

```bash
npm run build
```

This will output the built files to the dist/ directory.

### To preview the production build locally

```bash
npm run preview
```

## Project Structure

```bash
src/
├── api/            # Encapsulates network calls to backend endpoints
├── components/     # Reusable UI components
├── composables/    # Houses logic for reusable hooks, especially `useOAuth`
├── router/         # Vue Router setup
├── store/          # Vuex store
├── utils/          # Contains helper functions like `generateCodeVerifier()` and `generateCodeChallenge()` for PKCE.
├── views/          # Page-level components
├── App.vue         # Root component
└── main.js         # App entry point
```

## Notes

The OAuth PKCE flow is simulated and intended for front-end demonstration purposes only.
