import './bootstrap';

console.log("Mencoba menyalakan Radio Reverb...");

// Berlangganan ke Private Channel Workspace 2, Channel 2
const channel = window.Echo.private('workspace.2.channel.2');

// Dengarkan event MessageSent
channel.listen('MessageSent', (event) => {
    console.log('🔥 PESAN REALTIME MASUK BUNG!', event);
    alert(`Pesan Baru dari ${event.sender.name}: ${event.content}`);
});