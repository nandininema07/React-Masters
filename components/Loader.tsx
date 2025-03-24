import React from 'react';
import { motion } from "framer-motion";

const FuturisticLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-black via-neutral-900 to-zinc-800">
      <motion.div
        className="relative flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Robotic Head */}
        <motion.div
          className="w-48 h-48 bg-neutral-800 rounded-2xl flex justify-center items-center 
                      border-2 border-opacity-20 border-gray-500 
                      shadow-2xl ring-1 ring-gray-700"
          animate={{ 
            rotate: [0, 3, -3, 0],
            translateY: [0, -5, 5, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5, 
            ease: "easeInOut" 
          }}
        >
          {/* Futuristic Eyes */}
          <div className="relative flex space-x-8">
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 
                          rounded-full flex items-center justify-center 
                          overflow-hidden shadow-lg"
              animate={{ 
                scale: [1, 0.7, 1],
                boxShadow: [
                  '0 0 0 0 rgba(0,255,255,0.3)',
                  '0 0 20px 5px rgba(0,255,255,0.6)',
                  '0 0 0 0 rgba(0,255,255,0.3)'
                ]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
                ease: "easeInOut" 
              }}
            >
              <div className="w-4 h-4 bg-white bg-opacity-30 rounded-full absolute"></div>
            </motion.div>
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 
                          rounded-full flex items-center justify-center 
                          overflow-hidden shadow-lg"
              animate={{ 
                scale: [1, 0.7, 1],
                boxShadow: [
                  '0 0 0 0 rgba(128,0,255,0.3)',
                  '0 0 20px 5px rgba(128,0,255,0.6)',
                  '0 0 0 0 rgba(128,0,255,0.3)'
                ]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <div className="w-4 h-4 bg-white bg-opacity-30 rounded-full absolute"></div>
            </motion.div>
          </div>
        </motion.div>

        {/* Precision Antennas */}
        <motion.div
          className="absolute top-[-40px] left-16 w-2 h-16 bg-gradient-to-b from-gray-700 to-gray-900 
                      rounded-full shadow-md"
          animate={{ 
            rotate: [0, 15, -15, 0],
            translateX: [-3, 3, -3]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.2, 
            ease: "easeInOut" 
          }}
        />
        <motion.div
          className="absolute top-[-40px] right-16 w-2 h-16 bg-gradient-to-b from-gray-700 to-gray-900 
                      rounded-full shadow-md"
          animate={{ 
            rotate: [0, -15, 15, 0],
            translateX: [3, -3, 3]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.2, 
            ease: "easeInOut" 
          }}
        />

        {/* Sleek Body */}
        <motion.div
          className="w-40 h-28 bg-neutral-800 mt-6 rounded-xl border-2 border-opacity-20 border-gray-600 
                      flex items-center justify-center shadow-xl ring-1 ring-gray-700"
          animate={{
            translateY: [0, 3, -3, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut"
          }}
        >
          {/* Precision Details */}
          <div className="flex space-x-4">
            <div className="w-6 h-10 bg-cyan-700 bg-opacity-50 rounded-sm"></div>
            <div className="w-6 h-10 bg-purple-800 bg-opacity-50 rounded-sm"></div>
          </div>
        </motion.div>

        {/* Futuristic Loading Text */}
        <motion.p
          className="mt-8 text-gray-300 text-2xl font-extralight tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.3, 1, 0.3],
            letterSpacing: ['0.2em', '0.25em', '0.2em']
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }}
        >
          Initializing
        </motion.p>
      </motion.div>
    </div>
  );
};

export default FuturisticLoader;