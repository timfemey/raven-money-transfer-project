# Raven Money Transfer Project

A RESTful API for managing transfers, deposits, transactions and has a webhooks for money transfer services. Built with JavaScript, Express, and Knex.js.

**Getting Started Locally:**

To run this API locally, please follow these steps from the main repository's `README.md` file:

1.  **Clone the repository:** `git clone https://github.com/timfemey/raven-money-transfer-project`
2.  **Navigate to the project directory:** `cd raven-money-transfer-project`
3.  **Install dependencies:** `npm install`
4.  **Fill in your Secret Variables in .env** `create a .env file and follow example.env structure to fill in your .env`
5.  **Start the server:** `npm start`

Once running, your API will likely be accessible at `http://localhost:PORT_NUMBER` (e.g., `http://localhost:5000` or `http://127.0.0.1:5000`). Please refer to your application's console output for the exact port.

### Environment Variables

Make sure to configure the following environment variables in your `.env` file:

```plaintext:README.md
DB_HOST=
DB_USER=root
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
RAVEN_API_KEY=YOUR_SECRET_RAVEN_API_KEY
WEBHOOK_URL=Your_Webhook_URL

```

## API Documentation

### User Management

- **POST /api/auth/signup**: Signup a new user.
- **POST /api/auth/login**: Log in a user.
- **GET /api/account**: Get Bank Account Number

### Send Money

- **POST /api/transfer/sendMoney**: Send Money from USer Account to another account.

### Transactions

- **GET /api/transactions/deposits**: Fetch all USer Deposits.
- **GET /api/transactions/transfers**: Fetch all Transfers.
- **POST /api/transactions/deposit**: Deposit Money
- **GET /api/transactions/history**: Get transaction history for user account.

### Webhook

- **POST /api/webhook**: Handle incoming deposit webhooks.
