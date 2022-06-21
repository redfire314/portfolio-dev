import { useState, useEffect } from "react";

import fetchEnum from "../../interfaces/fetchEnum";
import { IMovie } from "../../interfaces/movie";
import { getMoviesByType } from "../../services/api";
import HilightedMovie from "../../components/HighlightedMovie";
import MovieList from "../../components/MovieList";

function Home() {
    const [mainMovie, setMainMovie] = useState<IMovie>({} as IMovie);

    useEffect(() => {
        const getMainMovieAsync = async () => {
            const response = await getMoviesByType(fetchEnum.upcoming);
            const rndMovie = Math.floor(Math.random() * response.results.length);

            setMainMovie(response.results[rndMovie]);
        };

        getMainMovieAsync();
    }, []);

    return (
        <>
            <HilightedMovie movie={mainMovie} movieListTitle="Netflix em cartaz" movieListType={fetchEnum.upcoming} />
            <MovieList title="Netflix lançamentos" fetchType={fetchEnum.now_playing} />
            <MovieList title="Netflix mais avaliados" poster fetchType={fetchEnum.top_rated} />
        </>
    );
}

export default Home;
