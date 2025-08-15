# Airport System Frontend (React + Vite)

## Deploy URL:
http://sprint-frontend.com.s3-website.us-east-2.amazonaws.com/

## Notes for Team:
A clean, framework-free CSS frontend for the Spring Boot Airport API.  
Includes public dashboards, tables, prebuilt queries, and an admin area with CRUD.

## Quick start
```bash
npm i
echo "VITE_API_URL=http://localhost:8080" > .env.local  # or rely on /api proxy
npm run dev
```
- Dev proxy forwards `/api/*` to `http://localhost:8080` (see `vite.config.js`).
- For production, set `VITE_API_URL` to your backend URL and build.

## Structure
- `src/layouts/PublicLayout.jsx` – public nav & layout
- `src/layouts/AdminLayout.jsx` – admin nav & layout
- `src/components/RequireAuth.jsx` – route guard using localStorage token
- `src/pages/public/*` – user-facing pages
- `src/pages/admin/*` – admin CRUD
- `src/styles/base.css` – all classic CSS (no Tailwind/MUI)

## Admin auth
This starter assumes a JWT/token via `/auth/login`. Replace the login call in `pages/auth/Login.jsx` with the real endpoint.

## Notes
- Update field names and endpoints to match your backend DTOs.
- Charts use `recharts`.

