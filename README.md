# Arithmetic Calculator REST API

This is a Node.js based backend REST API for a simple arithmetic calculator functionality. The API supports the following basic arithmetic operations: 
- Addition
- Subtraction
- Multiplication
- Division
- Square root
- Random string generation.

Each operation has a separate cost per request, and users have a starting credit/balance. Each request will be deducted from the user's balance, and if the user's balance is not enough to cover the request cost, the request will be denied.

## Prerequisites

Before getting started, you should have the following installed on your system:

- Node.js
- npm (or yarn)
- TypeScript

## Instructions 🚀

To use this project, follow these steps:

Clone this repository using the following command:

```
git clone https://github.com/raffalopez/calculator-web-platform.git
```

Install dependencies using the following command:

```
npm install
```

## Configuration

Create a .env file in the root directory of your project with the following environment variables:

```
NODE_ENV=development
PORT=5000
DB_NAME=postgres
DB_USER=admin
DB_PASSWORD=admin123
DB_HOST=localhost
DB_PORT=5432
SECRET_KEY=
API_KEY_RANDOM_ORG=
```
Generate a secret key for jsonwebtoken services and complete the SECRET_KEY value

Get api key from https://www.random.org/ and complete the API_KEY_RANDOM_ORG value

## Running Database  
Create and run Postgres image

```
docker-compose up
```

Then access to pgadmin consloe and create dabase with the following configuration

```
Name=postgres
User=admin
Password=admin123
```

## Running the Server

To start the server, run the following command:

```
npm run dev
```

This will start the server on the port specified in the .env file.

## API Endpoints

The API endpoints are defined in the routerApi function in index.ts.

- /api/v1/users - User endpoints
- /api/v1/auth - Authentication endpoints
- /api/v1/operations - Operations endpoints
- /api/v1/record - Record endpoints


## Author 👨🏻‍💻

- **Rafael Lopez** - [raffalopez](https://github.com/raffalopez)