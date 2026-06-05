# Contacts API Project

This repository contains a backend API for a contacts application.

## Project structure

- `backend/` - Node.js API server
- `frontend/` - static frontend code (not required for project deployment)

## Backend setup

1. Copy `backend/.env.example` to `backend/.env`.
2. Fill in the following variables:
   - `MONGODB_URI`
   - `MONGODB_DBNAME`
   - `MONGODB_COLLECTION`
   - `PORT` (optional)
3. Install dependencies:

```bash
cd backend
npm install
```

4. Seed the database (optional):

```bash
npm run seed
```

5. Start the server:

```bash
npm start
```

## API endpoints

- `GET /api/contacts` - get all contacts
- `GET /api/contacts/:id` - get a single contact by ID
- `POST /api/contacts` - create a new contact
- `PUT /api/contacts/:id` - update a contact by ID
- `DELETE /api/contacts/:id` - delete a contact by ID
- `GET /api-docs` - Swagger UI documentation

## Render deployment

This repository includes a `render.yaml` file to deploy the backend service.

- Render service root: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Required environment variables:
  - `MONGODB_URI`
  - `MONGODB_DBNAME`
  - `MONGODB_COLLECTION`

### Deploying to Render

1. Push your repo to GitHub.
2. In Render, create a new Web Service.
3. Connect the GitHub repository.
4. Use the `render.yaml` configuration in the repo.
5. Add required environment variables in the Render dashboard.

## Notes

- The backend uses `dotenv` to load environment variables from `backend/.env` during local development.
- Swagger UI is available at `/api-docs` when the server is running.
