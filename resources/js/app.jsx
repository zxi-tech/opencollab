import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'OpenCollab';

createInertiaApp({
    title: (title) => title ? `${title} - ${appName}` : appName,
    // Ekstensi di bawah ini sudah diubah murni menjadi .jsx
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#D4FF00', // Warna progress bar neon green
    },
});