
import { AnimeData } from "@/types/anime";

interface AnimeCardProps {
  anime: AnimeData;
}

export const AnimeCard = ({ anime }: AnimeCardProps) => {
  return (
    <div className="bg-[#222222] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      <img 
        src={anime.images.jpg.image_url} 
        alt={anime.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg truncate">{anime.title}</h3>
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-[#0EA5E9]">Episodes: {anime.episodes || "N/A"}</span>
          <span className="text-[#8B5CF6]">Rating: {anime.score || "N/A"}</span>
        </div>
      </div>
    </div>
  );
};
