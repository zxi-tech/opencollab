import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

// Ganti 'TOKEN_THUNDER_CLIENT_KAMU' dengan token Bearer yang masih aktif!
const sanctumToken = '8|HTxvUSGEjdoAurTgQ5CfJB2HsAiBCf1hfwqwwvhv66780bad';

window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 8080,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],

    // TAMBAHKAN BARIS INI AGAR ECHO MASUK LEWAT JALUR API
    authEndpoint: '/api/broadcasting/auth',

    auth: {
        headers: {
            Authorization: `Bearer ${sanctumToken}`
        }
    }
});