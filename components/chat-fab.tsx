"use client"

import { useEffect, useState } from "react"

export default function ChatFab() {
  const [open, setOpen] = useState(false)

  // Close on Escape for accessibility
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <>
      {/* Button: bottom-right FAB, black background as in snippet */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle chat"
        aria-expanded={open}
        aria-controls="chatFrame"
        className="fixed bottom-5 right-5 z-50 rounded-full border-0 bg-[#111] px-4 py-3 text-white shadow-lg transition hover:bg-black"
      >
        {"💬 Chat"}
      </button>

      {/* Frame: 400x600, 2px light border (#ddd) with rounded 12px, mirrors snippet */}
      <div
        id="chatFrame"
        className={`fixed bottom-[70px] right-5 z-[1000] overflow-hidden rounded-xl border-2 border-[#ddd] bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 ${open ? "block" : "hidden"}`}
        style={{ width: 400, height: 600 }}
        role="dialog"
        aria-modal="false"
        aria-label="Chatbot"
      >
        <iframe
          title="ChaufX Chatbot"
          src="https://chatbot-4h6k47nwpla.streamlit.app/"
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      </div>
    </>
  )
}
