import { Container } from "./styles";

interface IProps {
    children: JSX.Element;
    size: number;
}

function Icon(props: IProps) {
    return <Container size={props.size}>{props.children}</Container>;
}

export default Icon;
