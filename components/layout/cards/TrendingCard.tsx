'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import Link from 'next/link'

interface TrendingShow {
  id: number
  name: string
  overview: string
  first_air_date: string
  number_of_episodes: number
  status: string
  backdrop_path: string
}

interface TrendingCarouselProps {
  trendingShows: TrendingShow[]
}

export function TrendingCarousel({ trendingShows }: TrendingCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying || trendingShows.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trendingShows.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, trendingShows])

  const handlePrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + trendingShows.length) % trendingShows.length)
  }

  const handleNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % trendingShows.length)
  }

  if (trendingShows.length === 0) {
    return <div className="text-white">Loading trending shows...</div>
  }

  const currentShow = trendingShows[currentIndex]

  return (
    <div className="relative h-[70vh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-full w-full"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${currentShow.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-8">
              <a>
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-pink-500 px-3 py-1 text-sm font-medium text-white">
                    #{currentIndex + 1} Trending
                  </span>
                </div>
                
                <h1 className="mb-4 text-4xl font-bold text-white">
                  {currentShow.name}
                </h1>
                
                <div className="mb-4 flex items-center gap-4 text-sm text-white/80">
                  <div className="flex items-center gap-1">
                    <span>{currentShow.status}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{new Date(currentShow.first_air_date).getFullYear()}</span>
                  </div>
                  <div>{currentShow.number_of_episodes} episodes</div>
                </div>
                
                <p className="mb-6 max-w-2xl text-sm text-white/80">
                  {currentShow.overview}
                </p>
              </a>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-purple-600"
      >
        <FiChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-purple-600"
      >
        <FiChevronRight className="h-6 w-6" />
      </button>
    </div>
  )
}
