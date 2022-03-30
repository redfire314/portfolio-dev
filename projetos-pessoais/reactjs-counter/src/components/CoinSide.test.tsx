import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import CoinSide from './CoinSide';

describe('CoinSide component initial state', () => {
    it('should render with the correct text', () => {
        const mockStore = configureStore();
        const store = mockStore({ counter: { value: 0 } });
        const componentEl = render(
            <Provider store={store}>
                <CoinSide text='?' />
            </Provider>
        ).getByTestId('coinside');

        expect(componentEl.textContent).toBe('?');
    });
});
