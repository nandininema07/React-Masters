'use client'

import { useState, useCallback } from 'react'
import Spline from '@splinetool/react-spline'
import { Application } from '@splinetool/runtime'

export default function DualRobotViewer() {
  const [colorLoaded, setColorLoaded] = useState(false)
  const [behaviorLoaded, setBehaviorLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [splineInstance, setSplineInstance] = useState<Application | null>(null)

  // Handle successful load
  const handleColorLoad = useCallback((spline: { application: Application }) => {
    setColorLoaded(true)
    spline.application.emitEvent('mouseDown', 'Play') // Start any default animation
  }, [])

  const handleBehaviorLoad = useCallback((spline: { application: Application }) => {
    setBehaviorLoaded(true)
    setSplineInstance(spline.application)
    spline.application.emitEvent('mouseDown', 'Idle') // Start idle animation
  }, [])

  // Handle errors
  const handleError = useCallback((err: Error) => {
    console.error('Spline loading error:', err)
    setError('Failed to load 3D models. Please refresh or check your connection.')
  }, [])

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full">
      {/* Error message */}
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md z-50">
          {error}
        </div>
      )}

      {/* Color Customization Robot */}
      <div className="flex-1 bg-white/90 dark:bg-black/70 border border-white/40 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Color Customizer</h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        
        <div className="h-[500px] w-full relative">
          <Spline
            scene="https://prod.spline.design/lFaMJwTl62RYoSxw/scene.splinecode"
            onLoad={handleColorLoad}
            onError={handleError}
            className="w-full h-full"
          />
          {!colorLoaded && !error && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-800/50">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                <p className="text-gray-500">Loading color bot...</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Customize your robot's appearance with different colors and materials
          </p>
        </div>
      </div>

      {/* Behavior Demonstration Robot */}
      <div className="flex-1 bg-white/90 dark:bg-black/70 border border-white/40 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Behavior Bot</h2>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        
        <div className="h-[500px] w-full relative">
          <Spline
            scene="https://prod.spline.design/aSi5IpqxQ4ULAyon/scene.splinecode"
            onLoad={handleBehaviorLoad}
            onError={handleError}
            className="w-full h-full"
          />
          {!behaviorLoaded && !error && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-800/50">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                <p className="text-gray-500">Loading behavior bot...</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Interact with the robot to see different behaviors and reactions
          </p>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => splineInstance?.emitEvent('mouseDown', 'Wave')}
              className="px-3 py-1 text-xs bg-green-100 dark:bg-green-900 rounded-full hover:scale-105 transition"
            >
              👋 Wave
            </button>
            <button 
              onClick={() => splineInstance?.emitEvent('mouseDown', 'Dance')}
              className="px-3 py-1 text-xs bg-purple-100 dark:bg-purple-900 rounded-full hover:scale-105 transition"
            >
              💃 Dance
            </button>
            <button 
              onClick={() => splineInstance?.emitEvent('mouseDown', 'Jump')}
              className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 rounded-full hover:scale-105 transition"
            >
              🦘 Jump
            </button>
            <button 
              onClick={() => splineInstance?.emitEvent('mouseDown', 'Idle')}
              className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full hover:scale-105 transition"
            >
              🧘 Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}