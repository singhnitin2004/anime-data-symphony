
import { useEffect, useState } from "react";
import axios from "axios";
import { AnimeData, AnimeResponse } from "@/types/anime";
import { AnimeCard } from "./AnimeCard";

export const AnimeGrid = () => {
  const [animes, setAnimes] = useState<AnimeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const response = await axios.get<AnimeResponse>("https://api.jikan.moe/v4/anime");
        setAnimes(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load anime data. Please try again later.");
        setLoading(false);
      }
    };

    fetchAnimes();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#8B5CF6]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {animes.map((anime) => (
        <AnimeCard key={anime.mal_id} anime={anime} />
      ))}
    </div>
  );
};
