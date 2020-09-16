import {createGlobalStyle} from 'styled-components'

export default createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
}

/* html ,body, #root {
    min-height: 100%;
} */

body {
    background: #312E38;
    color: #FFF;
    -webkit-font-smoothing: antialiased !important;
}

    body, input, button {
        font-family: 'Roboto Slab' sans-serif;
        font-size: 16px;
    }

    button {
        cursor: pointer;
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 500;
    }

    
`