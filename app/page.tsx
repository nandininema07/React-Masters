import Hero from "@/components/hero"
import Features from "@/components/features"
import Impact from "@/components/impact"
import Testimonials from "@/components/testimonials"
import FloatingChatbot from "@/components/FloatingChatbot"
import BackgroundGradient from "@/components/background-gradient"
import Footer from "@/components/footer"
import DualSplineViewer from "@/components/DualSplineViewer"

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      
      <BackgroundGradient />
      <Hero />
      <Features />
      <Impact />
      <DualSplineViewer/>
      <Testimonials />
      <FloatingChatbot />
      <Footer/>
    </main>
  )
}

