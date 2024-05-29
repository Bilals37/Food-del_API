# Food Delivery API

Welcome to the Food Delivery API! This API serves as the backend for a food delivery application, providing functionalities for managing food items, user accounts, carts, and orders.

## Introduction

The Food Delivery API is designed to streamline the process of managing food delivery operations. It allows users to browse available food items, create accounts, add items to their carts, place orders, and track the status of their orders.

## Features

- **Food Management**: Create, update, and delete food items.
- **User Authentication**: Register new users, log in existing users, and authenticate requests.
- **Shopping Cart**: Add and remove items from the shopping cart.
- **Order Management**: Place orders, view order history, and update order statuses.

## Technologies Used

The Food Delivery API is built using the following technologies:

- **Node.js**: JavaScript runtime environment for server-side development.
- **Express.js**: Web application framework for building APIs and web applications.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: MongoDB object modeling tool for Node.js.
- **JWT (JSON Web Tokens)**: For user authentication and authorization.
- **Bcrypt**: For hashing passwords.
- **Cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **Dotenv**: For loading environment variables from a .env file.

## Setup

To set up the Food Delivery API locally, follow these steps:

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file in the root directory and add the necessary environment variables, such as:
   - `MONGODB_URI`: MongoDB connection string.
   - `JWT_SECRET`: Secret key for generating JWT tokens.
   - Other environment variables as required.
4. Start the server using `npm start`.

## API Endpoints

- **Food Management**:
  ```http
  GET /api/food
  POST /api/food
  DELETE /api/food/:id

## User Authentication

POST /api/user/register
POST /api/user/login

## Shopping Cart

POST /api/cart/add
DELETE /api/cart/remove/:itemId

## Order Management

POST /api/order/place
GET /api/order/history
PATCH /api/order/:orderId/status


## Usage

1.Use tools like Postman or curl to send requests to the API endpoints.
2.Ensure proper authentication by including a valid JWT token in the request headers.
3.Refer to the API documentation or source code for details on request/response formats and authentication requirements.


## Contributing

Contributions to the Food Delivery API are welcome! Feel free to open issues or submit pull requests for new features, bug fixes, or improvements.