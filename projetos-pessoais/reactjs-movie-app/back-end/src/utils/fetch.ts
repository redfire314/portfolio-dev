import api from '../services/api';

type fetchData = {
    page: number;
    results: Array<object>;
    total_pages: number;
    total_results: number;
};

export const fetchPopular = async (page: number = 1) => {
    return await api.get<fetchData>(`movie/popular?page=${page}`);
};

export const fetchTopRated = async (page: number = 1) => {
    return await api.get<fetchData>(`movie/top_rated?page=${page}`);
};

export const fetchUpcoming = async (page: number = 1) => {
    return await api.get<fetchData>(`movie/upcoming?page=${page}`);
};

export const fetchByName = async (name: string, page: number = 1) => {
    return await api.get<fetchData>(`search/movie?query=${name}&page=${page}`);
};

export const fetchById = async (id: number) => {
    return await api.get(`movie/${id}`);
};
