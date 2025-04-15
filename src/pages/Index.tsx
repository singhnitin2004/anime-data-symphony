
import { AnimeGrid } from "@/components/AnimeGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <header className="py-6 px-4 mb-8 border-b border-gray-800">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-white text-center">Anime Explorer</h1>
          <p className="text-center text-gray-400 mt-2">Browse and download anime information</p>
        </div>
      </header>
      <main className="container mx-auto px-4 pb-12">
        <AnimeGrid />
      </main>
      <footer className="py-6 border-t border-gray-800 text-center text-gray-400">
        <div className="container mx-auto">
          <p>Data provided by <a href="https://jikan.moe/" target="_blank" rel="noopener noreferrer" className="text-[#0EA5E9] hover:underline">Jikan API</a></p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
