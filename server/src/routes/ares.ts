import express, { Request, Response, Router } from 'express'
import { getARESBrain } from '../ares/aresBrain'
import { ConversationRequest } from '../ares/types'

const router = Router()
const brain = getARESBrain()

// Get ARES status
router.get('/status', (req: Request, res: Response) => {
  const state = brain.getState()
  const conversationHistory = brain.getConversationEngine().getHistory()

  res.json({
    state,
    uptime: process.uptime(),
    conversationMessageCount: conversationHistory.length,
    timestamp: new Date(),
  })
})

// Get conversation history
router.get('/conversation', (req: Request, res: Response) => {
  const history = brain.getConversationEngine().getHistory()
  res.json({
    messages: history,
    count: history.length,
  })
})

// Send message to ARES
router.post('/conversation', async (req: Request, res: Response) => {
  try {
    const { message, type = 'text' } = req.body as ConversationRequest & { type?: string }

    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    const conversationEngine = brain.getConversationEngine()
    const response = await conversationEngine.processMessage({
      message,
      type: (type as 'text' | 'voice') || 'text',
    })

    // Add to memory
    const history = conversationEngine.getHistory()
    if (history.length > 0) {
      brain.getMemory().addMessage(history[history.length - 2]) // User message
      brain.getMemory().addMessage(history[history.length - 1]) // ARES response
    }

    res.json({
      success: true,
      response,
      state: brain.getState(),
    })
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

// Get context
router.get('/context', (req: Request, res: Response) => {
  const context = brain.getContext()
  res.json({
    state: context.currentState,
    lastUserInput: context.lastUserInput,
    workingMemory: context.workingMemory,
  })
})

// Clear conversation
router.post('/clear', (req: Request, res: Response) => {
  brain.getConversationEngine().clear()
  brain.getMemory().clear()
  res.json({ success: true, message: 'Conversation cleared' })
})

export default router
