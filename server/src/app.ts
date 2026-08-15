import express, { Express } from 'express'
import cors from 'cors'
import { config } from './config'
import healthRoutes from './routes/health'
import aresRoutes from './routes/ares'
import voiceRoutes from './routes/voice'

const app: Express = express()

// Middleware
app.use(cors({ origin: config.frontend.url }))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

// Routes
app.use('/api', healthRoutes)
app.use('/api/ares', aresRoutes)
app.use('/api/voice', voiceRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    path: req.path,
    method: req.method,
  })
})

// Error handler
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error('Error:', err.message)
    res.status(500).json({
      error: 'Internal server error',
      message: config.server.nodeEnv === 'development' ? err.message : 'Unknown error',
    })
  }
)

export default app
