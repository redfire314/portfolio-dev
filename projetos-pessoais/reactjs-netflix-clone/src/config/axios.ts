import axios from "axios";

export default axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: {
        language: "pt-BR",
    },
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
});
