"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Product-specific responses
const productResponses = {
  greetings: {
    response: "Hello! I'm your product assistant. Ask me about our models, prices, colors, or how to buy!",
    triggers: ["hello", "hi", "hey"]
  },
  models: {
    response: "We offer 3 models:\n1. Basic - $999 (Essential features)\n2. Pro - $1499 (Advanced features + warranty)\n3. Elite - $1999 (All features + premium support)",
    triggers: ["models", "model", "versions", "types", "options"]
  },
  prices: {
    response: "Our pricing:\n- Basic: $999\n- Pro: $1499\n- Elite: $1999\nAll prices are in USD. Financing options available.",
    triggers: ["price", "prices", "cost", "how much"]
  },
  colors: {
    response: "Available colors:\n- Midnight Black\n- Arctic White\n- Ocean Blue\n- Forest Green\n- Ruby Red\nColors may vary by model.",
    triggers: ["color", "colors", "available colors", "options"]
  },
  purchase: {
    response: "You can purchase:\n1. Online at our website\n2. In-store at authorized dealers\n3. By phone at 1-800-OUR-PRODUCT\nWould you like a link to our online store?",
    triggers: ["buy", "purchase", "order", "get", "where to buy"]
  },
  features: {
    response: "Key differences:\nBasic: Core functionality\nPro: Adds advanced tools + 2yr warranty\nElite: All features + 24/7 support + 3yr warranty",
    triggers: ["difference", "features", "compare", "what's included"]
  },
  unknown: {
    response: "I'm not sure about that. Would you like information about our models, prices, or how to purchase?",
    triggers: []
  }
}

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: productResponses.greetings.response,
      sender: "bot",
    },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen])

  const findResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase()
    for (const [key, data] of Object.entries(productResponses)) {
      if ((data.triggers as string[]).some(trigger => lowerInput.includes(trigger.toLowerCase()))) {
        return data.response
      }
    }
    return productResponses.unknown.response
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      content: input,
      sender: "user",
    }
    setMessages(prev => [...prev, userMessage])
    setInput("")

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = findResponse(input)
      const botMessage = {
        id: messages.length + 2,
        content: botResponse,
        sender: "bot",
      }
      setMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 bg-primary text-white rounded-full p-4 shadow-lg z-50 hover:bg-primary/90 transition-colors"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat"
      >
        <MessageSquare className="h-6 w-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 w-[90%] sm:w-96 max-w-md h-[500px] max-h-[80vh] bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-4 border-b dark:border-gray-700 bg-primary/5 flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
                  <AvatarFallback>PA</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">Product Assistant</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close chat">
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user" 
                        ? "bg-primary text-white" 
                        : "bg-gray-100 dark:bg-gray-700"
                    }`}
                  >
                    {message.content}
                  </motion.div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="border-t dark:border-gray-700 p-4 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our products..."
                className="flex-1"
              />
              <Button type="submit" size="icon" aria-label="Send message">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}