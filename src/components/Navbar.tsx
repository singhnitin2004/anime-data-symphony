
import { useState } from "react";
import { Globe, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface NavbarProps {
  onSearch: (query: string) => void;
  onLanguageChange: (language: string) => void;
}

export const Navbar = ({ onSearch, onLanguageChange }: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#1A1F2C]/80 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Anime Explorer</h1>
          
          <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
            <form onSubmit={handleSearchSubmit} className="relative w-full md:w-64">
              <Input
                type="text"
                placeholder="Search anime..."
                className="bg-[#323232] border-gray-700 text-white pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <Search size={18} />
              </button>
            </form>
            
            <div className="flex items-center gap-2">
              <Globe size={18} className="text-gray-400" />
              <Select onValueChange={onLanguageChange} defaultValue="en">
                <SelectTrigger className="w-[120px] bg-[#323232] border-gray-700 text-white">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent className="bg-[#323232] border-gray-700 text-white">
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
