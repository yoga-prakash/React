import App from './App';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

const root = document.getElementById('root');
if (root) {
    createRoot(root).render(
        <StrictMode>
            <App />
        </StrictMode>
    );
} else {
    throw new Error('Root element not found');
};
