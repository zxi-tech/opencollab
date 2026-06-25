import { useEffect, useState, FormEvent, useRef } from 'react';
import { Head, usePage, router } from '@inertiajs/react';

interface MessagePayload {
    id: number;
    content: string;
    sender: {
        id: number;
        name: string;
    };
}

// 1. Tambahkan Props untuk menerima data dinamis dari Laravel
interface DashboardProps {
    initialMessages?: MessagePayload[];
    currentWorkspaceId: string | number;
    currentChannelId: string | number;
}

export default function Dashboard({ 
    initialMessages = [], 
    currentWorkspaceId, 
    currentChannelId 
}: DashboardProps) {
    
    const { auth } = usePage<any>().props;
    const currentUser = auth?.user;

    const [messages, setMessages] = useState<MessagePayload[]>(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // 2. Memicu ulang state jika user berpindah channel/workspace via URL
    useEffect(() => {
        setMessages(initialMessages);
    }, [initialMessages, currentWorkspaceId, currentChannelId]);

    useEffect(() => {
        // 3. Berlangganan ke Private Channel secara DINAMIS
        const channelName = `workspace.${currentWorkspaceId}.channel.${currentChannelId}`;
        const channel = (window as any).Echo.private(channelName);
        
        channel.listen('MessageSent', (event: MessagePayload) => {
            setMessages((prev) => [...prev, event]);
        });

        return () => {
            channel.stopListening('MessageSent');
        };
    }, [currentWorkspaceId, currentChannelId]); 

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e: FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        // 4. URL POST dikirim secara dinamis sesuai workspace dan channel yang aktif di URL
        router.post(`/workspaces/${currentWorkspaceId}/channels/${currentChannelId}/messages`, {
            content: newMessage
        }, {
            onStart: () => setIsSubmitting(true),
            onSuccess: () => setNewMessage(''),
            onFinish: () => setIsSubmitting(false)
        });
    };

    return (
        <>
            {/* Title Browser Dinamis */}
            <Head title={`Workspace ${currentWorkspaceId} - Channel ${currentChannelId}`} />
            
            <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center justify-center">
                <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 flex flex-col h-[80vh]">
                    
                    {/* Header Dinamis */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shrink-0 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold">OpenCollab Realtime</h1>
                            <p className="text-blue-100 text-sm mt-1">
                                Workspace {currentWorkspaceId} | Channel {currentChannelId}
                            </p>
                        </div>
                        <div className="text-right">
                            <span className="text-xs bg-indigo-500 bg-opacity-50 px-3 py-1 rounded-full border border-indigo-400 block shadow-sm">
                                🟢 {currentUser?.name || 'Guest Mode'}
                            </span>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="p-6 overflow-y-auto bg-gray-50 flex-grow flex flex-col gap-3">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
                                <span className="text-4xl">📭</span>
                                <p className="italic text-sm">Belum ada pesan di Workspace {currentWorkspaceId} Channel {currentChannelId}...</p>
                            </div>
                        ) : (
                            messages.map((msg, idx) => {
                                const isMe = msg.sender?.id === currentUser?.id; 

                                return (
                                    <div 
                                        key={idx} 
                                        className={`p-3 rounded-lg shadow-sm max-w-[75%] ${
                                            isMe 
                                            ? 'bg-indigo-600 text-white self-end rounded-br-none' 
                                            : 'bg-white border border-gray-200 text-gray-800 self-start rounded-bl-none'
                                        }`}
                                    >
                                        {!isMe && (
                                            <span className="text-xs font-bold text-indigo-600 block mb-1">
                                                {msg.sender?.name || 'User'}
                                            </span>
                                        )}
                                        <p className="text-sm leading-relaxed">{msg.content}</p>
                                    </div>
                                );
                            })
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-200 shrink-0">
                        <form onSubmit={handleSendMessage} className="flex gap-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder={`Ketik pesan di Channel ${currentChannelId}...`}
                                disabled={isSubmitting}
                                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100"
                                autoComplete="off"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting || !newMessage.trim()}
                                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm disabled:opacity-50 transition-colors duration-200"
                            >
                                {isSubmitting ? '...' : 'Kirim'}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
}