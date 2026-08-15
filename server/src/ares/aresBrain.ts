import { ARESContext, ARESState } from './types'
import ARESMemory from './aresMemory'
import ConversationEngine from './aresConversation'
import ToolRegistry from './aresTools'
import PermissionEngine from './aresPermissions'

class ARESBrain {
  private memory: ARESMemory
  private conversationEngine: ConversationEngine
  private toolRegistry: ToolRegistry
  private permissionEngine: PermissionEngine
  private context: ARESContext

  constructor() {
    this.memory = new ARESMemory()
    this.conversationEngine = new ConversationEngine()
    this.toolRegistry = new ToolRegistry()
    this.permissionEngine = new PermissionEngine()
    this.context = {
      currentState: ARESState.IDLE,
      lastUserInput: null,
      conversationHistory: [],
      workingMemory: {},
      pendingAction: null,
    }
  }

  getMemory(): ARESMemory {
    return this.memory
  }

  getConversationEngine(): ConversationEngine {
    return this.conversationEngine
  }

  getToolRegistry(): ToolRegistry {
    return this.toolRegistry
  }

  getPermissionEngine(): PermissionEngine {
    return this.permissionEngine
  }

  getContext(): ARESContext {
    return this.context
  }

  updateState(state: ARESState): void {
    this.context.currentState = state
    this.conversationEngine.setState(state)
  }

  getState(): ARESState {
    return this.context.currentState
  }

  setWorkingMemory(key: string, value: unknown): void {
    this.memory.setWorkingMemory(key, value)
    this.context.workingMemory[key] = value
  }

  getWorkingMemory(key: string): unknown {
    return this.memory.getWorkingMemory(key)
  }

  shutdown(): void {
    this.memory.clear()
    this.conversationEngine.clear()
    this.context.pendingAction = null
  }
}

let aresInstance: ARESBrain | null = null

export function getARESBrain(): ARESBrain {
  if (!aresInstance) {
    aresInstance = new ARESBrain()
  }
  return aresInstance
}

export default ARESBrain
