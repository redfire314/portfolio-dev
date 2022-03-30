import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { increment } from '../store/modules/counter';

import Coin from './Coin';

const initialValue = { counter: { value: 0 } };
const mockStore = configureStore([])(initialValue);

describe('Coin component initial state', () => {
    it('should render correctly all the children components', () => {
        const componentEl = render(
            <Provider store={mockStore}>
                <Coin />
            </Provider>
        );

        const coinSide = componentEl.getByTestId('coinside');
        const actionBtn = componentEl.getByTestId('actionbtn');
        const text = componentEl.getByTestId('text');

        expect(coinSide.textContent).toBe('?');
        expect(actionBtn.textContent).toBe('Girar moeda');
        expect(text.textContent).toBe('Você girou a moeda 0 vezes');
    });
});

describe('Coin component user interaction', () => {
    it('should spin the coin and add 1 on counter', () => {
        const componentEl = render(
            <Provider store={mockStore}>
                <Coin />
            </Provider>
        );

        const coinSide = componentEl.getByTestId('coinside');
        const actionBtn = componentEl.getByTestId('actionbtn');
        const text = componentEl.getByTestId('text');

        expect(coinSide.textContent).toBe('?');
        expect(text.textContent).toBe('Você girou a moeda 0 vezes');

        fireEvent.click(actionBtn);

        expect(coinSide.textContent).not.toBe('?');
        expect(mockStore.getActions()).toContainEqual(increment());
    });
});
