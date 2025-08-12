# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Backend Repo Link
This UI is configured for your Spring Boot backend:
- https://github.com/ZCollier-dev/sdat-devops-zss-sprint-api

### Two ways to connect
1) **Proxy (default during `npm run dev`)**  
   The Vite dev server proxies `/api/*` to `http://localhost:8080`.  
   - Keep `VITE_API_URL` unset and the frontend will call `/api/...`.
   - Start backend on port 8080 and frontend on 5173.

2) **Direct URL (when deploying or different host/port)**  
   Set an environment file:
   ```bash
   echo "VITE_API_URL=http://localhost:8080" > .env.local
   ```
   The frontend will call the backend directly without the proxy.
