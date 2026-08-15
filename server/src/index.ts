import app from './app'
import { config } from './config'

const PORT = config.server.port

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║                                        ║
║  ARES Backend Server Starting          ║
║  Listening on port ${PORT}              ║
║  Environment: ${config.server.nodeEnv}         ║
║  Voice Provider: ${config.voice.provider}      ║
║                                        ║
╚════════════════════════════════════════╝
  `)
  console.log(`API available at: http://localhost:${PORT}/api`)
  console.log(`Health check: http://localhost:${PORT}/api/health`)
})
