# Wanderlust - Backend API

This repository contains the backend server for the Wanderlust travel destination platform. It is built with Node.js, Express.js, and MongoDB.

## Features
- REST API for travel destinations
- Retrieve all destinations
- Retrieve destination details by ID
- Booking API endpoints
- MongoDB database integration
- CORS configuration

## Technologies Used
- Node.js
- Express.js
- MongoDB
- dotenv

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/JannatJimu/wanderlust-server.git
   ```

2. Navigate to the project directory:
   ```bash
   cd wanderlust-server
   ```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/JannatJimu/wanderlust-server.git
   ```

2. Navigate to the project directory:
   ```bash
   cd wanderlust-server
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the project root and configure the required environment variables.

5. Start the development server:
   ```bash
   nodemon index.js
   ```

## Environment Variables

Create a `.env` file and configure the following variables according to your project setup:

```env
PORT=5000
CLIENT_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
```

- `PORT`: The port on which the backend server runs.
- `CLIENT_URL`: The frontend application's URL.
- `MONGODB_URI`: Your MongoDB connection string.





