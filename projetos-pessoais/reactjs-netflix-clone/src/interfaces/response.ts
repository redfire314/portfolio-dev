import { IMovie, IMovieVideos } from "./movie";

export interface IResponse {
    page: number;
    results: Array<IMovie>;
    total_pages: number;
    total_results: number;
}

export interface IResponseVideos {
    results: Array<IMovieVideos>;
}
