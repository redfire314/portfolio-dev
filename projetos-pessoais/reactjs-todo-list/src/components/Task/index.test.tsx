import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Task from './index';

describe('Initial state checker', () => {
    it('should start with the correct elements', () => {
        const removeFn = jest.fn();
        const taskEl = render(<Task text='Test' removeAction={removeFn} />);
        const toggleBtn = taskEl.queryByText('Finalizar') as HTMLElement;
        const removeBtn = taskEl.queryByText('Remover') as HTMLElement;

        expect(toggleBtn).toBeInTheDocument();
        expect(removeBtn).toBeInTheDocument();
    });

    it('should toggle class Done when Toggle btn is clicked and remove the task when Remove btn is clicked', () => {
        const removeFn = jest.fn();
        const taskEl = render(<Task text='Test' removeAction={removeFn} />);
        const taskText = taskEl.queryByRole('heading') as HTMLElement;
        const toggleBtn = taskEl.queryByText('Finalizar') as HTMLElement;
        const removeBtn = taskEl.queryByText('Remover') as HTMLElement;

        expect(taskText).not.toHaveClass('done');

        fireEvent.click(toggleBtn);
        expect(taskText).toHaveClass('done');

        fireEvent.click(removeBtn);
        expect(removeFn).toBeCalledTimes(1);
    });
});
