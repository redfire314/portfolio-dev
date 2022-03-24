import { memo, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { useSelector } from 'react-redux';

interface Istate {
    counter: Icounter;
}

interface Icounter {
    value: number;
}

interface IpropsContainer {
    animate?: boolean;
}

interface IpropsCoin {
    text: string;
}

const Container = styled.div<IpropsContainer>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 128px;
    width: 128px;
    margin: 2em auto;
    border: 2px solid #fff;
    border-radius: 50%;

    ${(props) =>
        props.animate &&
        css`
            transform: rotateY(360deg);
        `}

    transition: all .5s ease;
`;

const Title = styled.h1`
    margin: 0;
`;

function CoinSide(props: IpropsCoin) {
    const [animation, setAnimatioin] = useState(true);
    const counter = useSelector<Istate>((state) => state.counter.value);

    useEffect(() => {
        setAnimatioin((oldValue) => !oldValue);
    }, [counter]);

    return (
        <Container animate={animation}>
            <Title>{props.text}</Title>
        </Container>
    );
}

export default memo(CoinSide);
