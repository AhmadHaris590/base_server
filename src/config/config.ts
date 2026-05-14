import dns from 'dns'
import dotenvFlow from 'dotenv-flow'

// Force Node.js to use Google DNS (fixes c-ares SRV resolution issues on some networks)
dns.setServers(['8.8.8.8', '8.8.4.4'])

dotenvFlow.config()

export default {
    // General
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,

    // Database
    DATABASE_URL: process.env.DATABASE_URL,

    //Email
    EMAIL_API_KEY: process.env.EMAIL_SERVICE_API_KEY,

    //Tokens
    TOKENS: {
        ACCESS: {
            SECRET: process.env.ACCESS_TOKEN_SECRET as string,
            EXPIRY: 3600
        },
        REFRESH: {
            SECRET: process.env.REFRESH_TOKEN_SECRET as string,
            EXPIRY: 3600 * 24 * 365
        }
    }
}
