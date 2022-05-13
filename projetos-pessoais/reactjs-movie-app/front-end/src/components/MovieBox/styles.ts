import styled from 'styled-components';

export const MovieBoxStyled = styled.div`
    width: 220px;
    height: 330px;
    background-color: grey;
    overflow: hidden;

    &:hover {
        cursor: pointer;
    }
`;

export const ImgStyled = styled.img`
    transition: all 0.2s;

    &:hover {
        transform: scale(1.2);
    }
`;
