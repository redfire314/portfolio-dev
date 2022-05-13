import styled from 'styled-components';

export const ButtonStyled = styled.button`
    padding: 8px;
    border: 1px solid var(--color-opaque-grey);
    background-color: white;

    &:hover {
        cursor: pointer;
        background-color: #d6d6d6;
    }

    img {
        height: 12px;
    }
`;

export const InputStyled = styled.input`
    padding: 8px;
    border: 1px solid var(--color-opaque-grey);
`;
