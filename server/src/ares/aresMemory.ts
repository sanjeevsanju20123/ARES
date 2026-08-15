import { ARESContext, ARESState, ConversationMessage } from './types'

class ARESMemory {
  private conversationHistory: ConversationMessage[] = []
  private workingMemory: Record<string, unknown> = {}
  private userPreferences: Record<string, unknown> = {
    preferredName: 'User',
    voiceEnabled: true,
    language: 'en',
  }
  private actionHistory: Array<{
    id: string
    action: string
    timestamp: Date
    status: 'completed' | 'abandoned' | 'expired'
  }> = []

  addMessage(message: ConversationMessage): void {
    this.conversationHistory.push(message)
    // Keep last 50 messages in memory (replaceable with DB later)
    if (this.conversationHistory.length > 50) {
      this.conversationHistory = this.conversationHistory.slice(-50)
    }
  }

  getConversationHistory(): ConversationMessage[] {
    return this.conversationHistory
  }

  setWorkingMemory(key: string, value: unknown): void {
    this.workingMemory[key] = value
  }

  getWorkingMemory(key: string): unknown {
    return this.workingMemory[key]
  }

  clearWorkingMemory(): void {
    this.workingMemory = {}
  }

  getPreference(key: string): unknown {
    return this.userPreferences[key]
  }

  setPreference(key: string, value: unknown): void {
    this.userPreferences[key] = value
  }

  recordAction(id: string, action: string): void {
    this.actionHistory.push({
      id,
      action,
      timestamp: new Date(),
      status: 'completed',
    })
  }

  getLastNMessages(n: number): ConversationMessage[] {
    return this.conversationHistory.slice(-n)
  }

  clear(): void {
    this.conversationHistory = []
    this.workingMemory = {}
  }
}

export default ARESMemory
