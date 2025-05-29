
# biteSpeed-Assignment

[Live Demo](https://bitespeed-assignment-qpne.onrender.com)

---

## Overview

`biteSpeed-Assignment` is a simple Express.js API server built with TypeScript and MongoDB. It exposes endpoints to identify contacts and demonstrates basic CRUD operations.

---

## Features

* Express server with TypeScript support
* MongoDB integration using Mongoose
* CORS enabled for cross-origin requests
* Endpoint `/api/identify` to identify contact
* Environment variables for configuration
* Nodemon for development

---

## Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your actual MongoDB URI.

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Virenishere/biteSpeed-Assignment.git
```

2. Install dependencies:

```bash
npm install
```

3. Run the server in development mode (with nodemon):

```bash
npm run dev
```

Or build and start the server:

```bash
npm start
```

---

## API Endpoints

### GET `/`

* Description: Health check endpoint to verify the API is running
* Response:

```json
{
  "message": "api is working..."
}
```

### POST `/api/identify`

* Description: Endpoint to identify contact based on request payload
* Usage:

Send a POST request with JSON body to `/api/identify`

## Screenshots

Add screenshots below by replacing the placeholder links:

added the mail and phone number 

![Image](https://github.com/user-attachments/assets/0d68e85c-c56b-4ada-9429-556e65768828)

added the another mail on same contact number
 
![Image](https://github.com/user-attachments/assets/453880c1-ac69-4811-a720-18ede631b05c)


added without mail as null and phonenumber

![Image](https://github.com/user-attachments/assets/2327c89a-00a9-41ad-91e3-e1e499f7c1eb)

and so on like this.

---

## Project Structure

```
bitespeed-assignment/
├── src/
│   ├── controllers/
│   │   └── identifyController.ts
│   ├── routes/
│   │   └── identifyRoutes.ts
│   ├── config/
│   │   └── dbConnection.ts
│   └── index.ts
├── dist/
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

## Contact

If you have any doubts or queries, feel free to reach out via email:
📩 virender288@gmail.com



