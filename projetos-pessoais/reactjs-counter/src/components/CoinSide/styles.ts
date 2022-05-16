import styled, { css } from 'styled-components';

interface IPropsContainer {
    animate?: boolean;
}

export const Container = styled.div<IPropsContainer>`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 128px;
    width: 128px;
    margin: 2em auto;
    border: 2px solid #fff;
    border-radius: 50%;

    ${(props) =>
        props.animate &&
        css`
            transform: rotateY(360deg);
        `}

    transition: all .5s ease;

    & h1 {
        margin: 0;
    }
`;
