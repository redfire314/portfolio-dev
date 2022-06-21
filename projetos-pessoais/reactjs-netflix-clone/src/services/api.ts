import axios from "../config/axios";
import { IMovie } from "../interfaces/movie";
import fetchEnum from "../interfaces/fetchEnum";
import { IResponse, IResponseVideos } from "../interfaces/response";

export async function getMoviesByType(type: fetchEnum) {
    const response = await axios.get<IResponse>(`/movie/${fetchEnum[type]}`);
    return response.data;
}

export async function getMoviesByName(name: string) {
    const response = await axios.get<IResponse>(`/search/movie?query=${name}`);
    return response.data;
}

export async function getMovieById(id: string) {
    const response = await axios.get<IMovie>(`/movie/${id}`);
    return response.data;
}

export async function getSimilarMoviesById(id: number) {
    const response = await axios.get<IResponse>(`/movie/${id}/similar`);
    return response.data;
}

export async function getMovieVideosById(id: string) {
    const response = await axios.get<IResponseVideos>(`/movie/${id}/videos`);
    return response.data;
}
