import dotenv from 'dotenv'

dotenv.config()

export const config = {
  server: {
    port: parseInt(process.env.BACKEND_PORT || '3000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  frontend: {
    url: process.env.FRONTEND_URL || 'http://localhost:5173',
  },
  voice: {
    provider: process.env.VOICE_PROVIDER || 'local',
    elevenLabsVoiceId: process.env.ELEVENLABS_VOICE_ID || 'wDsJIOXPqcvIUKdLXjDs',
    elevenLabsApiKey: process.env.ELEVENLABS_API_KEY || '',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
}
