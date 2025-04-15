
import { useEffect, useState } from "react";
import axios from "axios";
import { AnimeData, AnimeResponse } from "@/types/anime";
import { AnimeCard } from "./AnimeCard";
import { AnimeDetails } from "./AnimeDetails";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useQuery } from "@tanstack/react-query";

interface AnimeGridProps {
  searchQuery?: string;
  language?: string;
}

export const AnimeGrid = ({ searchQuery = "", language = "en" }: AnimeGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAnime, setSelectedAnime] = useState<AnimeData | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const fetchAnimes = async (page: number) => {
    try {
      // Build the API URL with search query if provided
      let url = `https://api.jikan.moe/v4/anime?page=${page}`;
      if (searchQuery) {
        url += `&q=${encodeURIComponent(searchQuery)}`;
      }
      
      // Use rate limiting to avoid API throttling
      const response = await axios.get<AnimeResponse>(url);
      setTotalPages(response.data.pagination.last_visible_page);
      return response.data.data;
    } catch (error) {
      throw new Error("Failed to load anime data. Please try again later.");
    }
  };

  const { data: animes, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['animes', currentPage, searchQuery],
    queryFn: () => fetchAnimes(currentPage),
    staleTime: 300000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  const handleViewDetails = (anime: AnimeData) => {
    setSelectedAnime(anime);
  };

  const handleCloseDetails = () => {
    setSelectedAnime(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    // Calculate which page numbers to show
    let pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // If we have fewer pages than max visible, show all pages
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Always show first page, last page, current page, and pages around current
      pages.push(1);
      
      // If we're not at the start, add ellipsis or additional pages
      if (currentPage > 3) {
        pages.push(-1); // Represents ellipsis
      }
      
      // Pages around current
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
      
      // If we're not at the end, add ellipsis
      if (currentPage < totalPages - 2) {
        pages.push(-2); // Represents ellipsis
      }
      
      // Last page
      pages.push(totalPages);
    }

    return (
      <Pagination className="my-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          
          {pages.map((page, index) => {
            if (page < 0) {
              // Render ellipsis
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <span className="flex h-9 w-9 items-center justify-center text-white">...</span>
                </PaginationItem>
              );
            }
            
            return (
              <PaginationItem key={page}>
                <PaginationLink 
                  isActive={page === currentPage}
                  onClick={() => handlePageChange(page)}
                  className={page === currentPage ? "bg-[#8B5CF6] text-white" : "text-white hover:bg-[#323232]"}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  if (isLoading) {
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-[#222222] rounded-lg overflow-hidden shadow-lg">
              <Skeleton className="w-full h-64" />
              <div className="p-4">
                <Skeleton className="h-6 w-full mb-2" />
                <div className="flex justify-between mt-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="bg-red-900/20 border-red-900 text-red-50">
        <AlertDescription>
          {error instanceof Error ? error.message : "An error occurred while fetching anime data."}
          <div className="mt-4">
            <Button 
              onClick={() => refetch()} 
              variant="outline" 
              className="border-red-500 text-red-50 hover:bg-red-900/20"
            >
              Try Again
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  // Show message when no results are found
  if (animes && animes.length === 0) {
    return (
      <Alert className="bg-blue-900/20 border-blue-900 text-blue-50">
        <AlertDescription>
          No anime found matching your search criteria. Try a different search term.
          <div className="mt-4">
            <Button 
              onClick={() => refetch()} 
              variant="outline" 
              className="border-blue-500 text-blue-50 hover:bg-blue-900/20"
            >
              Try Again
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      {renderPagination()}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {animes?.map((anime) => (
          <AnimeCard 
            key={anime.mal_id} 
            anime={anime} 
            onViewDetails={handleViewDetails}
            language={language}
          />
        ))}
      </div>
      
      {renderPagination()}
      
      {selectedAnime && (
        <AnimeDetails 
          anime={selectedAnime} 
          onClose={handleCloseDetails} 
          language={language}
        />
      )}
    </>
  );
};
