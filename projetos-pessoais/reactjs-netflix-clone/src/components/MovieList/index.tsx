import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { IMovie } from "../../interfaces/movie";
import fetchEnum from "../../interfaces/fetchEnum";
import { getMoviesByType, getSimilarMoviesById } from "../../services/api";
import Loading from "../Loading";
import MovieBox from "../MovieBox";
import { Container } from "./styles";

interface IProps {
    title: string;
    fetchType: fetchEnum;
    id?: number;
    poster?: boolean;
}

function MovieList(props: IProps) {
    const [movies, setMovies] = useState<Array<IMovie>>([{}] as Array<IMovie>);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMovieDataAsync = async () => {
            let response;

            if (props.fetchType === fetchEnum.similar && props.id) {
                response = await getSimilarMoviesById(props.id);
            } else {
                response = await getMoviesByType(props.fetchType);
            }

            setMovies(response.results);
            setIsLoading(false);
        };

        fetchMovieDataAsync();
    }, [props.id]);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <Container>
                    <h3>{props.title}</h3>
                    <Swiper slidesPerView={5}>
                        {movies.map((movie, index: number) => {
                            return (
                                <SwiperSlide key={index}>
                                    <Link to={`/movie/${movie.id}`}>
                                        <MovieBox movie={movie} poster={props.poster} />
                                    </Link>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </Container>
            )}
        </>
    );
}

export default MovieList;
