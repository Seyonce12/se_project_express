# WTWR (What to Wear?): Back End

## Project Overview
This back-end project serves as the API server for the WTWR (What to Wear?) application. It provides endpoints for managing clothing items and users, allowing users to create, retrieve, update, and delete clothing items, as well as like/dislike functionality.

## Features
- User management (create, retrieve users)
- Clothing items management (create, retrieve, delete)
- Like/dislike functionality for clothing items
- MongoDB database for data storage
- RESTful API design

## Technologies and Tools Used
- Express.js
- Node.js
- MongoDB
- Mongoose ODM
- ESLint with Airbnb style guide
- Validator for URL validation
- Nodemon for hot reloading during development
- dotenv for environment variable management

## Running the Project

### Prerequisites
- Node.js installed (v14 or higher recommended)
- MongoDB installed and running on default port (27017)

### Installation
1. Clone the repository:
```
git clone <repository-url>
cd se_project_express
```

2. Install dependencies:
```
npm install
```

3. Create an `.env` file in the root directory with the following content:
```
PORT=3001
DB_ADDRESS=mongodb://127.0.0.1:27017/wtwr_db
```

### Running the server
- Development mode (with hot reload):
```
npm run dev
```

- Production mode:
```
npm run start
```

### API Endpoints

#### Users
- GET /users - Get all users
- GET /users/:userId - Get user by ID
- POST /users - Create a new user

#### Clothing Items
- GET /items - Get all clothing items
- POST /items - Create a new clothing item
- DELETE /items/:itemId - Delete a clothing item
- PUT /items/:itemId/likes - Like a clothing item
- DELETE /items/:itemId/likes - Dislike a clothing item

### Testing
To test the API endpoints, you can use tools like Postman, curl, or any API testing tool.

Example curl command to get all clothing items:
```
curl http://localhost:3001/items
```

Example curl command to create a clothing item:
```
curl -X POST -H "Content-Type: application/json" -d '{"name": "Rain Jacket", "weather": "warm", "imageUrl": "https://example.com/rain-jacket.jpg"}' http://localhost:3001/items

## Production Access

A temporary `/crash-test` route is enabled for PM2 auto‑restart testing.  
Remove it after review is complete.

