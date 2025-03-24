"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff, Send } from "lucide-react"

interface Message {
  text: string
  sender: "user" | "bot"
}

interface ChatProps {
  messages: Message[]
  onSendMessage: (text: string) => void
  isListening: boolean
  toggleListening: () => void
  isSpeaking: boolean
  chatContainerRef: React.RefObject<HTMLDivElement>
}

const demoPrompts = [
  "Tell me a joke!",
  "What can you do?",
  "How's the weather?",
  "Set a reminder",
  "Play some music",
  "What's the time?",
]

export default function Chat({
  messages,
  onSendMessage,
  isListening,
  toggleListening,
  isSpeaking,
  chatContainerRef,
}: ChatProps) {
  const [inputText, setInputText] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputText.trim()) {
      onSendMessage(inputText)
      setInputText("")
    }
  }

  return (
    <div className="flex flex-col h-full p-4 bg-black/30 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl">
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
          AI Assistant
        </h2>
        <p className="text-white/60 mt-1 text-sm">Ask me anything or use the mic</p>
      </motion.div>

      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto mb-4 space-y-4 p-2 rounded-xl bg-black/20"
      >
        <AnimatePresence>
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 gap-3 p-2"
            >
              {demoPrompts.map((prompt, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                  onClick={() => onSendMessage(prompt)}
                >
                  <p className="text-sm text-white/80">{prompt}</p>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-blue-400/20 border border-blue-400/30 text-blue-100"
                      : "bg-green-400/20 border border-green-400/30 text-green-100"
                  }`}
                >
                  <p>{message.text}</p>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 rounded-xl p-2 border border-white/10 backdrop-blur-lg"
      >
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={toggleListening}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-full ${
              isListening
                ? "bg-red-400/20 border border-red-400/30"
                : "bg-green-400/20 border border-green-400/30"
            }`}
            disabled={isSpeaking}
          >
            {isListening ? (
              <MicOff className="text-red-400" size={20} />
            ) : (
              <Mic className="text-green-400" size={20} />
            )}
          </motion.button>

          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isListening ? "Listening..." : "Type your message..."}
            className="flex-1 bg-transparent border-none outline-none text-white/90 placeholder-white/30"
            disabled={isListening || isSpeaking}
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-blue-400/20 border border-blue-400/30 disabled:opacity-40 disabled:pointer-events-none"
            disabled={!inputText.trim() || isListening || isSpeaking}
          >
            <Send className="text-blue-400" size={20} />
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}