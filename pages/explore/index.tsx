'use client'

import { useEffect, useState } from 'react'
import { ShowCard } from '../../components/layout/cards/ShowCard'
import { FiFilter } from 'react-icons/fi'

const filters = [
  { name: 'Genres', options: ['Any', 'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Sci-Fi'] },
  { name: 'Sort by', options: ['Popularity', 'Latest', 'Oldest', 'Highest Rated'] },
  { name: 'Year', options: ['Any', '2024', '2023', '2022', '2021', '2020', '2019'] },
  { name: 'Season', options: ['Any', 'Winter', 'Spring', 'Summer', 'Fall'] },
  { name: 'Format', options: ['Any', 'TV', 'Movie', 'OVA', 'Special'] },
  { name: 'Status', options: ['Any', 'Finished', 'Ongoing', 'Upcoming'] },
]

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export default function CatalogPage() {
  const [showFilters, setShowFilters] = useState(false)
  const [showList, setShowList] = useState<{ id: number; title: string; name: string; poster_path: string }[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchShows() {
      try {
        const response = await fetch(
          `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=16`
        ) //the base genres fetched are 16 if u want more of em js edit the number
        const data = await response.json()
        setShowList(data.results || [])
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching show data:', error)
        setIsLoading(false)
      }
    }
  
    fetchShows()
  }, [])

  return (
    <div className="min-h-screen bg-black p-8 pl-24">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Catalog</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white hover:bg-white/20"
        >
          <FiFilter />
          Filters
        </button>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {filters.map((filter) => (
          <div key={filter.name} className={`${showFilters ? 'block' : 'hidden'}`}>
            <label className="mb-2 block text-sm font-medium text-white">{filter.name}</label>
            <select className="w-full rounded-lg bg-black p-2 text-white">
              {filter.options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {isLoading ? (
        <p className="text-white">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {showList.map((show) => (
            <ShowCard
              key={show.id}
              title={show.title || show.name}
              image={`${IMAGE_BASE_URL}${show.poster_path}`}
              href={`/show/${show.name}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
