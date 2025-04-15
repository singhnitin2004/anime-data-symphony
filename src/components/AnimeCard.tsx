
import { AnimeData } from "@/types/anime";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

interface AnimeCardProps {
  anime: AnimeData;
  onViewDetails: (anime: AnimeData) => void;
}

export const AnimeCard = ({ anime, onViewDetails }: AnimeCardProps) => {
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
    <Card className="bg-[#222222] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      <div className="relative">
        <img 
          src={anime.images.jpg.image_url} 
          alt={anime.title}
          className="w-full h-64 object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-white font-semibold text-lg truncate mb-2">{anime.title}</h3>
        <div className="flex justify-between text-sm">
          <span className="text-[#0EA5E9]">Episodes: {anime.episodes || "N/A"}</span>
          <span className="text-[#8B5CF6]">Rating: {anime.score || "N/A"}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button 
          variant="outline" 
          className="text-white border-white hover:bg-[#323232]"
          onClick={() => onViewDetails(anime)}
        >
          View Details
        </Button>
        <Button
          variant="outline"
          className="text-[#0EA5E9] border-[#0EA5E9] hover:bg-[#0EA5E9]/10"
          onClick={downloadAnimeInfo}
          disabled={isDownloading}
        >
          <Download className="h-4 w-4 mr-1" />
          {isDownloading ? "..." : "JSON"}
        </Button>
      </CardFooter>
    </Card>
  );
};
