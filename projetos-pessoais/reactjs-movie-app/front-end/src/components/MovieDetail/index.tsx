import { useNavigate } from 'react-router-dom';
import { MovieDetailStyled } from './styles';

const arrowLeft = require('../../assets/images/arrow-left.png');

type Props = {
    title?: string;
    overview?: string;
    poster_path?: string;
    release_date: string;
};

function MovieDetail(props: Props) {
    const imageUrl = 'https://image.tmdb.org/t/p/w500';
    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate('..');
    };

    const dateArr = props.release_date?.split('-').map((date) => parseInt(date));
    const date = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);

    return (
        <MovieDetailStyled>
            <button onClick={handleOnClick}>
                <img src={arrowLeft} alt='Voltar' />
            </button>
            <div className='container'>
                <div className='imgContainer'>
                    <img src={imageUrl + props.poster_path} alt={props.title} />
                </div>
                <div className='infoContainer'>
                    <h1>{props.title || 'Sem título'}</h1>
                    <br />
                    <p>{props.overview || 'Sem descrição.'}</p>
                    <br />
                    <p>Lançamento: {date.toLocaleDateString() || 'Sem data.'}</p>
                </div>
            </div>
        </MovieDetailStyled>
    );
}

export default MovieDetail;
