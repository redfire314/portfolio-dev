import styled from "styled-components";

export const Container = styled.div`
    flex-grow: 1;
    background-image: url("/src/assets/images/bg-lost.webp");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;
`;

export const Info = styled.main`
    max-width: 64rem;
    margin: 0 auto;
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    gap: 6.4rem;
    text-align: center;
    color: var(--color-white);

    h1 {
        font-size: 6rem;
    }

    p {
        font-size: 2.2rem;
    }

    button {
        padding: 0.8rem 2.4rem;
        font-size: 2rem;
        border: 0;
        border-radius: 0.4rem;
    }

    button:hover {
        cursor: pointer;
        box-shadow: 0 0 1.5rem var(--color-white-opacity);
    }

    span {
        width: fit-content;
        padding-left: 1.3rem;
        margin: 0 auto;
        line-height: 3.2rem;
        border-left: 2px solid var(--color-red);
        font-size: 2.4rem;
    }

    strong {
        font-size: 2.4rem;
    }
`;
