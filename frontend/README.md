# SpaceLine Frontend

React + Vite frontend for the SpaceLine chat application.

## Tech Stack

- React (Vite)
- Zustand
- Axios
- Socket.IO client
- TailwindCSS + DaisyUI

## Prerequisites

- Node.js 18+ recommended
- Backend running (see ../backend)

## Install

- cd frontend
- npm install

## Run

- npm run dev

Vite will print the local URL (commonly http://localhost:5173).

## Environment Variables (optional)

Create frontend/.env if you need to override the socket server URL:

- VITE_SOCKET_URL=http://localhost:5000

Notes:

- API base URL is configured in src/lib/axios.js (defaults to http://localhost:5000/api/v1)
- Socket defaults to http://localhost:5000 in development unless VITE_SOCKET_URL is set

## Scripts

- npm run dev
- npm run build
- npm run preview
- npm run lint

## Troubleshooting

- Live updates not working: confirm the backend is running and the socket URL matches.
- Image upload errors: backend multer limit is 10MB by default.
