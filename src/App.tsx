import { useEffect, useState } from 'react'

interface Message {
  id: string
  role: 'user' | 'ares'
  text: string
}

const API_URL = 'http://localhost:3000/api/ares'

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', role: 'ares', text: 'Good evening. I am ARES. How can I help?' },
  ])
  const [input, setInput] = useState('')
  const [status, setStatus] = useState('OFFLINE')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    fetch(`${API_URL}/status`)
      .then((response) => {
        if (!response.ok) throw new Error('Backend unavailable')
        return response.json()
      })
      .then(() => setStatus('IDLE'))
      .catch(() => setStatus('OFFLINE'))
  }, [])

  async function sendMessage() {
    const message = input.trim()
    if (!message || busy) return

    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: 'user', text: message },
    ])
    setInput('')
    setBusy(true)
    setStatus('THINKING')

    try {
      const response = await fetch(`${API_URL}/conversation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, type: 'text' }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'ARES request failed')

      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), role: 'ares', text: data.response?.text ?? String(data.response ?? 'ARES responded.') },
      ])
      setStatus('IDLE')
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: 'ares',
          text: error instanceof Error ? error.message : 'Unable to reach ARES.',
        },
      ])
      setStatus('ERROR')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="ares-shell">
      <section className="ares-card">
        <header className="ares-header">
          <div>
            <div className="eyebrow">PERSONAL AI SYSTEM</div>
            <h1>ARES</h1>
          </div>
          <div className={`status status-${status.toLowerCase()}`}>
            <span className="status-dot" /> {status}
          </div>
        </header>

        <div className="ares-core">
          <div className="ares-orb"><span>ARES</span></div>
          <p>{busy ? 'Processing your request…' : 'Ready when you are.'}</p>
        </div>

        <div className="conversation" aria-live="polite">
          {messages.map((message) => (
            <article key={message.id} className={`message ${message.role}`}>
              <span className="message-label">{message.role === 'user' ? 'YOU' : 'ARES'}</span>
              <p>{message.text}</p>
            </article>
          ))}
        </div>

        <div className="input-row">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') void sendMessage()
            }}
            placeholder="Speak or type a command…"
            aria-label="Message ARES"
          />
          <button onClick={() => void sendMessage()} disabled={busy || !input.trim()}>
            {busy ? '…' : 'SEND'}
          </button>
        </div>

        <footer>STANDALONE ARES · PHASE 1</footer>
      </section>
    </main>
  )
}

export default App
