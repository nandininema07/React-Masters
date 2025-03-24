"use client"

import { useState, useEffect, useCallback } from "react"

interface SpeechHook {
  isListening: boolean
  toggleListening: () => void
  transcript: string
  speak: (text: string, onEnd?: () => void) => void
  stopSpeaking: () => void
}

declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
    SpeechSynthesis: any
    webkitSpeechSynthesis: any
  }
}

export function useSpeech(): SpeechHook {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null)
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if browser supports SpeechRecognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition()
        recognitionInstance.continuous = false
        recognitionInstance.interimResults = false
        recognitionInstance.lang = "en-US"

        recognitionInstance.onresult = (event) => {
          const result = event.results[0][0].transcript
          setTranscript(result)
        }

        recognitionInstance.onend = () => {
          setIsListening(false)
        }

        recognitionInstance.onerror = (event) => {
          console.error("Speech recognition error", event.error)
          setIsListening(false)
        }

        setRecognition(recognitionInstance)
      } else {
        console.warn("Speech Recognition not supported in this browser")
      }

      // Initialize speech synthesis
      if (window.speechSynthesis) {
        setSynthesis(window.speechSynthesis)
      } else {
        console.warn("Speech Synthesis not supported in this browser")
      }
    }

    // Cleanup
    return () => {
      if (recognition) {
        recognition.abort()
      }
      if (synthesis && utterance) {
        synthesis.cancel()
      }
    }
  }, [])

  // Toggle listening state
  const toggleListening = useCallback(() => {
    if (!recognition) return

    if (isListening) {
      recognition.stop()
      setIsListening(false)
    } else {
      setTranscript("")
      recognition.start()
      setIsListening(true)
    }
  }, [isListening, recognition])

  // Text-to-speech function
  const speak = useCallback(
    (text: string, onEnd?: () => void) => {
      if (!synthesis) return

      // Cancel any ongoing speech
      synthesis.cancel()

      // Create new utterance
      const newUtterance = new SpeechSynthesisUtterance(text)

      // Configure voice
      const voices = synthesis.getVoices()
      const preferredVoice =
        voices.find((voice) => voice.name.includes("Google") && voice.name.includes("Female")) || voices[0]

      if (preferredVoice) {
        newUtterance.voice = preferredVoice
      }

      // Set properties
      newUtterance.rate = 1.0
      newUtterance.pitch = 1.0
      newUtterance.volume = 1.0

      // Set callback
      if (onEnd) {
        newUtterance.onend = onEnd
      }

      // Store utterance reference
      setUtterance(newUtterance)

      // Speak
      synthesis.speak(newUtterance)
    },
    [synthesis],
  )

  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if (synthesis) {
      synthesis.cancel()
    }
  }, [synthesis])

  return {
    isListening,
    toggleListening,
    transcript,
    speak,
    stopSpeaking,
  }
}

