import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    // Fonts
    @font-face {
        font-family: 'Netflix Sans';
        src: url("/src/assets/fonts/NetflixSans_Regular.woff2");
    }

    @font-face {
        font-family: 'Netflix Sans Medium';
        src: url("/src/assets/fonts/NetflixSans_Medium.woff2");
    }

    // Variables
    :root {
        // Colors
        --color-white: #FFFFFF;
        --color-white-opacity: rgba(255, 255, 255, 0.3);
        --color-smoke-white: #E5E5E5;
        --color-mid-gray: rgba(109, 109, 110, 0.7);
        --color-gray: #808080;
        --color-black: #141414;
        --color-red: #B9090B;
        --color-background: #282828;
        --color-disabled: rgba(255, 255, 255, 0.3);

        // Sizes
        --max-container-margin: 6rem;
    }

    // Reset
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Netflix Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 62.5%; // 1rem = 10px
    }

    // Animation
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }

    // Style
    body {
        display: flex;
        flex-direction: column;
    }
    
    #root {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        background-color: var(--color-background);
    }

    *::selection {
        background-color: var(--color-red);
    }

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background-color: var(--color-black);
    }

    ::-webkit-scrollbar-thumb {
        background-color: var(--color-red);
    }
`;
