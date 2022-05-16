import { AppContainer } from './styles';

interface IProps {
    children: JSX.Element[];
}

function Container(props: IProps) {
    return <AppContainer>{props.children}</AppContainer>;
}

export default Container;
