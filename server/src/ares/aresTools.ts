import { Tool, PermissionLevel } from './types'

class ToolRegistry {
  private tools: Map<string, Tool> = new Map()

  register(tool: Tool): void {
    this.tools.set(tool.name, tool)
  }

  getTool(name: string): Tool | undefined {
    return this.tools.get(name)
  }

  getAllTools(): Tool[] {
    return Array.from(this.tools.values())
  }

  getToolsByPermissionLevel(level: PermissionLevel): Tool[] {
    return Array.from(this.tools.values()).filter((tool) => tool.permissionLevel <= level)
  }

  async executeTool(name: string, args: Record<string, unknown>): Promise<unknown> {
    const tool = this.getTool(name)
    if (!tool) {
      throw new Error(`Tool ${name} not found`)
    }
    return tool.handler(args)
  }
}

// Initialize with safe default tools
export function createToolRegistry(): ToolRegistry {
  const registry = new ToolRegistry()

  registry.register({
    name: 'getSystemStatus',
    description: 'Get ARES system status',
    permissionLevel: PermissionLevel.LEVEL_0,
    readOnly: true,
    requiresConfirmation: false,
    handler: async () => ({
      status: 'operational',
      uptime: process.uptime(),
      timestamp: new Date(),
    }),
  })

  registry.register({
    name: 'getCurrentTime',
    description: 'Get current time',
    permissionLevel: PermissionLevel.LEVEL_0,
    readOnly: true,
    requiresConfirmation: false,
    handler: async () => ({
      time: new Date().toISOString(),
    }),
  })

  registry.register({
    name: 'getARESState',
    description: 'Get current ARES state',
    permissionLevel: PermissionLevel.LEVEL_0,
    readOnly: true,
    requiresConfirmation: false,
    handler: async () => ({
      state: 'operational',
      capabilities: ['conversation', 'voice', 'memory', 'reasoning'],
    }),
  })

  return registry
}

export default ToolRegistry
