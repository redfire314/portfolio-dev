import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import ActionBtn from './ActionBtn';

describe('ActionBtn component initial state', () => {
    it('should render with the correct text', () => {
        const action = jest.fn();
        const componentEl = render(<ActionBtn action={action} />).getByTestId('actionbtn');
        expect(componentEl.textContent).toBe('Girar moeda');
    });
});
