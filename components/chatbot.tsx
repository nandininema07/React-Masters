"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Avatar from "./Avatar"
import Chat from "./Chat"
import { useSpeech } from "./Speech"
import responses from "./responses.json"
import { useTheme } from "next-themes"

export default function ChatBot() {
  const [messages, setMessages] = useState<Array<{ text: string; sender: "user" | "bot" }>>([])
  const [expression, setExpression] = useState<string>("neutral")
  const [isSpeaking, setIsSpeaking] = useState(false)
  const { isListening, toggleListening, transcript, speak } = useSpeech()
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (transcript && !isListening) {
      handleUserMessage(transcript)
    }
  }, [transcript, isListening])

  const handleUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { text, sender: "user" }])

    let foundResponse = responses.unknown ?? { response: "I didn't understand that.", expression: "confused" }
    const lowerText = text.toLowerCase()

    for (const [key, data] of Object.entries(responses)) {
      if (Array.isArray(data.triggers) && data.triggers.some((trigger) => lowerText.includes(trigger))) {
        foundResponse = data
        break
      }
    }

    setTimeout(() => {
      const botResponse = foundResponse.response as string
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }])
      setExpression(foundResponse.expression as string)

      setIsSpeaking(true)
      speak(botResponse, () => {
        setIsSpeaking(false)
        setExpression("neutral")
      })
    }, 1000)
  }

  return (
    <div className={`h-screen w-full ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900' : 'bg-gradient-to-br from-gray-100 via-white to-gray-100'}`}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col md:flex-row h-full max-w-7xl mx-auto gap-4 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`w-full md:w-1/2 h-1/2 md:h-full rounded-3xl overflow-hidden border-2 ${theme === 'dark' ? 'border-white/10 bg-black/30' : 'border-gray-300 bg-white/50'} backdrop-blur-xl`}
        >
          <Avatar expression={expression} isSpeaking={isSpeaking} />
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="w-full md:w-1/2 h-1/2 md:h-full rounded-3xl overflow-hidden shadow-2xl"
        >
          <Chat
            messages={messages}
            onSendMessage={handleUserMessage}
            isListening={isListening}
            toggleListening={toggleListening}
            isSpeaking={isSpeaking}
            chatContainerRef={chatContainerRef}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
