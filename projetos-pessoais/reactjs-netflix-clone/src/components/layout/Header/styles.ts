import styled, { css } from "styled-components";

export const Container = styled.header`
    height: 8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2.5rem var(--max-container-margin);
    background-color: var(--color-black);

    nav {
        display: flex;
        align-items: center;
        gap: 5rem;

        img {
            width: 12.8rem;
            height: 3rem;
        }
    }

    ul {
        list-style: none;
        display: flex;
        align-items: center;
        gap: 2rem;
    }
`;

export const Item = styled.li<{ disabled?: boolean }>`
    a {
        text-decoration: none;
        font-size: 1.4rem;
        color: var(--color-smoke-white);
    }

    a:hover {
        color: var(--color-white);
        font-weight: 900;
    }

    ${(props) =>
        props.disabled &&
        css`
            a,
            a:hover,
            svg,
            svg:hover {
                color: var(--color-disabled);
                font-weight: normal;
                cursor: default;
            }
        `}
`;

export const Profile = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

    img {
        width: 3.2rem;
        height: 3.2rem;
        opacity: 0.32;
    }
`;
