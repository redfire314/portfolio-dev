import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchById } from '../utils/fetch';
import MovieDetail from '../components/MovieDetail';

type movieTypes = {
    title?: string;
    overview?: string;
    poster_path?: string;
    release_date: string;
};

function Movie() {
    const [movieData, setMovieData] = useState<movieTypes>({ release_date: '' });
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            (async () => {
                const data = await fetchById(id);
                setMovieData(data.movies);
            })();
        }
    }, [id]);

    return <MovieDetail title={movieData.title} overview={movieData.overview} poster_path={movieData.poster_path} release_date={movieData.release_date} />;
}

export default Movie;
