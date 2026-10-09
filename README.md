# Project Management API

Node/Express API for creating, listing, updating, and deleting tasks.

## Local run

1. Copy `backend/.env.example` to `backend/.env` and set `MONGO_URI` to a reachable MongoDB database.
2. Run `npm ci` and `npm start` from `backend`.
3. Check `GET /health`; task routes are available at `/api/tasks`.

## Render

The included `render.yaml` creates a Node web service using `backend` as its root directory. Before deploying, provide a hosted MongoDB connection string as the `MONGO_URI` environment variable; do not use a localhost address.
