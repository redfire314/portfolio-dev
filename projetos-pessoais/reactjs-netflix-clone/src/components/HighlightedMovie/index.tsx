import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getMovieVideosById } from "../../services/api";
import { IMovie, IMovieVideos } from "../../interfaces/movie";
import fetchEnum from "../../interfaces/fetchEnum";
import Icon from "../Icon";
import Loading from "../Loading";
import MovieList from "../MovieList";
import { Top10BadgeIcon, PlayIcon, DetailIcon } from "../../assets/icons";
import { Container, MovieInfo, MovieButtons, Button, Modal } from "./styles";

interface IProps {
    movie: IMovie;
    movieListTitle: string;
    movieListType: fetchEnum;
    movieId?: number;
    isMovieDetail?: boolean;
}

function HilightedMovie(props: IProps) {
    const [movie, setMovie] = useState<IMovie>({} as IMovie);
    const [movieVideos, setMovieVideos] = useState<IMovieVideos>({} as IMovieVideos);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!props.movie) return;

        const fetchMovieDataAsync = async () => {
            const responseVideos = await getMovieVideosById(props.movie.id.toString());

            setMovie(props.movie);
            setMovieVideos(responseVideos.results[0]);
            setIsLoading(false);
        };

        fetchMovieDataAsync();
    }, [props]);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <Container bg={`https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`}>
                        <MovieInfo>
                            <h1 title={movie.title}>{movie.title}</h1>
                            <Icon size={3.2}>
                                <Top10BadgeIcon />
                            </Icon>
                            <p>{movie.overview || "Sem descrição."}</p>
                            <MovieButtons>
                                {props.isMovieDetail ? (
                                    <Button primary onClick={() => setIsModalOpen(true)}>
                                        <Icon size={3.2}>
                                            <PlayIcon />
                                        </Icon>
                                        <span>Assistir trailer</span>
                                    </Button>
                                ) : (
                                    <Link to={`/movie/${movie.id}`}>
                                        <Button>
                                            <Icon size={3.2}>
                                                <DetailIcon />
                                            </Icon>
                                            <span>Mais informações</span>
                                        </Button>
                                    </Link>
                                )}
                            </MovieButtons>
                        </MovieInfo>
                        <MovieList title={props.movieListTitle} fetchType={props.movieListType} id={movie.id} />
                    </Container>
                    {isModalOpen && (
                        <Modal onClick={() => setIsModalOpen(false)}>
                            <iframe
                                width="560"
                                height="315"
                                src={`https://www.youtube.com/embed/${movieVideos ? movieVideos.key : "RqJVa0fl01w"}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </Modal>
                    )}
                </>
            )}
        </>
    );
}

export default HilightedMovie;
