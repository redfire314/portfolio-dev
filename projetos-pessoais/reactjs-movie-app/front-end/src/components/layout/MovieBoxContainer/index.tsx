import { MovieBoxContainerStyled } from './styles';

type Props = {
    children: JSX.Element[];
};

function MovieBoxContainer(props: Props) {
    return <MovieBoxContainerStyled>{props.children}</MovieBoxContainerStyled>;
}

export default MovieBoxContainer;
