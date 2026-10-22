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

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file and configure the required environment variables.

5. Start the server:
   ```bash
   npm start
   ```

## Environment Variables

Configure the MongoDB connection string, port, and frontend URL in your environment file.

**Note:** Never commit `.env` files or database credentials to GitHub.
