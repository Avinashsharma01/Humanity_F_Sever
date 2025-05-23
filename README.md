# Server for Humanity Founders

## Overview
This backend server provides API endpoints for user authentication and management for the Humanity Founders platform. It's built with Node.js, Express, and MongoDB.

## Table of Contents
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Database Schema](#database-schema)
- [Error Handling](#error-handling)

## Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone <repository-url>
cd Server_for_Humanity_founders
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=1d
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRY=7d
```

4. Start the server
```bash
npm start
```

## Environment Variables
- `PORT`: Port on which the server runs (default: 3000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `JWT_EXPIRY`: JWT token expiration time
- `JWT_REFRESH_SECRET`: Secret for refresh tokens
- `JWT_REFRESH_EXPIRY`: Refresh token expiration time

## API Endpoints

### Authentication
- **POST /api/user/register** - Register a new user
  - Request Body:
    ```json
    {
      "name": "User Name",
      "email": "user@example.com",
      "password": "password"
    }
    ```
  - Response (201):
    ```json
    {
      "message": "User registered successfully",
      "_id": "user_id",
      "name": "User Name",
      "email": "user@example.com",
      "token": "jwt_token"
    }
    ```

- **POST /api/user/login** - Login a user
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "password"
    }
    ```
  - Response (200):
    ```json
    {
      "message": "User logged in successfully",
      "_id": "user_id",
      "name": "User Name",
      "email": "user@example.com",
      "token": "jwt_token"
    }
    ```

### User Profile
- **GET /api/user/getuser** - Get user profile (Protected route)
  - Headers:
    ```
    Authorization: Bearer your_jwt_token
    ```
  - Response (200):
    ```json
    {
      "_id": "user_id",
      "name": "User Name",
      "email": "user@example.com"
    }
    ```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. When a user registers or logs in, a JWT token is generated and returned
2. For protected routes, include the token in the Authorization header:
   ```
   Authorization: Bearer your_jwt_token
   ```
3. The token expires based on the JWT_EXPIRY environment variable (default: 1 hour)

## Database Schema

### User
```javascript
{
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Resource created successfully
- `400` - Bad request (e.g., validation error, duplicate email)
- `401` - Unauthorized (invalid or missing token)
- `404` - Resource not found
- `500` - Server error

Error responses follow this format:
```json
{
  "message": "Error message"
}
```

## Development
To run the server in development mode with auto-restart:
```bash
npm start
```
