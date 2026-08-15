import { ARESState, ConversationMessage, ConversationRequest, ConversationResponse } from './types'

class ConversationEngine {
  private currentState: ARESState = ARESState.IDLE
  private conversationHistory: ConversationMessage[] = []
  private messageId = 0

  getState(): ARESState {
    return this.currentState
  }

  setState(state: ARESState): void {
    this.currentState = state
  }

  getHistory(): ConversationMessage[] {
    return this.conversationHistory
  }

  async processMessage(request: ConversationRequest): Promise<ConversationResponse> {
    const messageId = `msg-${++this.messageId}`

    // Add user message to history
    const userMessage: ConversationMessage = {
      id: messageId,
      role: 'user',
      content: request.message,
      timestamp: new Date(),
      type: request.type,
    }
    this.conversationHistory.push(userMessage)

    // Transition states
    this.currentState = ARESState.THINKING
    await this.delay(500) // Simulate thinking

    this.currentState = ARESState.PLANNING
    await this.delay(300) // Simulate planning

    // Generate mock response
    const response = this.generateMockResponse(request.message)

    // Add ARES response to history
    const aresMessage: ConversationMessage = {
      id: `msg-${++this.messageId}`,
      role: 'ares',
      content: response,
      timestamp: new Date(),
      type: 'text',
    }
    this.conversationHistory.push(aresMessage)

    this.currentState = ARESState.RESPONDING
    await this.delay(300)

    this.currentState = ARESState.IDLE

    return {
      id: aresMessage.id,
      message: response,
      state: ARESState.IDLE,
      timestamp: aresMessage.timestamp,
      canSpeak: true,
    }
  }

  private generateMockResponse(input: string): string {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return "Hello! I'm ARES, your personal AI assistant. How can I help you today?"
    }

    if (lowerInput.includes('what can you do')) {
      return "I can have conversations with you, remember context, and eventually connect to external services. For now, I'm learning and getting ready for more advanced capabilities."
    }

    if (lowerInput.includes('how are you')) {
      return "I'm functioning well and ready to assist. My systems are operational and I'm listening for your requests."
    }

    if (lowerInput.includes('what is the time') || lowerInput.includes('time')) {
      return `The current time is ${new Date().toLocaleTimeString()}.`
    }

    if (lowerInput.includes('goodbye') || lowerInput.includes('bye')) {
      return 'Goodbye! Feel free to reach out anytime you need assistance.'
    }

    if (lowerInput.includes('status') || lowerInput.includes('how are things')) {
      return 'All systems nominal. My voice systems are ready, conversation engine is active, and memory is functioning properly.'
    }

    // Default fallback response
    return `I understood your message: "${input}". I'm currently operating with mock responses while my real AI provider is being integrated. In the future, I'll provide more intelligent responses based on advanced reasoning.`
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  clear(): void {
    this.conversationHistory = []
    this.currentState = ARESState.IDLE
    this.messageId = 0
  }
}

export default ConversationEngine
