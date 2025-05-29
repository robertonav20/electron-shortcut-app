import * as ReactDOMClient from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import Home from './view/Home';

// eslint-disable-next-line import/no-unresolved
import "@flaticon/flaticon-uicons/css/all/all";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family:'TitilliumWeb-Regular';
    src: url(${require('./assets/fonts/TitilliumWeb-Regular.ttf')});
  }
  html, body, * {
    font-family: 'TitilliumWeb-Regular', serif;
    font-weight: bold;
  }
`;

const container = document.getElementById('root');

// @ts-ignore
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.
// @ts-ignore
root.render(<><GlobalStyles/><Home/></>);