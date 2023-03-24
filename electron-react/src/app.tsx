import * as ReactDOMClient from 'react-dom/client';
import Home from './view/Home';
import "./assets/font.scss";
import "@flaticon/flaticon-uicons/css/all/all";
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

const container = document.getElementById('root');

// Create a root.
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.
root.render(<Home/>);