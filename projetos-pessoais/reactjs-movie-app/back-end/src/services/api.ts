import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        authorization: 'Bearer ' + process.env.MOVIEDB_API_KEY_V4
    },
    params: {
        language: 'pt-BR'
    }
});
