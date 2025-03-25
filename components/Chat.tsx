"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff, Send } from "lucide-react"
import { useTheme } from "next-themes"

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
  const { theme } = useTheme()
  const [inputText, setInputText] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputText.trim()) {
      onSendMessage(inputText)
      setInputText("")
    }
  }

  // Theme-based styles
  const themeStyles = {
    light: {
      background: "bg-white/80 backdrop-blur-md",
      border: "border-gray-200",
      messageUser: "bg-blue-600 text-white",
      messageBot: "bg-gray-100 text-gray-800",
      inputBackground: "bg-gray-50",
      inputBorder: "border-gray-300",
      promptCard: "bg-white/90 hover:bg-white",
      promptText: "text-gray-700"
    },
    dark: {
      background: "bg-gray-800/80 backdrop-blur-md",
      border: "border-gray-700",
      messageUser: "bg-blue-600 text-white",
      messageBot: "bg-gray-700 text-gray-100",
      inputBackground: "bg-gray-700",
      inputBorder: "border-gray-600",
      promptCard: "bg-gray-700/90 hover:bg-gray-700",
      promptText: "text-gray-200"
    }
  }

  const currentTheme = themeStyles[theme as keyof typeof themeStyles] || themeStyles.dark

  return (
    <div className={`flex flex-col h-full p-4 rounded-xl ${currentTheme.background} ${currentTheme.border} border shadow-lg`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h2 className={`text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent`}>
          AI Assistant
        </h2>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mt-1 text-sm`}>
          Ask me anything or use the mic
        </p>
      </motion.div>

      <div 
        ref={chatContainerRef} 
        className={`flex-1 overflow-y-auto mb-4 space-y-4 p-2 rounded-lg ${theme === 'dark' ? 'bg-gray-900/30' : 'bg-gray-100/50'}`}
      >
        <AnimatePresence>
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 gap-3 p-2"
            >
              {demoPrompts.map((prompt, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-3 rounded-lg ${currentTheme.promptCard} border ${currentTheme.border} cursor-pointer transition-colors`}
                  onClick={() => onSendMessage(prompt)}
                >
                  <p className={`text-sm ${currentTheme.promptText}`}>{prompt}</p>
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
                      ? `${currentTheme.messageUser} rounded-br-none`
                      : `${currentTheme.messageBot} rounded-bl-none`
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl p-2 ${currentTheme.inputBackground} ${currentTheme.inputBorder} border`}
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
              <p className="px-8 flex gap-3 items-center rounded-xl justify-between"><MicOff className="text-red-400" size={20} />Click to turn off the MIC</p>
            ) : (
              <p className="px-8 flex gap-3 items-center rounded-xl justify-between"><Mic className="text-green-400" size={20} />Click here to speak</p>
            )}
          </motion.button>

          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isListening ? "Listening..." : "Type your message..."}
            className={`flex-1 bg-transparent border-none outline-none ${theme === 'dark' ? 'text-white placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'}`}
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