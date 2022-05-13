import { ContainerStyled } from './styles';

type PropsType = {
    children: JSX.Element[];
};

function Container({ children }: PropsType) {
    return <ContainerStyled>{children}</ContainerStyled>;
}

export default Container;
