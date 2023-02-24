require('dotenv').config();

interface ApplicationConfig {
    baseUrl: string,
    streamingUrl: string
}

const config: ApplicationConfig = {
    baseUrl: process.env.BASE_URL ?? "localhost",
    streamingUrl: process.env.STREAMING_URL ?? "localhost",
} 

export default config;