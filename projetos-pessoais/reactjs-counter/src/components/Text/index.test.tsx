import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Text from './index';

describe('Text component initial state', () => {
    it('should render with the correct text', () => {
        const componentEl = render(<Text count='0' />).getByTestId('text');
        expect(componentEl.textContent).toBe('Você ainda não girou a moeda');
    });
});
