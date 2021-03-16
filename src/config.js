require('dotenv').config();

export default {
    serverPort: process.env.SERVER_PORT,
    nodeEnv: process.env.NODE_ENV,
    db: {
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
    jwt: {
        secretKey: process.env.JWT_SECRET_KEY,
    }
};
