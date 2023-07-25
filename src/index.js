import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//import { GeojsonProvider } from './components/Api';


const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(
    // <React.StrictMode>
    //     <GeojsonProvider>
            <App />
    //     </GeojsonProvider>
    // </React.StrictMode>
);
