import { useState, useMemo } from 'react';

import CoinSide from './CoinSide';
import ActionBtn from './ActionBtn';
import Text from './Text';

import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../store/slices/counterSlice';

interface Istate {
    counter: Icounter;
}

interface Icounter {
    value: number;
}

function Coin() {
    const [coinSide, setCoinSide] = useState('Cara');
    const counter = useSelector<Istate>((state) => state.counter.value);
    const counterDispatch = useDispatch();

    const sideMemo = useMemo(() => {
        return coinSide;
    }, [coinSide]);

    const spinCoin = (): void => {
        const side: string = Math.floor(Math.random() * 2) === 0 ? 'Cara' : 'Coroa';
        setCoinSide(side);
    };

    return (
        <>
            <CoinSide text={sideMemo} />
            <ActionBtn
                text='Girar moeda'
                action={() => {
                    spinCoin();
                    counterDispatch(increment());
                }}
            />
            <Text text={`Você girou a moeda ${counter} vezes`} />
        </>
    );
}

export default Coin;
