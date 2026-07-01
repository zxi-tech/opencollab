import { Head, Link } from '@inertiajs/react';
import CustomTitlebar from '@/Components/CustomTitlebar';

export default function Login() {
    return (
        <>
            <Head title="Log In - OpenCollab" />

            {/* Background utama aplikasi */}
            <div className="min-h-screen bg-[#050505] text-white flex flex-col pt-8 font-sans relative">

                {/* Memanggil Titlebar kustom */}
                <CustomTitlebar />

                <div className="flex-1 flex flex-col items-center justify-center px-4 w-full h-full pb-10">

                    {/* Header Logo bergaya Zoom */}
                    <div className="mb-8 text-center flex flex-col items-center">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-8 h-8 bg-[#D4FF00] rounded-sm flex items-center justify-center shadow-[0_0_15px_rgba(212,255,0,0.2)]">
                                <div className="w-4 h-4 bg-black" />
                            </div>
                            <span className="text-3xl font-extrabold font-display text-white tracking-tight">OpenCollab</span>
                        </div>
                        <p className="text-gray-500 text-xs font-semibold">workspace.opencollab.app</p>
                    </div>

                    {/* Form Kontainer Utama */}
                    <div className="w-full max-w-[340px] flex flex-col gap-4">

                        {/* Input Email */}
                        <div>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4FF00] focus:ring-1 focus:ring-[#D4FF00] transition-all"
                            />
                        </div>

                        {/* Input Password & Forgot */}
                        <div className="relative">
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4FF00] focus:ring-1 focus:ring-[#D4FF00] transition-all pr-16"
                            />
                            <Link href="/forgot-password" className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400 hover:text-[#D4FF00] transition-colors italic">
                                Forgot?
                            </Link>
                        </div>

                        {/* Tombol Sign In */}
                        <button className="w-full bg-white text-black font-bold py-3 rounded-lg mt-2 hover:bg-gray-200 transition-colors shadow-lg">
                            Sign in
                        </button>

                        {/* Checkbox */}
                        <div className="flex items-center justify-center mt-2 gap-2">
                            <input type="checkbox" id="keepSigned" className="w-4 h-4 accent-[#D4FF00] bg-transparent border-gray-600 rounded cursor-pointer" />
                            <label htmlFor="keepSigned" className="text-xs text-gray-400 cursor-pointer select-none">Keep me signed in</label>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center gap-4 my-4">
                            <div className="flex-1 h-px bg-gray-800"></div>
                            <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">or sign in with</span>
                            <div className="flex-1 h-px bg-gray-800"></div>
                        </div>

                        {/* SSO Buttons */}
                        <div className="flex justify-center gap-6">
                            {[
                                { name: 'SSO', icon: 'M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z' },
                                { name: 'Apple', icon: 'M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V15.33H7.898v-3.33h2.54V9.52c0-2.512 1.491-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.873h2.773l-.443 3.33h-2.33v6.549C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z' },
                                { name: 'Google', icon: 'M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z' },
                                { name: 'Facebook', icon: 'M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V15.33H7.898v-3.33h2.54V9.52c0-2.512 1.491-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.873h2.773l-.443 3.33h-2.33v6.549C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z' }
                            ].map((provider) => (
                                <button key={provider.name} className="flex flex-col items-center gap-2 group">
                                    <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center group-hover:border-white group-hover:bg-white/5 transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors">
                                            <path fillRule="evenodd" d={provider.icon} clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <span className="text-[10px] text-gray-500 group-hover:text-gray-300 font-medium">{provider.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Links Absolute (Kiri dan Kanan Bawah) */}
                <div className="absolute bottom-6 w-full px-8 flex justify-between items-center text-xs font-semibold">
                    <Link href="/register" className="text-[#D4FF00] hover:text-[#bce600] transition-colors">
                        Don't have an account? Sign Up
                    </Link>
                </div>
            </div>
        </>
    );
}