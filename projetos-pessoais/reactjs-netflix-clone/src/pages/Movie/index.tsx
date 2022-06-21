import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { IMovie } from "../../interfaces/movie";
import fetchEnum from "../../interfaces/fetchEnum";
import { getMovieById } from "../../services/api";
import HilightedMovie from "../../components/HighlightedMovie";

function Movie() {
    const [movie, setMovie] = useState<IMovie>({} as IMovie);
    const params = useParams();

    useEffect(() => {
        const getMovieByIdAsync = async () => {
            if (!params.id || !parseInt(params.id)) {
                return;
            }

            const response = await getMovieById(params.id);

            setMovie(response);
        };

        getMovieByIdAsync();
    }, [params.id]);

    return <HilightedMovie isMovieDetail movie={movie} movieListTitle="Filmes similares" movieListType={fetchEnum.similar} movieId={movie.id} />;
}

export default Movie;
