'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiX, FiFilter } from 'react-icons/fi'
import { ShowCard } from '../../components/layout/cards/ShowCard'

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

const filters = {
  type: ['All Types', 'TV', 'Movie', 'OVA', 'Special'],
  status: ['All Status', 'Ongoing', 'Completed', 'Upcoming'],
  season: ['All Seasons', 'Winter', 'Spring', 'Summer', 'Fall'],
  year: ['All Years', '2024', '2023', '2022', '2021', '2020'],
  genre: ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life'],
  sort: ['Popularity', 'Latest', 'Title A-Z', 'Title Z-A']
}

export default function SearchPage() {
  const [search, setSearch] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  interface Show {
    id: number;
    name: string;
    poster_path: string;
  }
  
  const [showData, setShowData] = useState<Show[]>([])
  const [selectedFilters, setSelectedFilters] = useState({
    type: 'All Types',
    status: 'All Status',
    season: 'All Seasons',
    year: 'All Years',
    sort: 'Popularity',
    genres: [] as string[]
  })

  const fetchShows = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=16&query=${search}`)
      const data = await response.json()
      setShowData(data.results || [])
    } catch (error) {
      console.error('Error fetching show data:', error)
      setShowData([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchShows()
  }, [search, selectedFilters])

  const toggleGenre = (genre: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }))
  }

  const clearFilters = () => {
    setSelectedFilters({
      type: 'All Types',
      status: 'All Status',
      season: 'All Seasons',
      year: 'All Years',
      sort: 'Popularity',
      genres: []
    })
  }

  return (
    <div className="min-h-screen bg-black p-8 pl-24">
      {/* Search Header */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search shows..."
            className="h-12 w-full rounded-lg bg-white/10 pl-12 pr-12 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
            >
              <FiX />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-colors ${
            showFilters 
              ? 'bg-purple-600 text-white hover:bg-purple-700' 
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <FiFilter />
          Filters
        </button>
      </div>

      {/* Filters Section */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="rounded-lg bg-white/5 p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-white/70 hover:text-white"
                >
                  Clear all
                </button>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Dropdown Filters */}
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/70">
                      Type
                    </label>
                    <select
                      value={selectedFilters.type}
                      onChange={(e) => setSelectedFilters(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full rounded-lg bg-white/10 p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      {filters.type.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/70">
                      Status
                    </label>
                    <select
                      value={selectedFilters.status}
                      onChange={(e) => setSelectedFilters(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full rounded-lg bg-white/10 p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      {filters.status.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/70">
                      Season
                    </label>
                    <select
                      value={selectedFilters.season}
                      onChange={(e) => setSelectedFilters(prev => ({ ...prev, season: e.target.value }))}
                      className="w-full rounded-lg bg-white/10 p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      {filters.season.map(season => (
                        <option key={season} value={season}>{season}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/70">
                      Year
                    </label>
                    <select
                      value={selectedFilters.year}
                      onChange={(e) => setSelectedFilters(prev => ({ ...prev, year: e.target.value }))}
                      className="w-full rounded-lg bg-white/10 p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      {filters.year.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/70">
                      Sort By
                    </label>
                    <select
                      value={selectedFilters.sort}
                      onChange={(e) => setSelectedFilters(prev => ({ ...prev, sort: e.target.value }))}
                      className="w-full rounded-lg bg-white/10 p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      {filters.sort.map(sort => (
                        <option key={sort} value={sort}>{sort}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Genre Tags */}
              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-white/70">
                  Genres
                </label>
                <div className="flex flex-wrap gap-2">
                  {filters.genre.map(genre => (
                    <button
                      key={genre}
                      onClick={() => toggleGenre(genre)}
                      className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                        selectedFilters.genres.includes(genre)
                          ? 'bg-purple-600 text-white'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Section */}
      {isLoading ? (
        <div>Loading...</div>
      ) : showData.length > 0 ? (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {showData.map((show, index) => (
            <ShowCard
              key={index}
              title={show.name}
              image={`${IMAGE_BASE_URL}${show.poster_path}`}
              href={`/show/${show.name}`}
            />
          ))}
        </div>
      ) : (
        <div>No results found</div>
      )}
    </div>
  )
}
