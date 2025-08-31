"use client"

import { useEffect, useRef, useState } from "react"
import { addRide } from "@/lib/local-db"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

type Msg = { role: "user" | "assistant"; text: string }

export function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      text: 'Hi! I can book your ride. For example: "Book a ride to Delhi Airport tomorrow at 3 PM".',
    },
  ])
  const router = useRouter()
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
  }, [msgs, open])

  function parseAndBook(text: string) {
    // naive parse: to <drop> tomorrow at <time>
    const lower = text.toLowerCase()
    const toMatch = /to ([a-zA-Z0-9\s]+) tomorrow at ([0-9]{1,2}(:[0-9]{2})?\s?(am|pm)?)/i.exec(text)
    const timeMatch = /at ([0-9]{1,2}(:[0-9]{2})?\s?(am|pm)?)/i.exec(text)
    const drop = toMatch?.[1]?.trim() || (lower.includes("airport") ? "Delhi Airport" : "Connaught Place")
    let time = "15:00"
    if (timeMatch?.[1]) {
      const raw = timeMatch[1].toLowerCase().replace(/\s/g, "")
      const pm = raw.endsWith("pm")
      const parts = raw.replace(/(am|pm)/g, "").split(":")
      const hh = Number.parseInt(parts[0] || "0", 10)
      const mm = parts[1] || "00"
      const hh24 = pm ? (hh % 12) + 12 : hh % 12
      time = `${String(hh24).padStart(2, "0")}:${mm}`
    }
    const d = new Date()
    d.setDate(d.getDate() + 1)
    const dateISO = d.toISOString().slice(0, 10)
    addRide({
      pickup: "Connaught Place",
      drop,
      dateISO,
      time,
      vehicle: "Sedan",
      clientName: "Chat User",
      status: "incoming",
      price: 1200,
    })
    setMsgs((m) => [
      ...m,
      { role: "assistant", text: `Booked request to ${drop} on ${dateISO} at ${time}. Routing to Admin.` },
    ])
    setTimeout(() => router.push("/admin"), 800)
  }

  function send() {
    const text = input.trim()
    if (!text) return
    setMsgs((m) => [...m, { role: "user", text }])
    setInput("")
    if (/book/i.test(text)) {
      parseAndBook(text)
    } else {
      setMsgs((m) => [
        ...m,
        { role: "assistant", text: 'Please include "book" and details like destination and time.' },
      ])
    }
  }

  return (
    <>
      <button
        aria-label="Chatbot"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-primary text-primary-foreground p-4 shadow-lg hover:opacity-90"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 rounded-xl border border-border bg-card shadow-xl">
          <div className="flex items-center justify-between p-3 border-b border-border">
            <div className="font-heading">ChaufX Assistant</div>
            <button aria-label="Close" onClick={() => setOpen(false)}>
              <X className="h-4 w-4 text-foreground/70" />
            </button>
          </div>
          <div ref={listRef} className="max-h-80 overflow-y-auto p-3 space-y-2">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`text-sm ${m.role === "assistant" ? "text-foreground" : "text-foreground/80 text-right"}`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 p-3 border-t border-border">
            <Input
              placeholder='Try: "Book a ride to Delhi Airport tomorrow at 3 PM"'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
            />
            <Button onClick={send} className="bg-primary text-primary-foreground">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
