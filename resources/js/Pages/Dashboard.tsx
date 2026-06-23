import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';

interface MessagePayload {
    id: number;
    content: string;
    sender: {
        id: number;
        name: string;
    };
}

export default function Dashboard() {
    const [messages, setMessages] = useState<MessagePayload[]>([]);

    useEffect(() => {
        console.log("Radio Reverb aktif di React SPA!");

        // Berlangganan ke Private Channel
        const channel = (window as any).Echo.private('workspace.2.channel.2');

        channel.listen('MessageSent', (event: MessagePayload) => {
            console.log('🔥 PESAN REALTIME MASUK!', event);
            setMessages((prev) => [...prev, event]);
        });

        return () => {
            channel.stopListening('MessageSent');
        };
    }, []);

    return (
        <>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center justify-center">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                        <h1 className="text-2xl font-bold">OpenCollab Realtime</h1>
                        <p className="text-blue-100 text-sm mt-1">Workspace 2 | Channel 2</p>
                    </div>

                    <div className="p-6 h-96 overflow-y-auto bg-gray-50 flex flex-col gap-3">
                        {messages.length === 0 ? (
                            <p className="text-center text-gray-400 mt-10">Menunggu pesan dari Thunder Client...</p>
                        ) : (
                            messages.map((msg, idx) => (
                                <div key={idx} className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 max-w-md self-start">
                                    <span className="text-xs font-bold text-indigo-600 block mb-1">
                                        {msg.sender?.name || 'User'}
                                    </span>
                                    <p className="text-sm text-gray-800">{msg.content}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}