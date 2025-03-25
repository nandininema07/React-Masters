'use client'

import Navbar from "@/components/navbar"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ChatBot from "@/components/chatbot"
import Footer from "@/components/footer"

export default function SimulationPage() {
  return (
    <main className="min-h-screen bg-transparent pt-20">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center mb-8 text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Interactive Simulation</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience our interactive tools and simulations.
          </p>
        </div>

        {/* Chatbot Section */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden mb-16">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold">RoboHelp AI Assistant</h2>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          <ChatBot/>
        </div>

        <Footer/>
      </div>
    </main>
  )
}