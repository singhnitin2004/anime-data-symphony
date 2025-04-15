
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
}

export interface AnimeResponse {
  data: AnimeData[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
  };
}
