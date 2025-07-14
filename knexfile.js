import "dotenv/config"

export default { client: "mysql2", connection: { port:process.env.DB_PORT, host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME } }

