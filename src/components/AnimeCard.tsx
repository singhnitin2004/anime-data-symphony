
import { AnimeData } from "@/types/anime";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

interface AnimeCardProps {
  anime: AnimeData;
  onViewDetails: (anime: AnimeData) => void;
  language?: string;
}

export const AnimeCard = ({ anime, onViewDetails, language = "en" }: AnimeCardProps) => {
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
      
      const successMessage = language === "en" ? "Download complete!" : 
                            language === "ja" ? "ダウンロード完了!" :
                            language === "fr" ? "Téléchargement terminé!" :
                            language === "de" ? "Download abgeschlossen!" :
                            "¡Descarga completa!";
      
      toast.success(successMessage);
    } catch (error) {
      const errorMessage = language === "en" ? "Failed to download anime information" : 
                          language === "ja" ? "アニメ情報のダウンロードに失敗しました" :
                          language === "fr" ? "Échec du téléchargement des informations sur l'anime" :
                          language === "de" ? "Fehler beim Herunterladen der Anime-Informationen" :
                          "Error al descargar información de anime";
      
      toast.error(errorMessage);
      console.error("Download error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  // Get button text based on language
  const getViewDetailsText = () => {
    switch(language) {
      case "ja": return "詳細を見る";
      case "fr": return "Voir détails";
      case "de": return "Details anzeigen";
      case "es": return "Ver detalles";
      default: return "View Details";
    }
  };

  const getDownloadText = () => {
    if (isDownloading) return "...";
    
    switch(language) {
      case "ja": return "JSON";
      case "fr": return "JSON";
      case "de": return "JSON";
      case "es": return "JSON";
      default: return "JSON";
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
          <span className="text-[#0EA5E9]">
            {language === "en" ? "Episodes" : 
             language === "ja" ? "エピソード" :
             language === "fr" ? "Épisodes" :
             language === "de" ? "Folgen" : "Episodios"}: {anime.episodes || "N/A"}
          </span>
          <span className="text-[#8B5CF6]">
            {language === "en" ? "Rating" : 
             language === "ja" ? "評価" :
             language === "fr" ? "Note" :
             language === "de" ? "Bewertung" : "Calificación"}: {anime.score || "N/A"}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        <Button 
          variant="outline" 
          className="text-white border-white hover:bg-[#323232]"
          onClick={() => onViewDetails(anime)}
        >
          {getViewDetailsText()}
        </Button>
        <Button
          variant="outline"
          className="text-[#0EA5E9] border-[#0EA5E9] hover:bg-[#0EA5E9]/10"
          onClick={downloadAnimeInfo}
          disabled={isDownloading}
        >
          <Download className="h-4 w-4 mr-1" />
          {getDownloadText()}
        </Button>
      </CardFooter>
    </Card>
  );
};
