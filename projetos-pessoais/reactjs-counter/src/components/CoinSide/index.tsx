import { memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from './styles';

interface ICounter {
    value: number;
}

interface IState {
    counter: ICounter;
}

interface IProps {
    text: string;
}

function CoinSide(props: IProps) {
    const [animation, setAnimatioin] = useState(true);
    const counter = useSelector<IState>((state) => state.counter.value);

    useEffect(() => {
        setAnimatioin((oldValue) => !oldValue);
    }, [counter]);

    return (
        <Container animate={animation}>
            <h1 data-testid='coinside'>{props.text || '?'}</h1>
        </Container>
    );
}

export default memo(CoinSide);
