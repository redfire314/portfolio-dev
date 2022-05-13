import { TitleStyled } from './styles';

type Props = {
    title: string;
};

function Title(props: Props) {
    return <TitleStyled>{props.title}</TitleStyled>;
}

export default Title;
