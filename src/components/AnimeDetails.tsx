
import { AnimeData } from "@/types/anime";
import { Button } from "@/components/ui/button";
import { X, Download } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AnimeDetailsProps {
  anime: AnimeData;
  onClose: () => void;
  language?: string;
}

export const AnimeDetails = ({ anime, onClose, language = "en" }: AnimeDetailsProps) => {
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

  // Translate section titles based on language
  const getTranslation = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      synopsis: {
        en: "Synopsis",
        ja: "あらすじ",
        fr: "Synopsis",
        de: "Zusammenfassung",
        es: "Sinopsis"
      },
      episodes: {
        en: "Episodes",
        ja: "エピソード",
        fr: "Épisodes",
        de: "Folgen",
        es: "Episodios"
      },
      score: {
        en: "Score",
        ja: "スコア",
        fr: "Score",
        de: "Punktzahl",
        es: "Puntuación"
      },
      year: {
        en: "Year",
        ja: "年",
        fr: "Année",
        de: "Jahr",
        es: "Año"
      },
      status: {
        en: "Status",
        ja: "状態",
        fr: "Statut",
        de: "Status",
        es: "Estado"
      },
      genres: {
        en: "Genres",
        ja: "ジャンル",
        fr: "Genres",
        de: "Genres",
        es: "Géneros"
      },
      rating: {
        en: "Rating",
        ja: "評価",
        fr: "Évaluation",
        de: "Bewertung",
        es: "Clasificación"
      },
      aired: {
        en: "Aired",
        ja: "放送日",
        fr: "Diffusé",
        de: "Ausgestrahlt",
        es: "Emitido"
      },
      duration: {
        en: "Duration",
        ja: "期間",
        fr: "Durée",
        de: "Dauer",
        es: "Duración"
      },
      download: {
        en: "Download Info (JSON)",
        ja: "情報をダウンロード (JSON)",
        fr: "Télécharger info (JSON)",
        de: "Info herunterladen (JSON)",
        es: "Descargar info (JSON)"
      },
      downloading: {
        en: "Downloading...",
        ja: "ダウンロード中...",
        fr: "Téléchargement...",
        de: "Wird heruntergeladen...",
        es: "Descargando..."
      },
      noSynopsis: {
        en: "No synopsis available.",
        ja: "あらすじは利用できません。",
        fr: "Aucun synopsis disponible.",
        de: "Keine Zusammenfassung verfügbar.",
        es: "No hay sinopsis disponible."
      }
    };

    return translations[key][language] || translations[key]["en"];
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
                <span className="text-gray-400">{getTranslation("episodes")}:</span>
                <span className="text-white">{anime.episodes || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{getTranslation("score")}:</span>
                <span className="text-white">{anime.score || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{getTranslation("year")}:</span>
                <span className="text-white">{anime.year || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{getTranslation("status")}:</span>
                <span className="text-white">{anime.status || "N/A"}</span>
              </div>
              {anime.genres && (
                <div>
                  <span className="text-gray-400">{getTranslation("genres")}:</span>
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
              {isDownloading ? getTranslation("downloading") : getTranslation("download")}
            </Button>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold text-white mb-3">{getTranslation("synopsis")}</h3>
            <p className="text-gray-300 whitespace-pre-line">{anime.synopsis || getTranslation("noSynopsis")}</p>
            
            <div className="mt-6 space-y-4">
              {anime.rating && (
                <div>
                  <h4 className="text-lg font-medium text-white">{getTranslation("rating")}</h4>
                  <p className="text-gray-300">{anime.rating}</p>
                </div>
              )}
              {anime.aired && (
                <div>
                  <h4 className="text-lg font-medium text-white">{getTranslation("aired")}</h4>
                  <p className="text-gray-300">
                    {`${new Date(anime.aired.from).toLocaleDateString()} to ${
                      anime.aired.to ? new Date(anime.aired.to).toLocaleDateString() : "?"
                    }`}
                  </p>
                </div>
              )}
              {anime.duration && (
                <div>
                  <h4 className="text-lg font-medium text-white">{getTranslation("duration")}</h4>
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
