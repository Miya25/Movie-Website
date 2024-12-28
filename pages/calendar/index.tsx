'use client'

import { useState, useEffect } from 'react'
import { ShowCard } from '../../components/layout/cards/ShowCard'
import Image from 'next/image'

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function CalendarPage() {
  const [selectedDay, setSelectedDay] = useState(daysOfWeek[0])
  
  interface Show {
    id: number;
    title: string;
    image: string;
    episode: number;
    time: string;
    description: string;
  }
  
  interface Schedule {
    day: string;
    shows: Show[];
  }
  
  const [showSchedule, setShowSchedule] = useState<Schedule[]>([])

  useEffect(() => {
    async function fetchShowSchedule() {
      try {
        const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`)
        const data = await response.json()

        const processedData = daysOfWeek.map((day, index) => ({
          day,
          shows: data.results.slice(index * 3, index * 3 + 3).map((show: { id: number; name: string; poster_path: string; vote_count: number; overview: string }) => ({
            id: show.id,
            title: show.name,
            image: `${IMAGE_BASE_URL}${show.poster_path}`,
            episode: show.vote_count,
            time: 'TBD',
            description: show.overview,
          }))
        }))

        setShowSchedule(processedData)
      } catch (error) {
        console.error('Failed to fetch show schedule:', error)
      }
    }

    fetchShowSchedule()
  }, [])

  return (
    <div className="min-h-screen bg-black p-8 pl-24">
      <h1 className="mb-8 text-3xl font-bold text-white">Shows Calendar</h1>

      <div className="mb-8 flex space-x-4">
        {daysOfWeek.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`rounded-lg px-4 py-2 ${
              selectedDay === day ? 'bg-purple-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {showSchedule
          .find((schedule) => schedule.day === selectedDay)
          ?.shows.map((show) => (
            <ShowCard
              key={show.id}
              title={show.title}
              image={show.image}
              href={`/show/${show.title}`}
            />
          ))}
      </div>
    </div>
  )
}
