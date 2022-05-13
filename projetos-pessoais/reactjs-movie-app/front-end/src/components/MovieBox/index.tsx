import { useNavigate } from 'react-router-dom';
import { MovieBoxStyled, ImgStyled } from './styles';

type MovieType = {
    poster: string;
    title: string;
    id: number;
};

function MovieBox(props: MovieType) {
    const imageUrl = 'https://image.tmdb.org/t/p/w220_and_h330_face';
    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate(`/filme/${props.id}`);
    };

    return (
        <MovieBoxStyled title={props.title} onClick={handleOnClick}>
            <ImgStyled src={imageUrl + props.poster} alt={props.title} width='220px' height='330px' />
        </MovieBoxStyled>
    );
}

export default MovieBox;
