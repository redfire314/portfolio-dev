export interface IMovie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    popularity: number;
    poster_path: string;
    backdrop_path: string;
}

export interface IMovieVideos {
    name: string;
    key: string;
}
