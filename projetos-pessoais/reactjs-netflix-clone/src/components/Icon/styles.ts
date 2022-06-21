import styled from "styled-components";

export const Container = styled.div<{ size: number }>`
    svg {
        width: ${(props) => props.size}rem;
        height: ${(props) => props.size}rem;
        color: var(--color-smoke-white);
        transition: color 0.3s;
    }

    svg:hover {
        color: var(--color-white);
    }
`;
