Run the project locally:
```bash
tsc
node index.js  
```

# HeroChat - Chat App API

This project is a RESTful API for a chat application, which provides user authentication and manages user data. The API is built using Node.js, Express, and MySQL.

## Table of Contents

- [Setup](#setup)
- [Endpoints](#endpoints)
    - [Create User](#create-user)
    - [Authenticate User](#authenticate-user)
    - [Get User Data](#get-user-data)
- [Development Notes](#development-notes)
- [Bugs and Known Issues](#bugs-and-known-issues)
- [Docker Integration](#docker-integration)
- [Cyber Security Measures Implemented](#cyber-security-measure-implemented)

## Setup

1. Install [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/get-npm) if you haven't already.
2. Clone the repository: `git clone https://github.com/yourusername/chatapp-api.git`
3. Change directory to the project folder: `cd chatbot_backend-authlogin`
4. Install dependencies: `npm install`
5. (Optional) The MySQL can be set up seperatly (see sql code in /mysql and configs in /src/configs/), otherwise the current credentials will connect to a database hosted in the google cloud.
7. Transpile the TypeScript code: `tsc` or `npm run build`
8. Start the server: `node index.js` or `npm start`
9. The API should now be running at `http://localhost:8080`.

## Endpoints

### Create User

- **URL:** `/api/create-user`
- **Method:** `POST`
- **Data Params:**
    - `username=[string]`
    - `password=[string]`
    - `location=[string]` (optional)
- **Success Response:**
    - **Code:** 201
    - **Content:** `{ "status_code": 201, "token": "JWT_TOKEN" }`
- **Error Responses:**
    - Various 400, 404, and 500 errors based on input validation and server errors.

### Authenticate User

- **URL:** `/api/authenticate`
- **Method:** `POST`
- **Data Params:**
    - `username=[string]`
    - `password=[string]`
- **Success Response:**
    - **Code:** 200
    - **Content:** `{ "status_code": 200, "token": "JWT_TOKEN" }`
- **Error Responses:**
    - Various 400, 404, and 500 errors based on input validation and server errors.

### Get User Data

- **URL:** `/api/get-user-data`
- **Method:** `POST`
- **Data Params:**
    - `token=[string]`
- **Success Response:**
    - **Code:** 200
    - **Content:** `{ "status_code": 200, "user_id": USER_ID, "username": "USERNAME", "location": "LOCATION" }`
- **Error Responses:**
    - Various 400 and 500 errors based on input validation and server errors.

## Development Notes

- The API is designed with a model-controller structure, where the `models` folder contains the logic for interacting with the database and the `controllers` folder handles the incoming HTTP requests.
- Utility functions are located in the `utils` folder, and include input validation and hashing functions.
- The `middlewares` folder contains middleware functions for handling JWT tokens, such as decoding, creating, and checking expiration status.
- The `configs` folder contains the configuration for the MySQL database and secrets for hashing and JWT tokens.
- The project uses the `mysql2` package for connecting to the MySQL database and the `jsonwebtoken` package for handling JWT tokens.

## Bugs and Known Issues

- The project includes a Dockerfile, but it currently does not build a fully functional server. Once the Docker configuration is fixed, it will allow for easier deployment and integration with other projects, such as HeroChat.

## Docker Integration

- The project contains a Dockerfile for building a containerized version of the server. However, it is currently not functional and requires further configuration and bug fixes. Once the Dockerfile is properly set up, it will allow the Chat App API to be easily integrated into the HeroChat project or other similar applications.

## Cyber Security Measures Implemented

1. Password hashing: User passwords are hashed using a secure hashing algorithm (SHA-256) before storing them in the database, ensuring that plain-text passwords are not stored and reducing the risk of password leaks.
2. Auth tokens: JSON Web Tokens (JWT) are used for user authentication. JWTs are signed using a secret key, ensuring the authenticity of the token.
3. Input validation: User input is validated using regular expressions to ensure that only valid data is processed by the server, reducing the risk of SQL injection and other injection-based attacks.
4. Error handling: Proper error handling is implemented in the codebase to prevent the exposure of sensitive information to unauthorized users.

## Current Flaws and Cyber Security Threats

1. Insecure storage of secrets: The secrets.json file currently stores sensitive information such as the JWT secret and hashing secret in plain text. This should be moved to a more secure storage mechanism, such as environment variables or a secret management system like HashiCorp Vault.
2. No rate limiting: The API currently does not implement rate limiting, making it susceptible to brute-force attacks and denial of service (DoS) attacks.
3. No HTTPS: The server is currently not set up to use HTTPS, which means that data transmitted between the client and server is not encrypted and could be intercepted by a third party.
4. Dockerfile not functional: The project includes a Dockerfile, but it does not currently build a functional server. Once the Dockerfile is properly set up, it will help ensure a consistent environment across deployments and reduce the risk of security vulnerabilities due to environment inconsistencies.
5. SQL injection vulnerability: Although input validation is performed on certain fields, there might still be a risk of SQL injection if user input is not properly escaped or parameterized in SQL queries.
6. Lack of access controls: The API currently does not have fine-grained access controls to limit what actions users can perform based on their permissions or roles.
7. No logging or monitoring: There is no logging or monitoring implemented in the API, making it difficult to detect and respond to security incidents.


