# CSE 341 - Contacts API (Week 1)

## Description
This is a REST API for managing contacts, built with Node.js, Express, and MongoDB Atlas.

## Week 1 Features
- GET /contacts - Returns all contacts
- GET /contacts/:id - Returns a single contact by ID

## Installation
1. Clone repository
2. Install dependencies: `npm install`
3. Create .env file with MongoDB URI:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/cse341
   PORT=3000
   ```
4. Run server: `npm start`

## Testing
- Use routes.rest with VS Code REST Client extension
- Or run test-api.js: `node test-api.js`

## Project Structure
```
contacts-api/
├── controllers/       # Request handlers
├── db/               # Database connection
├── routes/           # API routes
├── .env              # Environment variables (not on GitHub)
├── .gitignore        # Ignored files
├── app.js            # Main server file
└── package.json      # Dependencies
```
