import Navbar from "@/components/navbar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import ChatBot from "@/components/chatbot"

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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Interactive Robot Simulation</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience how RoboHelp would work in your home with our interactive simulation. This demo showcases the key
            features and interactions.
          </p>
        </div>

        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-xl font-semibold">RoboHelp Simulation</h2>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>

          <ChatBot/>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-2">Voice Commands</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The full simulation will let you test voice commands and see how the robot responds to different requests.
            </p>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-2">Home Navigation</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Experience how the robot navigates through different rooms and avoids obstacles in a virtual home
              environment.
            </p>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-2">Smart Interactions</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Test the robot's ability to learn preferences and adapt to different user profiles and scenarios.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

