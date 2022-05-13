import api from '../services/api';

export async function fetchPopular(page: number = 1) {
    try {
        const movies = await api.get(`/popular/${page}`);
        return movies.data;
    } catch (error) {
        return [{}];
    }
}

export async function fetchTopRated(page: number = 1) {
    try {
        const movies = await api.get(`/top_rated/${page}`);
        return movies.data;
    } catch (error) {
        return [{}];
    }
}

export async function fetchUpcoming(page: number = 1) {
    try {
        const movies = await api.get(`/upcoming/${page}`);
        return movies.data;
    } catch (error) {
        return [{}];
    }
}

export async function fetchSearch(name: string, page: number = 1) {
    try {
        const movies = await api.get(`/search/${name}/${page}`);
        return movies.data;
    } catch (error) {
        return [{}];
    }
}

export async function fetchById(id: string) {
    try {
        const movie = await api.get(`/id/${id}`);
        return movie.data;
    } catch (error) {
        return [{}];
    }
}
