import { createGlobalStyle } from 'styled-components';

const bg = require('../images/background.jpg');

export default createGlobalStyle`
    :root {
        /* Layout */
        --container-max-width: 1200px;
        
        /* Colors */
        --color-primary: #fddb87;
        --color-primary-highlight: #efba5b;
        --color-red: #ed3124;
        --color-blue: #128ca0;
        --color-opaque-grey: rgba(100, 100, 100, 0.5);
    }

    /* Reset */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    /* Background */
    body {
        background: url(${bg});
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-position: bottom;
    }
`;
