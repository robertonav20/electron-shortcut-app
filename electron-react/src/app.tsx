import * as ReactDOMClient from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import Home from './view/Home';
import "@flaticon/flaticon-uicons/css/all/all";
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family:'TitilliumWeb-Regular';
    src: url(${require('./assets/fonts/TitilliumWeb-Regular.ttf')});
  }
  html, body, div, span {
    font-family: 'TitilliumWeb-Regular', serif;
    font-weight: bold;
  }
`;

const container = document.getElementById('root');

// Create a root.
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.
root.render(<><GlobalStyles/><Home/></>);