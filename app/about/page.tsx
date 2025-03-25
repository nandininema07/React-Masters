import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Award, Clock, Heart, Shield } from "lucide-react"
import Mihir from '../../public/assets/Mihir.jpg'
import Kristina from '../../public/assets/Kristina.jpg'
import Nandini from '../../public/assets/Nandini.jpg'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-transparent pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About <span className="text-primary">RoboHelp</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
                We're on a mission to transform everyday living through intelligent robotics that understand, adapt, and
                enhance your home environment.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/comparison">
                  <Button className="bg-primary hover:bg-primary/90">
                    Explore Our Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#mission">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                <img
                  src="/assets/BLUEBOT.png"
                  alt="RoboHelp Robot"
                  className="w-3/4 h-3/4 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-16 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We believe in creating technology that enhances human connection rather than replacing it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enhancing Lives</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Creating technology that makes daily tasks easier and more enjoyable, giving you more time for what
                matters.
              </p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Building products with strong privacy protections and transparent data practices you can trust.
              </p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Design</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Crafting beautiful, intuitive products that seamlessly integrate into your home environment.
              </p>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-md">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Continuous Growth</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Constantly improving our technology through updates and learning from real-world usage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row text-2xl items-center">
            <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Founded in 2020, RoboHelp began with a simple idea: what if home robots could truly understand and
                anticipate human needs?
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our team of engineers, designers, and AI specialists came together to create a new kind of home
                assistant - one that combines advanced robotics with intuitive AI to create a truly helpful presence in
                your home.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Today, we're proud to have our robots in thousands of homes worldwide, helping families, elderly
                individuals, and busy professionals live better, more connected lives.
              </p>
             
            </div>
            <div className="w-full md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src="/assets/Mihir.jpg"
                    alt="Mihir"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src="/assets/Kristina.jpg"
                    alt="Kristina"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square bg-gray-100 col-span-2 h-80 items-center justify-center mx-auto dark:bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src="/assets/Nandini.jpg"
                    alt="Nandini"
                    className="w-full h-full object-cover"
                  />
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Home?</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers who have made RoboHelp an essential part of their daily lives.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/comparison">
              <Button className="bg-primary hover:bg-primary/90">Shop Now</Button>
            </Link>
            <Link href="/simulation">
              <Button variant="outline">Try a Demo</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

