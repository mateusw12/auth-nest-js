<p align="center">
  <a href="http://nestjs.com/" target="_blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
</p>

# NestJS API Starter

## Description

This is a **NestJS API** starter project built with TypeScript.  
It includes:

- JWT-based authentication
- Users stored in memory (with hashed passwords)
- Protected routes using `@Auth()` decorator
- Swagger documentation for endpoints

---

## Prerequisites

- Node.js >= 18
- npm >= 9

---

## Project setup

```bash
# Install dependencies
npm install
```

## Environment Variables

Create a .env file at the root of the project:

```bash
PORT=3001
JWT_SECRET=your_super_secret_key
```

- JWT_SECRET is used to sign and validate JWT tokens.
  You can generate a strong secret with:
- openssl rand -hex 32

## Running the Application

```bash
# Start in development mode
npm run start:dev

# Start normally
npm run start

# Start in production mode
npm run start:prod
```

The API will run on http://localhost:3001.

## Authentication Flow

- Create an admin user (optional: automatically created on startup).
- Login with POST /auth/login:

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"123456"}'
```

Response

```bash
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
- Use this token in the Authorization header for protected routes:

```bash
Authorization: Bearer <access_token>
```

## API Endpoints

| Method | Endpoint   | Description    |
| ------ | ---------- | -------------- |
| GET    | /items     | List all items |
| GET    | /items/:id | Get item by ID |

### Protected Routes (require JWT)

| Method | Endpoint   | Description             |
| ------ | ---------- | ----------------------- |
| POST   | /items     | Create a new item       |
| PUT    | /items/:id | Update an existing item |
| DELETE | /items/:id | Delete an item          |

- Example: Create an item with JWT:

```bash
curl -X POST http://localhost:3001/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <access_token>" \
  -d '{"name":"New Item","description":"Item description"}'
```

## Swagger Documentation

Swagger UI is available at:

```bash
http://localhost:3001/api
```
You can explore the API, view models, and test endpoints interactively.

## Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Generate test coverage
npm run test:cov
```

## Deployment
```bash
# Run
npm run start:dev
```