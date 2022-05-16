import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { increment } from '../../store/modules/counter';

import CoinSide from '../CoinSide';
import ActionBtn from '../ActionBtn';
import Text from '../Text';

interface ICounter {
    value: number;
}

interface IState {
    counter: ICounter;
}

function Coin() {
    const [coinSide, setCoinSide] = useState('?');
    const counter = useSelector<IState>((state) => state.counter.value);
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
                action={() => {
                    spinCoin();
                    counterDispatch(increment());
                }}
            />
            <Text count={counter} />
        </>
    );
}

export default Coin;
