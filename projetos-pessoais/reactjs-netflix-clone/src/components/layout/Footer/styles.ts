import styled from "styled-components";

export const Container = styled.footer`
    background-color: var(--color-black);
    margin-top: auto;
    padding: 2rem;

    a {
        text-decoration: none;
        font-size: 1.3rem;
        color: var(--color-gray);
    }

    a:hover {
        text-decoration: underline;
    }

    ul {
        list-style: none;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 128rem;
    margin: 0 auto;
`;

export const Social = styled.ul`
    display: flex;
    gap: 2rem;

    svg {
        color: var(--color-gray);
    }
`;

export const Links = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 1.5rem;
    max-height: 12rem;
`;

export const Contact = styled.a`
    width: fit-content;
    padding: 1rem 1.5rem;
    border: 0.1rem solid var(--color-gray);
    background-color: transparent;

    &:hover {
        color: var(--color-white);
        border-color: var(--color-white);
        text-decoration: none !important;
        cursor: pointer;
    }
`;

export const Copy = styled.a`
    width: fit-content;
`;
