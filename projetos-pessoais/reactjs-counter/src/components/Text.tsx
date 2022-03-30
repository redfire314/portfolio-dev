interface Iprops {
    count: any;
}

function Text(props: Iprops) {
    return <p data-testid='text'>Você girou a moeda {props.count || 0} vezes</p>;
}

export default Text;
