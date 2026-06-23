import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            // Perhatikan ekstensi di bawah ini sudah berubah menjadi .tsx
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
        }),
        react(), // Daftarkan plugin React di sini
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
});