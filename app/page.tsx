import Hero from "@/components/hero"
import Features from "@/components/features"
import Impact from "@/components/impact"
import Testimonials from "@/components/testimonials"
import Chatbot from "@/components/chatbot"
import BackgroundGradient from "@/components/background-gradient"

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <BackgroundGradient />
      <Hero />
      <Features />
      <Impact />
      <Testimonials />
      <Chatbot />
    </main>
  )
}

