import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: #313131;
        color: #fff;
        font-family: Sans-Serif;

        #root {
            width: fit-content;
            min-width: 256px;
            margin: auto;
            text-align: center;
        }
    }
`;
