# Express.js Application with PostgreSQL Database

## Overview

Express.js server with PostgreSQL database setup using Docker.

## Prerequisites

- Docker: for containerize database
- pgAdmin: (optional) for visual monitoring of database

## Installation and running

1. Navigate to the project directory.

2. Install dependencies:

   ```bash
   npm install

   ```

3. To run the database ensure that you have docker running:

   ```bash
   docker compose up -d

   ```

4. Create a .env file copy the value from .env.example and change based on the env values you set on docker.compose.yml file:
   - username
   - password
   - host
   - port
   - db_name

5. Run prisma command to push schema migration to db:

   ```bash
   npx prisma migrate dev --name init
   ```

6. Run the project:

   ```bash
   npm run start
   ```
