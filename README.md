# SpaceLine — Real‑Time Chat Application

SpaceLine is a modern real‑time 1:1 chat application built with a React (Vite) frontend and an Express + MongoDB backend. It supports authentication, contact discovery, messaging, image attachments, and live updates via Socket.IO.

---

## Highlights

- Real‑time messaging with **Socket.IO**
- JWT-based auth with **httpOnly cookies**
- Contacts list (excluding the logged-in user)
- Message history per conversation
- Image attachments (multipart upload + Cloudinary)
- Clean UI using **TailwindCSS + DaisyUI**

---

## Tech Stack

**Frontend**
- React + Vite
- Zustand (state)
- Axios (API)
- socket.io-client (real-time)
- TailwindCSS + DaisyUI

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT (access + refresh)
- Multer (uploads)
- Cloudinary (image hosting)
- Socket.IO (real-time)

---

## Project Structure

```
spaceLine/
  backend/   # Express API + Socket.IO + MongoDB
  frontend/  # React (Vite) client
```

---

## Local Development

### 1) Install dependencies

**Backend**
```bash
cd backend
npm install
```

**Frontend**
```bash
cd ../frontend
npm install
```

### 2) Configure environment variables

Create `backend/.env` (for local development) using `backend/.env.example` as a template.

Minimum required values:
- `PORT`
- `MONGODB_URI`
- `ORIGIN` (usually `http://localhost:5173`)
- JWT secrets/expiries
- Cloudinary credentials

### 3) Run the app

Run **backend**:
```bash
cd backend
npm run dev
```

Run **frontend**:
```bash
cd frontend
npm run dev
```

Open the app:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000/api/v1`

---

## Key API Routes

Base URL: `/api/v1`

- `POST /auth/signup`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/profile`

- `GET /messages/getUsers`
- `GET /messages/getMessages/:id`
- `POST /messages/send/:id` (multipart form-data; `image` field)

---

## Socket.IO Events

**Server → Client**
- `getOnlineUsers` — broadcasted list of online user IDs
- `newMessage` — emitted to the receiver when a message is sent

**Connection**
- Client connects with query param: `userId=<mongoUserId>`

---

## Deployment (Render)

Render does **not** load `.env` files automatically like local dev. Use Render’s dashboard to set environment variables.

### Environment variables to set on Render

- `NODE_ENV=production`
- `PORT` (Render provides this automatically in many setups; keep your code using `process.env.PORT`)
- `MONGODB_URI`
- `ORIGIN` (your deployed frontend URL)
- `ACCESS_TOKEN_SECRET_KEY`, `REFRESH_TOKEN_SECRET_KEY`
- `ACCESS_TOKEN_EXPIRY`, `REFRESH_TOKEN_EXPIRY`
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

### Build & start

If you are serving the built frontend from the backend, you must build the frontend during deploy.

Example Render commands (adjust paths to match your service root):

**Build Command**
```bash
npm install && npm --prefix ../frontend install && npm --prefix ../frontend run build
```

**Start Command**
```bash
npm start
```

---

## Security Notes

- Never commit real secrets. Keep `.env` out of git (already in `.gitignore`).
- If secrets were ever pushed, rotate them immediately (MongoDB, Cloudinary, JWT secrets).

---

## Roadmap / Ideas

- Read receipts & typing indicators
- Group chats
- Message deletion/editing
- Better presence (last seen)

---

## License

ISC
