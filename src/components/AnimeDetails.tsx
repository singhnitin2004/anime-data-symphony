
import { AnimeData } from "@/types/anime";
import { Button } from "@/components/ui/button";
import { X, Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AnimeDetailsProps {
  anime: AnimeData;
  onClose: () => void;
}

export const AnimeDetails = ({ anime, onClose }: AnimeDetailsProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadAnimeInfo = async () => {
    try {
      setIsDownloading(true);
      
      // Create a JSON blob with the anime data
      const animeData = JSON.stringify(anime, null, 2);
      const blob = new Blob([animeData], { type: "application/json" });
      
      // Create a download link and trigger the download
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${anime.title.replace(/[^\w\s]/gi, '')}.json`;
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success("Download complete!");
    } catch (error) {
      toast.error("Failed to download anime information");
      console.error("Download error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#222222] rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">{anime.title}</h2>
          <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <img 
              src={anime.images.jpg.large_image_url || anime.images.jpg.image_url} 
              alt={anime.title}
              className="w-full rounded-lg object-cover"
            />
            
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Episodes:</span>
                <span className="text-white">{anime.episodes || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Score:</span>
                <span className="text-white">{anime.score || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Year:</span>
                <span className="text-white">{anime.year || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className="text-white">{anime.status || "N/A"}</span>
              </div>
              {anime.genres && (
                <div>
                  <span className="text-gray-400">Genres:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {anime.genres.map(genre => (
                      <span key={genre.mal_id} className="bg-[#323232] text-white text-xs px-2 py-1 rounded">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <Button
              className="w-full mt-4 bg-[#0EA5E9] hover:bg-[#0EA5E9]/80"
              onClick={downloadAnimeInfo}
              disabled={isDownloading}
            >
              <Download className="h-4 w-4 mr-2" />
              {isDownloading ? "Downloading..." : "Download Info (JSON)"}
            </Button>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold text-white mb-3">Synopsis</h3>
            <p className="text-gray-300 whitespace-pre-line">{anime.synopsis || "No synopsis available."}</p>
            
            <div className="mt-6 space-y-4">
              {anime.rating && (
                <div>
                  <h4 className="text-lg font-medium text-white">Rating</h4>
                  <p className="text-gray-300">{anime.rating}</p>
                </div>
              )}
              {anime.aired && (
                <div>
                  <h4 className="text-lg font-medium text-white">Aired</h4>
                  <p className="text-gray-300">
                    {`${new Date(anime.aired.from).toLocaleDateString()} to ${
                      anime.aired.to ? new Date(anime.aired.to).toLocaleDateString() : "?"
                    }`}
                  </p>
                </div>
              )}
              {anime.duration && (
                <div>
                  <h4 className="text-lg font-medium text-white">Duration</h4>
                  <p className="text-gray-300">{anime.duration}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
