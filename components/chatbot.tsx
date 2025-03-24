"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Avatar from "./Avatar"
import Chat from "./Chat"
import { useSpeech } from "./Speech"
import responses from "./responses.json"
import { useSafeDOM } from "./useSafeDOM"

export default function ChatBot() {
  const [messages, setMessages] = useState<Array<{ text: string; sender: "user" | "bot" }>>([])
  const [expression, setExpression] = useState<string>("neutral")
  const [isSpeaking, setIsSpeaking] = useState(false)
  const { isListening, toggleListening, transcript, speak } = useSpeech()
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const isMounted = useSafeDOM()

  useEffect(() => {
    if (isMounted && chatContainerRef.current) {
      try {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
      } catch (error) {
        console.error("Scroll error:", error)
      }
    }
  }, [messages, isMounted])

  useEffect(() => {
    if (transcript && !isListening) {
      handleUserMessage(transcript)
    }
  }, [transcript, isListening])

  const handleUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { text, sender: "user" }])

    let foundResponse = responses.unknown
    const lowerText = text.toLowerCase()

    for (const [key, data] of Object.entries(responses)) {
      if ((data.triggers as string[]).some((trigger) => lowerText.includes(trigger))) {
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

  if (!isMounted) return null

  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <motion.div
        initial={false}
        animate={{ opacity: 1 }}
        className="flex flex-col md:flex-row h-full max-w-7xl mx-auto gap-4 p-4"
      >
        <motion.div
          initial={false}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full md:w-1/2 h-1/2 md:h-full rounded-3xl overflow-hidden border-2 border-white/10 bg-black/30 backdrop-blur-xl"
        >
          <Avatar expression={expression} isSpeaking={isSpeaking} />
        </motion.div>

        <motion.div
          initial={false}
          animate={{ x: 0, opacity: 1 }}
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