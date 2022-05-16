import styled from 'styled-components';

export const TaskContainer = styled.div`
    display: flex;
    margin-bottom: 0.5em;
    border-radius: 6px;
    border: 1px solid #fff;

    div.text {
        width: 70%;
        padding: 8px;
    }

    div.actions {
        width: 30%;
        padding: 8px;
        display: flex;
        justify-content: space-evenly;
        border-left: 1px solid #fff;
    }

    div.actions:hover {
        background-color: #fff;

        button {
            color: var(--color-dark);
        }
    }

    h3,
    button {
        color: #fff;
    }

    h3.done {
        color: var(--color-dark-highlight);
        text-decoration: line-through;
        font-style: italic;
    }

    button {
        background-color: transparent;
        border: 0;
        transition: all 0.2s;
    }

    button:hover {
        cursor: pointer;
    }
`;
