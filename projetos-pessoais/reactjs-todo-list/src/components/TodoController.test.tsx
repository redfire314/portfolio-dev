import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TodoController from './TodoController';

describe('Initial state checker', () => {
    it('should start with the correct elements', () => {
        const addTaskOnListMock = jest.fn();
        const TodoControllerEl = render(<TodoController addTaskOnList={addTaskOnListMock} />);
        const inputEl = TodoControllerEl.queryByRole('textbox') as HTMLInputElement;
        const btnEl = TodoControllerEl.queryByRole('button') as HTMLElement;

        expect(inputEl).toBeInTheDocument();
        expect(btnEl).toBeInTheDocument();
    });
});

describe('User action checker', () => {
    it('should change input value and add task on list when button is clicked', () => {
        const addTaskOnListMock = jest.fn();
        const TodoControllerEl = render(<TodoController addTaskOnList={addTaskOnListMock} />);
        const inputEl = TodoControllerEl.queryByRole('textbox') as HTMLInputElement;
        const btnEl = TodoControllerEl.queryByRole('button') as HTMLElement;

        expect(inputEl.value).toBe('');

        fireEvent.change(inputEl, {
            target: {
                value: 'Testing'
            }
        });
        expect(inputEl.value).toBe('Testing');

        fireEvent.click(btnEl);
        fireEvent.click(btnEl);
        fireEvent.click(btnEl);
        expect(addTaskOnListMock).toBeCalledTimes(3);
    });
});
