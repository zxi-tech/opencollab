import { useEffect, useState } from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window';

export default function CustomTitlebar() {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        // Mendeteksi apakah ini berjalan di dalam aplikasi Tauri atau sekadar Browser biasa
        if (window.__TAURI_INTERNALS__ || window.__TAURI__) {
            setIsDesktop(true);
        }
    }, []);

    // Jika dibuka di browser (Chrome, dll), hilangkan titlebar ini
    if (!isDesktop) return null;

    // Fungsi kontrol jendela
    const handleMinimize = () => getCurrentWindow().minimize();
    const handleMaximize = () => getCurrentWindow().toggleMaximize();
    const handleClose = () => getCurrentWindow().close();

    return (
        <div
            data-tauri-drag-region
            className="h-8 bg-[#050505] flex justify-between items-center fixed top-0 w-full z-[9999] border-b border-white/10 select-none"
        >
            {/* Area Kiri: Logo & Drag Region */}
            <div data-tauri-drag-region className="pl-4 text-[10px] font-bold text-gray-400 font-display tracking-widest uppercase flex items-center h-full w-full">
                OpenCollab
            </div>

            {/* Area Kanan: Tombol Kontrol */}
            <div className="flex h-full">
                <button onClick={handleMinimize} className="h-full px-4 text-gray-400 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center">
                    ─
                </button>
                <button onClick={handleMaximize} className="h-full px-4 text-gray-400 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center">
                    □
                </button>
                <button onClick={handleClose} className="h-full px-4 text-gray-400 hover:text-white hover:bg-red-500 transition-colors flex items-center justify-center">
                    ✕
                </button>
            </div>
        </div>
    );
}