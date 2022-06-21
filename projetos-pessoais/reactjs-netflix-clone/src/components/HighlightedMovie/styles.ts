import styled, { css } from "styled-components";

export const Container = styled.main<{ bg: string }>`
    min-height: 81rem;
    background-image: linear-gradient(270deg, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.5) 100%), url(${(props) => props.bg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top;
`;

export const MovieInfo = styled.div`
    max-width: 63.6rem;
    height: 39.2rem;
    margin: 20rem 0 2rem var(--max-container-margin);
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 1.5rem;
    color: var(--color-white);

    h1 {
        font-size: 5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    p {
        font-size: 2.4rem;
        font-weight: 400;

        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
    }
`;

export const MovieButtons = styled.div`
    display: flex;
    gap: 1.5rem;

    a {
        text-decoration: none;
    }
`;

export const Button = styled.button<{ primary?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 1.5rem 3rem;
    border-color: transparent;
    border-radius: 0.4rem;

    ${(props) =>
        props.primary
            ? css`
                  background-color: var(--color-white);
                  color: var(--color-black);

                  svg,
                  svg:hover {
                      color: var(--color-black);
                  }
              `
            : css`
                  background-color: var(--color-white-opacity);
                  color: var(--color-white);

                  svg {
                      color: var(--color-white);
                  }
              `}

    span {
        font-size: 2.2rem;
        font-weight: 500;
    }

    &:hover {
        cursor: pointer;
        box-shadow: 0 0 1.5rem var(--color-white-opacity);
    }
`;

export const Modal = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    z-index: 1;

    iframe {
        width: 50vw;
        height: 28.13vw;
    }
`;
