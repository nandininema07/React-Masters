import Navbar from "@/components/navbar"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Footer from "@/components/footer"

export default function ComparisonPage() {
  const models = [
    {
      name: "RoboHelp Basic",
      price: "$999",
      description: "Perfect for individuals and small families",
      features: {
        "Smart Home Integration": true,
        "Voice Recognition": true,
        "Auto-Docking": true,
        "Advanced AI Learning": false,
        "Multi-Room Navigation": false,
        "Facial Recognition": false,
        "Remote Control": true,
        "Scheduled Tasks": true,
        "Child Interaction Mode": true,
        "Elderly Care Features": false,
        "Security Monitoring": false,
        "Multi-User Profiles": false,
      },
    },
    {
      name: "RoboHelp Pro",
      price: "$1,499",
      description: "Ideal for families and tech enthusiasts",
      features: {
        "Smart Home Integration": true,
        "Voice Recognition": true,
        "Auto-Docking": true,
        "Advanced AI Learning": true,
        "Multi-Room Navigation": true,
        "Facial Recognition": true,
        "Remote Control": true,
        "Scheduled Tasks": true,
        "Child Interaction Mode": true,
        "Elderly Care Features": true,
        "Security Monitoring": false,
        "Multi-User Profiles": true,
      },
      highlighted: true,
    },
    {
      name: "RoboHelp Ultimate",
      price: "$1,999",
      description: "Complete solution for smart homes",
      features: {
        "Smart Home Integration": true,
        "Voice Recognition": true,
        "Auto-Docking": true,
        "Advanced AI Learning": true,
        "Multi-Room Navigation": true,
        "Facial Recognition": true,
        "Remote Control": true,
        "Scheduled Tasks": true,
        "Child Interaction Mode": true,
        "Elderly Care Features": true,
        "Security Monitoring": true,
        "Multi-User Profiles": true,
      },
    },
  ]

  return (
    <main className="min-h-screen bg-transparent pt-20">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Perfect RoboHelp</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Compare our models to find the one that best fits your needs and lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {models.map((model, index) => (
            <div
              key={index}
              className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl relative ${
                model.highlighted
                  ? "border-2 border-primary transform -translate-y-2"
                  : "border border-gray-200 dark:border-gray-700"
              } bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm`}
            >
              {model.highlighted && (
                <div className="absolute top-0 left-0 right-0 bg-primary text-white text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{model.name}</h2>
                <div className="text-3xl font-bold mb-2 text-primary">{model.price}</div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{model.description}</p>
                <Link href="#">
                  <Button
                    className={`w-full mb-6 ${
                      model.highlighted
                        ? "bg-primary hover:bg-primary/90"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    Buy Now
                  </Button>
                </Link>
                <div className="space-y-3">
                  {Object.entries(model.features).map(([feature, included], i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-1 border-b border-gray-100 dark:border-gray-700"
                    >
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      {included ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </main>
  )
}

