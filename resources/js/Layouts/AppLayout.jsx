import { Link } from '@inertiajs/react';
import { LayoutDashboard, MessageSquare, Video, Building2, Calendar, Settings } from 'lucide-react';

export default function AppLayout({ children }) {
    const topNav = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { name: 'Messages', icon: MessageSquare, path: '/messages' },
        { name: 'Meetings', icon: Video, path: '/meetings' },
        { name: 'Workspace', icon: Building2, path: '/workspace' },
        { name: 'Calendar', icon: Calendar, path: '/calendar' },
    ];

    return (
        <div className="flex h-screen bg-white text-gray-900 font-sans overflow-hidden">
            {/* Sidebar Tetap Ada */}
            <aside className="w-16 bg-gray-50 flex flex-col items-center py-4 relative border-r border-gray-100 shrink-0">
                <div className="flex flex-col gap-4">
                    {topNav.map((item) => (
                        <Link
                            key={item.name}
                            href={item.path}
                            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-gray-200 rounded-lg transition-all"
                        >
                            <item.icon size={18} />
                        </Link>
                    ))}
                </div>

                <div className="absolute bottom-6 left-2 bg-white p-3 rounded-2xl border border-gray-200 shadow-xl flex items-center gap-3 w-48">
                    <div className="w-9 h-9 rounded-full bg-gray-300 flex-shrink-0" />
                    <div className="flex flex-col truncate">
                        <span className="text-xs font-bold text-gray-900">Timoti</span>
                        <span className="text-[10px] text-gray-500">Online</span>
                    </div>
                </div>
            </aside>

            {/* Content Halaman (Dashboard/Messages/Dll) akan masuk di sini */}
            <main className="flex-1 overflow-hidden">
                {children}
            </main>
        </div>
    );
}