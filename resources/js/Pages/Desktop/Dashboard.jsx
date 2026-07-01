import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AppLayout>
            <Head title="Dashboard" />
            <div className="p-8">
                <h1 className="text-2xl font-bold">Workspace</h1>
            </div>
        </AppLayout>
    );
}