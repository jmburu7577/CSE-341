# Professional Profile Backend API

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed locally OR MongoDB Atlas account

### Installation

1. Install dependencies:
```bash
npm install
```

### MongoDB Setup

#### Option 1: Local MongoDB
1. Install MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   - Windows: `mongod`
   - Mac: `brew services start mongodb-community`
   - Linux: `sudo systemctl start mongod`
3. Update `.env` file (already set to `mongodb://localhost:27017`)

#### Option 2: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Get your connection string
4. Update `.env` file with your MongoDB Atlas connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/professional_db
```

### Running the Server

```bash
npm start
```

The server will start on `http://localhost:8080`

### API Endpoints

#### GET /professional
Returns all professional profile data from MongoDB

**Response:**
```json
{
  "professionalName": "John Doe",
  "base64Image": "...",
  "nameLink": {
    "firstName": "John Doe",
    "url": "https://www.linkedin.com/in/johndoe"
  },
  "primaryDescription": "Full Stack Developer | Software Engineer",
  "workDescription1": "...",
  "workDescription2": "...",
  "linkTitleText": "Connect with me:",
  "linkedInLink": {
    "text": "LinkedIn",
    "link": "https://www.linkedin.com/in/johndoe"
  },
  "githubLink": {
    "text": "GitHub",
    "link": "https://github.com/johndoe"
  }
}
```

#### GET /health
Returns server status

### Testing with REST Client

Use the `test.http` file to test endpoints:
- Click "Send Request" in VS Code (requires REST Client extension)
- Or use Postman/Insomnia to test the endpoints

### Features
- ✅ REST API for professional profile data
- ✅ MongoDB integration for data persistence
- ✅ Automatic sample data initialization
- ✅ CORS enabled for frontend integration
- ✅ Fallback to sample data if MongoDB is unavailable
