# ARES — Personal AI Assistant

ARES is a standalone personal AI assistant system designed to eventually become the central intelligence layer connecting to LifeOS-AI V2.

## Vision

ARES should feel like a capable personal AI assistant inspired by the concept and capabilities of systems like JARVIS, FRIDAY, EDITH, and KAREN. However, ARES is a real, modular, and secure system—not an attempt to reproduce fictional technology.

### Core Capabilities (Roadmap)

- Conversation & Reasoning
- Memory Management
- Tool Use & Planning
- Voice Interaction (TTS/STT)
- Personalization
- Secure Action Execution
- Future: LifeOS-AI V2 Integration

## Current Phase: Phase 1 — Standalone Foundation

Phase 1 establishes the core ARES system with:

- **ARES UI**: Polished conversation interface with visual identity
- **ARES Brain**: Mock orchestration engine (real AI provider to be connected later)
- **Conversation Engine**: Text and voice conversation with context
- **Memory System**: Short-term and working memory abstraction
- **Voice Architecture**: Speech input/output abstraction (local + cloud-ready)
- **Tool Registry**: Foundation for future tool integration
- **Permission System**: Architecture for action authorization
- **Security**: Server-side secrets, CORS, input validation

### What ARES Can Do in Phase 1

- Receive text or voice input
- Process requests with mock responses
- Display thinking/processing states
- Speak responses using local TTS
- Maintain conversation history
- Show system status

### What ARES Does NOT Do Yet

- Connect to external AI providers
- Integrate with LifeOS-AI V2
- Access email, calendar, or file systems
- Perform financial transactions
- Execute external automation

## Getting Started

### Prerequisites

- Node.js 18+ with npm
- macOS, Linux, or Windows

### Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start development server (frontend + backend)
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend API will be available at `http://localhost:3000`

### Development

```bash
# Frontend only (Vite dev server)
npm run dev:frontend

# Backend only (with auto-reload)
npm run dev:backend

# Type checking
npm run type-check

# Build for production
npm run build
```

## Architecture Overview

```
ARES
│
├─ UI Layer (React + Vite)
│  └─ Conversation Interface, Voice Controls, Status Display
│
├─ ARES Brain (Backend Orchestration)
│  ├─ Conversation Engine
│  ├─ Context Management
│  ├─ Memory System
│  ├─ Tool Registry
│  └─ Permission Engine
│
├─ AI Provider Interface
│  └─ (Mock provider in Phase 1, real providers Phase 5)
│
├─ Voice System
│  ├─ Speech Recognition (Browser API + abstraction)
│  ├─ Text-to-Speech Provider Interface
│  │  ├─ Local Provider (Piper - future)
│  │  └─ Cloud Provider (ElevenLabs - future, server-side only)
│  └─ Audio Playback
│
└─ API Layer (Express)
   ├─ Conversation Endpoints
   ├─ Voice Endpoints
   ├─ Tool Endpoints
   └─ Health Checks
```

## Project Structure

```
ARES/
├── src/                          # Frontend (React + Vite)
│   ├── components/ares/          # ARES UI components
│   ├── services/                 # API clients & state
│   ├── hooks/                    # React hooks
│   ├── App.tsx
│   └── main.tsx
│
├── server/src/                   # Backend (Express)
│   ├── routes/                   # API route handlers
│   ├── ares/                     # ARES Brain
│   ├── ai/                       # AI Provider interface
│   ├── voice/                    # Voice service
│   ├── tools/                    # Tool registry
│   ├── permissions/              # Permission system
│   ├── security/                 # Security utilities
│   └── index.ts
│
├── .env.example                  # Environment template
├── package.json
└── README.md
```

## Next Steps

After Phase 1 is validated, the roadmap includes:

- **Phase 2**: Memory expansion and persistence
- **Phase 3**: Advanced reasoning and planning
- **Phase 4**: Extended tool library
- **Phase 5**: Real AI provider integration
- **Phase 6**: Full voice support with multiple providers
- **Phase 7**: Agentic behavior and autonomy
- **Phase 8**: External service integrations
- **Phase 9**: LifeOS-AI V2 connector

## Important Notes

- ARES is a **standalone system**. LifeOS-AI V2 integration is planned for a later phase.
- All API keys and secrets are **server-side only**. The frontend never has access to credentials.
- The architecture is designed to be **provider-agnostic**. Different AI and voice providers can be swapped later.
- Security is built in from the start, not added as an afterthought.

## Development Status

**Phase 1**: In Development ⚙️

This is an early-stage project. Expect breaking changes as the architecture stabilizes.

---

**Built by:** Your Name
**Repository:** https://github.com/sanjeevsanju20123/ARES
**License:** Unlicensed (for now)
