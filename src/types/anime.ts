
export interface AnimeData {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    }
  };
  episodes: number;
  score: number;
  synopsis: string;
  year?: number;
  status?: string;
  genres?: {
    mal_id: number;
    name: string;
  }[];
  rating?: string;
  aired?: {
    from: string;
    to: string;
  };
  duration?: string;
}

export interface AnimeResponse {
  data: AnimeData[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}
