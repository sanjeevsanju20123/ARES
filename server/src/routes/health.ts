import express, { Request, Response, Router } from 'express'
import { config } from '../config'

const router = Router()

// Health check
router.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'ARES Backend',
    timestamp: new Date(),
    uptime: process.uptime(),
  })
})

// System status
router.get('/status', (req: Request, res: Response) => {
  res.json({
    status: 'operational',
    services: {
      conversation: 'ready',
      memory: 'ready',
      voice: config.voice.provider,
      tools: 'ready',
      permissions: 'ready',
    },
    config: {
      environment: config.server.nodeEnv,
      voiceProvider: config.voice.provider,
      timestamp: new Date(),
    },
  })
})

export default router
