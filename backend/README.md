# Backend API — Routes & Usage

This document lists all available backend HTTP routes for the project, how authentication works, and example requests you can use to interact with the API during development.

Base URL (local): `http://localhost:<PORT>` — default port is read from environment or `3000`.
All routes in this README are mounted under `/api/v1` as configured in the app entrypoint.

**Auth**
- **Base path**: `/api/v1/auth`
- **Purpose**: register/login users and manage session cookies.

Endpoints:

- **POST /signup** : Create a new user and set auth cookies.
  - Accepts: `application/json` or `multipart/form-data` (the server uses `multer().none()` so form fields are allowed).
  - Body fields: `email` (string), `fullName` (string), `password` (string, min 6 chars).
  - Response: sets `accessToken` and `refreshToken` cookies (httpOnly) and returns user data.
  - Example (save cookies to file):

    curl -i -c cookies.txt -H "Content-Type: application/json" \
      -d '{"email":"alice@example.com","fullName":"Alice","password":"secret123"}' \
      http://localhost:3000/api/v1/auth/signup

- **POST /login** : Login an existing user and set auth cookies.
  - Accepts: `application/json` or `multipart/form-data`.
  - Body fields: `email`, `password`.
  - Response: sets `accessToken` and `refreshToken` cookies and returns user data.
  - Example (save cookies):

    curl -i -c cookies.txt -H "Content-Type: application/json" \
      -d '{"email":"alice@example.com","password":"secret123"}' \
      http://localhost:3000/api/v1/auth/login

- **POST /logout** : Clears auth cookies.
  - Protected: requires `accessToken` cookie.
  - Example (use saved cookies):

    curl -i -b cookies.txt -X POST http://localhost:3000/api/v1/auth/logout

- **GET /profile** : Fetch current authenticated user's profile.
  - Protected: requires `accessToken` cookie.
  - Example:

    curl -i -b cookies.txt http://localhost:3000/api/v1/auth/profile

**Avatar**
- **Base path**: `/api/v1/avatar`

- **POST /update-avatar** : Upload or update the authenticated user's avatar.
  - Protected: requires `accessToken` cookie.
  - Accepts: `multipart/form-data` with form field name `avatar` (file).
  - File restrictions: MIME types allowed `image/jpeg`, `image/jpg`, `image/png`, `image/webp`; max size 10 MB.
  - Example (upload file):

    curl -i -b cookies.txt -F "avatar=@/path/to/avatar.png" \
      http://localhost:3000/api/v1/avatar/update-avatar

  - Implementation notes: The file is first stored in `public/temp/avatar` (see multer middleware) then uploaded to Cloudinary. The user document is updated with `avatar` (URL) and `avatarPublicId`.

**Messages**
- **Base path**: `/api/v1/messages`

- **GET /getUsers** : Retrieve list of other users.
  - Protected: requires `accessToken` cookie.
  - The controller expects the logged-in user id to be available as `_id` in the request body (`req.body._id`). The route uses `multer().none()` so you may send the body as JSON or form fields.
  - Example (JSON body with GET):

    curl -i -b cookies.txt -H "Content-Type: application/json" \
      -X GET -d '{"_id":"<yourUserId>"}' \
      http://localhost:3000/api/v1/messages/getUsers

  - Note: Sending a body with a GET request is non-standard but supported by the route implementation. If you prefer, you can modify the server to accept this as a POST.

- **GET /getMessages/:id** : Get conversation messages between the authenticated user and user with id `:id`.
  - Protected: requires `accessToken` cookie.
  - Path param: `:id` is the other user's id (the chat partner).
  - Example:

    curl -i -b cookies.txt http://localhost:3000/api/v1/messages/getMessages/60f7fbb6a1c2a1234567890a

**Authentication & Cookies**
- The app uses cookie-based JWT authentication. After a successful login/signup the server sets two cookies: `accessToken` and `refreshToken` (httpOnly). The `auth` middleware reads `accessToken` from cookies and verifies it using server secret.
- Cookies are set with `httpOnly` and `secure` depending on `NODE_ENV`.

**Response format**
- Successful and error responses follow the `ApiResponse` / `ApiError` pattern. Typical success response shape:

  {
    "statusCode": 200,
    "message": "...",
    "data": { ... },
    "success": true
  }

Errors thrown by the controllers are instances of `ApiError` and will be sent with an appropriate HTTP status code and `message`.

**Middleware & Important Implementation Notes**
- `auth` middleware: verifies `accessToken` cookie and sets `req.user` to the authenticated user object (without `password` and `refreshToken`). See `src/middlewares/auth.middleware.js`.
- `multer` usage:
  - For endpoints that accept form fields only (no files) the routes use `multer().none()` so you can send either JSON or form data.
  - For avatar uploading, `upload.single("avatar")` is used (see `src/middlewares/multer.middleware.js`). Uploaded files are placed in `public/temp/avatar` before being uploaded to Cloudinary.

**Where to look in the code**
- App entry: [src/app.js](src/app.js#L1)
- Server bootstrap: [src/index.js](src/index.js#L1)
- Auth routes: [src/routes/auth.routes.js](src/routes/auth.routes.js#L1)
- Avatar routes: [src/routes/avatar.routes.js](src/routes/avatar.routes.js#L1)
- Messages routes: [src/routes/messages.routes.js](src/routes/messages.routes.js#L1)

**Quick dev tips**
- Start the backend and use `-c cookies.txt` with `curl` to capture cookies on login/signup and `-b cookies.txt` to send them in subsequent requests.
- When testing from the frontend, ensure `fetch`/axios includes credentials (`credentials: 'include'` or `withCredentials: true`) so the browser sends cookies.

If you'd like, I can:
- Add example Postman collection.
- Convert `GET /getUsers` to `POST /getUsers` for more conventional semantics.

## Routes (Summary Table)

| Method | Path | Protected | Handler (file) | Purpose | Body / Params |
|---|---:|:---:|---|---|---|
| POST | /api/v1/auth/signup | No | `signup` — [src/controllers/auth.controller.js](src/controllers/auth.controller.js#L1) | Register user; sets `accessToken` & `refreshToken` cookies | JSON or form: `email`, `fullName`, `password` |
| POST | /api/v1/auth/login | No | `login` — [src/controllers/auth.controller.js](src/controllers/auth.controller.js#L1) | Authenticate user; sets auth cookies | JSON or form: `email`, `password` |
| POST | /api/v1/auth/logout | Yes | `logout` — [src/controllers/auth.controller.js](src/controllers/auth.controller.js#L1) | Clear auth cookies; invalidate refresh token | Cookies: `accessToken` required |
| GET | /api/v1/auth/profile | Yes | `getUser` — [src/controllers/auth.controller.js](src/controllers/auth.controller.js#L1) | Return authenticated user profile | Cookies: `accessToken` required |
| POST | /api/v1/avatar/update-avatar | Yes | `updateAvatar` — [src/controllers/avatar.controller.js](src/controllers/avatar.controller.js#L1) | Upload/update user avatar (stored to Cloudinary) | multipart/form-data: file field `avatar` (<=10MB; jpg/png/webp) |
| GET | /api/v1/messages/getUsers | Yes | `getUsers` — [src/controllers/message.controller.js](src/controllers/message.controller.js#L1) | Return other users (excludes requester) | Expects `req.body._id` (route uses `multer().none()`; body may be JSON/form) |
| GET | /api/v1/messages/getMessages/:id | Yes | `getMessages` — [src/controllers/message.controller.js](src/controllers/message.controller.js#L1) | Get conversation messages between requester and `:id` | Path param `:id` = other user's id; cookies: `accessToken` |
