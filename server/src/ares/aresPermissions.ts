import { PermissionLevel } from './types'

class PermissionEngine {
  private userPermissionLevel: PermissionLevel = PermissionLevel.LEVEL_1

  canExecuteTool(toolPermissionLevel: PermissionLevel): boolean {
    return this.userPermissionLevel >= toolPermissionLevel
  }

  requiresConfirmation(toolPermissionLevel: PermissionLevel): boolean {
    return toolPermissionLevel >= PermissionLevel.LEVEL_2
  }

  setPermissionLevel(level: PermissionLevel): void {
    this.userPermissionLevel = level
  }

  getPermissionLevel(): PermissionLevel {
    return this.userPermissionLevel
  }
}

export default PermissionEngine
