import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    :root {
        --color-main: #ffff99;
        --color-dark: #313131;
        --color-dark-highlight: #616161;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: Sans-Serif;
        background-color: var(--color-dark);
    }
`;
