'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface ShowCardProps {
  title: string
  image: string
  episode?: number
  href: string
}

export function ShowCard({ title, image, episode, href }: ShowCardProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Link href={href} className="block">
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative overflow-hidden rounded-xl bg-gray-200 shadow-md transition-all hover:shadow-xl dark:bg-gray-800 ring-offset-black transition-all hover:ring-2 hover:ring-purple-600 hover:ring-offset-2"
      >
        <div className="aspect-[2/3] w-full">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="h-8 w-8 rounded-full border-4 border-t-purple-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          )}
          <Image
            src={image}
            alt={title}
            fill
            className={`object-cover transition-all duration-300 ${
              isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'
            }`}
            onLoadingComplete={() => setIsLoading(false)}
          />
        </div>
        
        {episode && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute right-2 top-2 rounded-full bg-purple-600 px-2 py-1 text-xs font-semibold text-white shadow-lg"
          >
            Episode {episode}
          </motion.div>
        )}
        
        <motion.div 
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-bold leading-tight text-white drop-shadow-md">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-300">
            Click to view details
          </p>
        </motion.div>
      </motion.div>
    </Link>
  )
}

