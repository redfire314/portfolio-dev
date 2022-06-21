import { IMovie } from "../../interfaces/movie";
import { Container } from "./styles";

interface IProps {
    movie: IMovie;
    poster?: boolean;
}

function MovieBox(props: IProps) {
    return (
        <>
            {props.poster ? (
                <Container
                    title={props.movie.title}
                    bg={`https://image.tmdb.org/t/p/w500/${props.movie.poster_path || props.movie.backdrop_path}`}
                    poster={true}
                />
            ) : (
                <Container
                    title={props.movie.title}
                    bg={`https://image.tmdb.org/t/p/w300/${props.movie.backdrop_path || props.movie.poster_path}`}
                    poster={false}
                />
            )}
        </>
    );
}

export default MovieBox;
