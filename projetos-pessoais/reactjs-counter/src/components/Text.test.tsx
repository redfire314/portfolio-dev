import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Text from './Text';

describe('Text component initial state', () => {
    it('should render with the correct text', () => {
        const componentEl = render(<Text count='0' />).getByTestId('text');
        expect(componentEl.textContent).toBe('Você girou a moeda 0 vezes');
    });
});
