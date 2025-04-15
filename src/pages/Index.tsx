
import { useState } from "react";
import { AnimeGrid } from "@/components/AnimeGrid";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("en");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <Navbar onSearch={handleSearch} onLanguageChange={handleLanguageChange} />
      
      <header className="py-6 px-4 mb-8 border-b border-gray-800 mt-16">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-white text-center">Anime Explorer</h1>
          <p className="text-center text-gray-400 mt-2">
            {language === "en" ? "Browse and download anime information" :
             language === "ja" ? "アニメ情報を閲覧してダウンロード" :
             language === "fr" ? "Parcourir et télécharger des informations sur les animes" :
             language === "de" ? "Anime-Informationen durchsuchen und herunterladen" :
             "Explorar y descargar información de anime"}
          </p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 pb-12">
        <AnimeGrid searchQuery={searchQuery} language={language} />
      </main>
      
      <footer className="py-6 border-t border-gray-800 text-center text-gray-400">
        <div className="container mx-auto">
          <p>
            {language === "en" ? "Data provided by " :
             language === "ja" ? "データ提供元: " :
             language === "fr" ? "Données fournies par " :
             language === "de" ? "Daten bereitgestellt von " :
             "Datos proporcionados por "}
            <a href="https://jikan.moe/" target="_blank" rel="noopener noreferrer" className="text-[#0EA5E9] hover:underline">Jikan API</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
