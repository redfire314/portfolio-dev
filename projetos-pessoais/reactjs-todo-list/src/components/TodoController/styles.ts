import styled from 'styled-components';

export const Form = styled.form`
    margin: 1em 0;

    input {
        width: 70%;
        padding: 8px;
        border: 1px solid #fff;
        border-radius: 6px 0 0 6px;
    }

    button {
        width: 30%;
        padding: 8px;
        color: #fff;
        border: 1px solid #fff;
        border-radius: 0 6px 6px 0;
        background-color: transparent;
        transition: all 0.2s;
    }

    button:hover {
        color: var(--color-dark);
        background-color: #fff;
        cursor: pointer;
    }
`;
