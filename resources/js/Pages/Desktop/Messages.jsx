import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { Search } from 'lucide-react';

export default function Messages() {
    return (
        <AppLayout>
            <Head title="Messages" />

            <div className="flex h-full bg-white">
                {/* Kolom Daftar Pesan */}
                <section className="w-96 border-r border-gray-100 flex flex-col p-4 bg-white">
                    <h1 className="text-xl font-bold mb-4">Messages</h1>

                    {/* Search Bar */}
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search or start a new chat"
                            className="w-full bg-gray-100 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none"
                        />
                    </div>

                    {/* Filter tanpa tombol + */}
                    <div className="flex gap-2 mb-4">
                        {['All', 'Favourites', 'Groups', 'Archived'].map((filter) => (
                            <button key={filter} className="px-3 py-1 bg-gray-100 rounded-full text-xs hover:bg-indigo-100 transition-colors">
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Placeholder Daftar Pesan */}
                    <div className="flex-1 overflow-y-auto">
                        <p className="text-sm text-gray-400 text-center mt-10">No messages yet.</p>
                    </div>
                </section>

                {/* Area Chat */}
                <main className="flex-1 p-8 flex items-center justify-center bg-white">
                    <p className="text-gray-500">Select a message to start chatting</p>
                </main>
            </div>
        </AppLayout>
    );
}