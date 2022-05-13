import styled from 'styled-components';

export const MovieDetailStyled = styled.div`
    p {
        font-size: 1.2em;
        color: white;
    }

    h1 {
        color: white;
        text-transform: uppercase;
    }

    button {
        background-color: transparent;
        border: 0;
    }

    button:hover {
        cursor: pointer;
    }

    img {
        width: 100%;
        height: 100%;
    }

    div.container {
        display: flex;
        justify-content: center;
    }

    div.imgContainer {
        width: 33%;
        min-width: 220px;
    }

    div.infoContainer {
        width: 66%;
        padding: 16px;
        background-color: var(--color-opaque-grey);
    }
`;
