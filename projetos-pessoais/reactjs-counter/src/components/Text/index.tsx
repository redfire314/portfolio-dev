interface IProps {
    count: any;
}

function Text(props: IProps) {
    return <p data-testid='text'>{props.count == 0 ? 'Você ainda não girou a moeda' : `Você girou a moeda ${props.count} ${props.count > 1 ? 'vezes' : 'vez'}`}</p>;
}

export default Text;
