import { GetServerSideProps } from 'next'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FaPlayCircle, FaPlus, FaStar } from 'react-icons/fa'
import { ShowCard } from '../../components/layout/cards/ShowCard'
import { GenreCard } from '../../components/layout/cards/GenreCard'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const API_KEY = process.env.NEXT_PUBLIC_API_KEY
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL

async function searchShow(query: string) {
  const response = await fetch(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}&with_keywords=210024`
  )
  return response.json()
}

async function getShowDetails(id: number) {
  const [details, credits, similar] = await Promise.all([
    fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`).then(res => res.json()),
    fetch(`${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}`).then(res => res.json()),
    fetch(`${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}`).then(res => res.json())
  ])
  
  return { details, credits, similar }
}

type Tab = 'overview' | 'Similar' | 'characters' | 'Images'

interface ShowPageProps {
  data?: {
    details: any
    credits: any
    similar: any
  }
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const name = params?.name as string
    // First search for the show by name
    const searchResults = await searchShow(decodeURIComponent(name))
    
    if (!searchResults.results?.[0]) {
      return {
        notFound: true
      }
    }

    // Get detailed info using the first result's ID
    const showData = await getShowDetails(searchResults.results[0].id)
    
    return {
      props: {
        data: showData
      }
    }
  } catch (error) {
    return {
      notFound: true
    }
  }
}

export default function ShowPage({ data }: ShowPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [scrollPosition, setScrollPosition] = useState(0)

  const scrollLeft = () => {
    const newPosition = Math.max(scrollPosition - 300, 0)
    setScrollPosition(newPosition)
  }
  
  const scrollRight = () => {
    const newPosition = scrollPosition + 300
    setScrollPosition(newPosition)
  }

  if (!data) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>
  }

  const { details, credits, similar } = data

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'Images', label: 'Images' },
    { id: 'characters', label: 'Characters' },
    { id: 'Similar', label: 'Similar Shows' },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Banner */}
      <div className="relative h-[70vh] w-full">
        <Image
          src={`${IMAGE_BASE_URL}${details.backdrop_path}`}
          alt={details.name}
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 p-8 pl-24">
          <div className="mb-4 flex items-center gap-4">
            <Image
              src={`${IMAGE_BASE_URL}${details.poster_path}`}
              alt={details.name}
              width={200}
              height={300}
              className="rounded-lg"
            />
            <div>
              <h1 className="mb-2 text-4xl font-bold text-white">{details.name}</h1>
              <div className="mb-4 flex items-center gap-2">
                <span className="flex items-center gap-1 text-yellow-400">
                  <FaStar className="h-4 w-4" />
                  {details.vote_average.toFixed(1)}
                </span>
                <span className="text-white/70">|</span>
                <span className="text-white/70">{details.status}</span>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-700">
                  <FaPlayCircle className="h-5 w-5" />
                  Play Now
                </button>
                <button className="flex items-center gap-2 rounded-lg bg-white/10 px-6 py-3 font-medium text-white transition-colors hover:bg-white/20">
                  <FaPlus className="h-5 w-5" />
                  Add to List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pl-24">
        {/* Tabs */}
        <div className="mb-8 flex gap-8 border-b border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-4 text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'text-white' : 'text-white/50 hover:text-white/80'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-purple-600"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-[300px,1fr] gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-sm font-medium text-white/50">Type</h3>
                <p className="text-white">TV Series</p>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-medium text-white/50">Episodes</h3>
                <p className="text-white">{details.number_of_episodes}</p>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-medium text-white/50">Genres</h3>
                <div className="flex gap-4 overflow-x-auto whitespace-nowrap">
                  {details.genres.map((genre: any) => (
                    <GenreCard
                      key={genre.id}
                      title={genre.name}
                      image={genre.imageUrl || '/placeholder.svg'} 
                      href={`#`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-medium text-white/50">Status</h3>
                <p className="text-white">{details.status}</p>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-medium text-white/50">Studios</h3>
                <p className="text-white">
                  {details.production_companies.map((company: any) => company.name).join(', ')}
                </p>
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-xl font-bold text-white">Description</h2>
              <p className="text-white/80">{details.overview}</p>
            </div>
          </div>
        )}

        {activeTab === 'characters' && (
          <div className="mb-12">
            <div className="relative">
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full"
                onClick={scrollLeft}
              >
                <FaChevronLeft className="text-white" />
              </button>
              <div
                className="flex gap-4 overflow-x-auto pb-4"
                ref={(el) => {
                  if (el) el.scrollLeft = scrollPosition;
                }}
                style={{ scrollBehavior: 'smooth' }}
              >
                {credits.cast.map((character: any) => (
                  <div
                    key={character.id}
                    className="flex-shrink-0 rounded-lg bg-white/5 p-2"
                  >
                    {character.profile_path ? (
                      <Image
                        src={`${IMAGE_BASE_URL}${character.profile_path}`}
                        alt={character.name}
                        width={150}
                        height={225}
                        className="mb-2 rounded-lg"
                      />
                    ) : (
                      <div className="mb-2 h-[225px] w-[150px] rounded-lg bg-white/10" />
                    )}
                    <h3 className="text-sm font-medium text-white">{character.name}</h3>
                    <p className="text-sm text-white/50">{character.character}</p>
                  </div>
                ))}
              </div>
              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full"
                onClick={scrollRight}
              >
                <FaChevronRight className="text-white" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'Similar' && (
          <div className="mb-12">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {similar.results.slice(0, 10).map((show: any) => (
                <ShowCard
                  key={show.id}
                  title={show.name}
                  image={show.poster_path ? `${IMAGE_BASE_URL}${show.poster_path}` : '/placeholder.svg'}
                  episode={show.vote_average}
                  href={`/show/${encodeURIComponent(show.name)}`}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Images' && (
          <div className="mb-12">
            <h2 className="mb-6 text-xl font-bold text-white">Images</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {[details.backdrop_path, details.poster_path].map((image: string) => (
                image && (
                  <Image
                    key={image}
                    src={`${IMAGE_BASE_URL}${image}`}
                    alt="image"
                    width={300}
                    height={169}
                    className="rounded-lg"
                  />
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
