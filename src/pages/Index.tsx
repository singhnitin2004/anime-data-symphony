
import { AnimeGrid } from "@/components/AnimeGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#1A1F2C]">
      <header className="py-6 px-4 mb-8">
        <h1 className="text-4xl font-bold text-white text-center">Anime Explorer</h1>
      </header>
      <main className="container mx-auto px-4 pb-12">
        <AnimeGrid />
      </main>
    </div>
  );
};

export default Index;
