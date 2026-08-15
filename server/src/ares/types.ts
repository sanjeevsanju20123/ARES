export enum ARESState {
  IDLE = 'IDLE',
  LISTENING = 'LISTENING',
  THINKING = 'THINKING',
  PLANNING = 'PLANNING',
  USING_TOOL = 'USING_TOOL',
  WAITING_CONFIRMATION = 'WAITING_CONFIRMATION',
  RESPONDING = 'RESPONDING',
  ERROR = 'ERROR',
  OFFLINE = 'OFFLINE',
}

export interface ConversationMessage {
  id: string
  role: 'user' | 'ares'
  content: string
  timestamp: Date
  type: 'text' | 'voice'
}

export interface ARESContext {
  currentState: ARESState
  lastUserInput: string | null
  conversationHistory: ConversationMessage[]
  workingMemory: Record<string, unknown>
  pendingAction: null | {
    id: string
    action: string
    requiresConfirmation: boolean
  }
}

export interface ConversationRequest {
  message: string
  type: 'text' | 'voice'
}

export interface ConversationResponse {
  id: string
  message: string
  state: ARESState
  timestamp: Date
  canSpeak: boolean
}

export enum PermissionLevel {
  LEVEL_0 = 0, // Read-only
  LEVEL_1 = 1, // Low-risk personal actions
  LEVEL_2 = 2, // External communication
  LEVEL_3 = 3, // High-impact actions
}

export interface Tool {
  name: string
  description: string
  permissionLevel: PermissionLevel
  readOnly: boolean
  requiresConfirmation: boolean
  handler: (args: Record<string, unknown>) => Promise<unknown>
}

export interface VoiceConfig {
  provider: 'local' | 'cloud'
  elevenLabsVoiceId: string
}
