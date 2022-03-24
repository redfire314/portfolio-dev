interface Iprops {
    text: string;
}

function Text(props: Iprops) {
    return <p>{props.text}</p>;
}

export default Text;
