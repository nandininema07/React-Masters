"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "We are here to help, please let us know what we can assist you with.",
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

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      content: input,
      sender: "user",
    }
    setMessages([...messages, userMessage])
    setInput("")

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        content:
          "Thank you for your message. A customer service representative will get back to you shortly. In the meantime, can I help you with anything else?",
        sender: "bot",
      }
      setMessages((prevMessages) => [...prevMessages, botMessage])
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
                  <AvatarFallback>RH</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">RoboHelp Assistant</h3>
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
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user" ? "bg-primary text-white" : "bg-gray-100 dark:bg-gray-700"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendMessage} className="border-t dark:border-gray-700 p-4 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
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

