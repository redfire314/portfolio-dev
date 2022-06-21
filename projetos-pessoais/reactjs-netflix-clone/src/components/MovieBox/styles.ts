import styled from "styled-components";

export const Container = styled.div<{ bg: string; poster: boolean }>`
    width: ${(props) => (props.poster ? 38.4 : 28.8)}rem;
    height: ${(props) => (props.poster ? 57.6 : 16.2)}rem;
    background-color: var(--color-white-opacity);
    background-image: url(${(props) => props.bg});
    background-size: cover;
    background-position: center;
    transition: all 0.2s ease;

    &:hover {
        transform: scale(1.1);
    }
`;
