import styled from 'styled-components';

type styledBtnProps = {
    current?: boolean;
};

export const PaginationContainerStyled = styled.div`
    display: flex;
    justify-content: center;
    padding: 16px 0;
`;

export const ButtonStyled = styled.button<styledBtnProps>`
    width: 32px;
    height: 32px;
    font-size: 1em;
    font-weight: bold;
    color: ${(props) => (props.current ? 'black' : 'grey')};
    border: 1px solid rgba(100, 100, 100, 0.2);
    background-color: white;

    &:hover {
        cursor: pointer;
        background-color: #d6d6d6;
    }
`;
