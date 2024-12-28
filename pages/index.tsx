import { SetStateAction, useEffect, useState } from 'react';
import { TrendingCarousel } from '../components/layout/cards/TrendingCard';
import { ShowCard } from '../components/layout/cards/ShowCard';
import { GenreCard } from '../components/layout/cards/GenreCard';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

interface Show {
  id: number;
  name: string;
  poster_path: string | null;
  vote_average: number;
  genre_ids: number[];
}

interface Genre {
  id: number;
  name: string;
  imageUrl: string;
}

export default function Home() {
  const [shows, setShows] = useState<Show[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [filteredShows, setFilteredShows] = useState<Show[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [trendingShows, setTrendingShows] = useState<any[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`);
        const data = await response.json();
        const genreList = data.genres;
        
        const genresWithImages = await Promise.all(
          genreList.map(async (genre: Genre) => {
            const popularShowResponse = await fetch(
              `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_genres=${genre.id}&sort_by=popularity.desc`
            );
            const popularShowData = await popularShowResponse.json();
            const popularShow = popularShowData.results[0]; 
            
            return {
              ...genre,
              imageUrl: popularShow?.poster_path
                ? `${IMAGE_BASE_URL}${popularShow.poster_path}`
                : '/placeholder.svg',
            };
          })
        );

        setGenres(genresWithImages);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    const fetchTrendingShows = async () => {
      try {
        const response = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`);
        const data = await response.json();
        setTrendingShows(data.results);
        setFilteredShows(data.results);
      } catch (error) {
        console.error('Error fetching TV shows:', error);
      }
    };

    fetchGenres();
    fetchTrendingShows();
  }, []);

  const filterByGenre = (genreId: number | null) => {
    setSelectedGenre(genreId);
    if (genreId !== null) {
      const filtered = shows.filter((show) => show.genre_ids.includes(genreId));
      setFilteredShows(filtered);
    } else {
      setFilteredShows(shows);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <main className="pl-16">
        <TrendingCarousel trendingShows={trendingShows} />

        <div className="px-8 py-12">
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-white">Featured TV Shows</h2>
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {filteredShows.map((show) => (
                <ShowCard
                  key={show.id}
                  title={show.name}
                  image={show.poster_path ? `${IMAGE_BASE_URL}${show.poster_path}` : '/placeholder.svg'}
                  episode={show.vote_average} 
                  href={`/show/${show.name}`}
                />
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-white">Browse by Genre</h2>
            <div className="grid grid-cols-3 gap-4 md:grid-cols-5 lg:grid-cols-7">
              {genres.map((genre) => (
                <GenreCard
                  key={genre.id}
                  title={genre.name}
                  image={genre.imageUrl || '/placeholder.svg'}
                  href="#"
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
