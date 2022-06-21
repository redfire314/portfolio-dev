import styled from "styled-components";

export const SearchOptions = styled.div`
    display: flex;
    align-items: center;
    width: fit-content;
    margin: 3rem auto;
    font-size: 5rem;

    input {
        background-color: var(--color-black);
        border: 2px solid var(--color-black);
        border-radius: 0.4rem;
        transition: all 0.2s;
        color: var(--color-white);
        padding: 1rem 6rem 1rem 1.5rem;
    }

    input:focus {
        outline: 2px solid var(--color-red);
    }

    div {
        position: relative;
        left: -48px;
        display: flex;
    }

    div:hover {
        cursor: pointer;
    }
`;

export const MovieBoxContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.8rem;
    max-width: 144rem;
    margin: 0 auto;
    margin-bottom: 3rem;

    div {
        width: 29.86rem;
        height: 44.8rem;
    }
`;
