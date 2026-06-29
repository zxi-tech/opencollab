import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Welcome() {
    // State untuk melacak kartu testimonial mana yang sedang di-hover
    const [activeCard, setActiveCard] = useState(0);

    const fadeInUp3D = {
        hidden: { opacity: 0, y: 40, rotateX: -10 },
        visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    // Data Testimonial/Use Case untuk Accordion di bawah
    // Ganti data testimonials dengan ini:
    const testimonials = [
        {
            id: 1,
            company: "Realtime",
            headline: "Instant synchronization across all channels",
            quote: "Built with Laravel Reverb to ensure every message, file, and update is delivered instantly without page refreshes. Experience true speed in your daily communication.",
            author: "Ultra-Fast Engine"
        },
        {
            id: 2,
            company: "Workspace",
            headline: "Everything you need in one unified hub",
            quote: "No more switching between apps. Combine your project tasks, team chats, and documentation into a single, cohesive environment designed for deep focus.",
            author: "All-in-One Platform"
        },
        {
            id: 3,
            company: "Security",
            headline: "Enterprise-grade protection for your data",
            quote: "Your collaboration is your asset. We prioritize security with robust authentication and private channels, ensuring your creative work remains yours alone.",
            author: "Privacy First"
        }
    ];

    return (
        <>
            <Head title="OpenCollab - Unified Workspace" />

            <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative font-sans perspective-1000">

                {/* 1. Latar Belakang Video Globe */}
                <div className="absolute top-[-5%] md:top-[0%] left-1/2 -translate-x-1/2 w-full max-w-[900px] aspect-square opacity-40 pointer-events-none flex items-center justify-center mix-blend-screen">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover -translate-x-8"
                        style={{
                            transform: 'translateX(-30px)',
                            maskImage: 'radial-gradient(circle, black 50%, transparent 70%)',
                            WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 70%)'
                        }}
                    >
                        <source src="/assets/earth.mp4" type="video/mp4" />
                    </video>
                </div>

                {/* Navbar */}
                <motion.nav
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto"
                >
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-[#D4FF00] rounded-sm flex items-center justify-center shadow-[0_0_15px_rgba(212,255,0,0.4)]">
                            <div className="w-3 h-3 bg-black"></div>
                        </div>
                        <span className="text-2xl font-extrabold tracking-tight font-display text-white">
                            OpenCollab.
                        </span>
                    </div>

                    {/* Menu Tengah */}
                    <div className="hidden md:flex items-center gap-8 text-sm text-gray-300 font-medium absolute left-1/2 -translate-x-1/2">
                        <Link href="#" className="hover:text-white hover:shadow-[0_4px_0_-2px_#D4FF00] transition-all pb-1">
                            Product ▾
                        </Link>
                        <Link href="#" className="hover:text-white transition pb-1">
                            Solutions
                        </Link>
                        <Link href="#" className="hover:text-white transition pb-1">
                            Resources
                        </Link>
                        <Link href="#" className="hover:text-white transition pb-1">
                            Pricing
                        </Link>
                    </div>

                    {/* Login */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/login"
                            className="px-5 py-2 text-sm font-semibold border border-gray-600 bg-transparent text-white rounded-full hover:bg-white hover:text-black transition"
                        >
                            Log In
                        </Link>
                    </div>
                </motion.nav>

                {/* Hero Section */}
                <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-20 pb-16">

                    <motion.div
                        initial="hidden" animate="visible" variants={fadeInUp3D}
                        className="mb-8 px-4 py-1.5 border border-gray-700/50 rounded-full bg-black/60 backdrop-blur-md flex items-center gap-2 text-xs font-semibold text-gray-200 shadow-lg"
                    >
                        <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse shadow-[0_0_8px_#D4FF00]"></span>
                        Introducing OpenCollab Realtime Engine
                    </motion.div>

                    <motion.h1
                        initial="hidden" animate="visible" variants={fadeInUp3D} transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-5xl leading-tight text-white drop-shadow-2xl pb-2 font-display"
                    >
                        Unify your entire team in <br /> one seamless workspace
                    </motion.h1>

                    <motion.p
                        initial="hidden" animate="visible" variants={fadeInUp3D} transition={{ delay: 0.2 }}
                        className="mt-6 text-gray-200 max-w-2xl text-sm md:text-lg leading-relaxed font-medium drop-shadow-md"
                    >
                        The all-in-one platform that brings meetings, fast messaging, and deep collaboration together. Keep your projects moving and your people connected.
                    </motion.p>

                    <motion.div
                        initial="hidden" animate="visible" variants={fadeInUp3D} transition={{ delay: 0.3 }}
                        className="mt-10 flex flex-col sm:flex-row items-center gap-4"
                    >
                        <Link
                            href="/register"
                            className="px-8 py-3.5 text-sm font-bold bg-[#D4FF00] text-black rounded-full hover:bg-[#bce600] hover:scale-105 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(212,255,0,0.4)]"
                        >
                            <span>→</span> Start Collaborating
                        </Link>
                        <Link
                            href="#"
                            className="px-8 py-3.5 text-sm font-semibold bg-white/10 text-white border border-white/20 rounded-full hover:bg-white/20 transition backdrop-blur-md"
                        >
                            Book a Demo
                        </Link>
                    </motion.div>
                </main>

                {/* Tech Stack Showcase */}
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
                    className="relative z-10 mt-12 pb-24 flex flex-col items-center"
                >
                    <p className="text-xs text-gray-400 mb-6 uppercase tracking-widest font-display font-semibold">
                        Powered by Modern Tech Stack
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-80">
                        <div className="text-lg md:text-xl font-bold font-display flex items-center gap-2 hover:opacity-100 hover:text-white transition cursor-default">
                            <span className="text-2xl text-[#FF2D20]">♦</span> Laravel Reverb
                        </div>
                        <div className="text-lg md:text-xl font-bold font-display flex items-center gap-2 hover:opacity-100 hover:text-white transition cursor-default">
                            <span className="text-2xl text-[#61DAFB]">⚛</span> React.js
                        </div>
                        <div className="text-lg md:text-xl font-bold font-display flex items-center gap-2 hover:opacity-100 hover:text-white transition cursor-default">
                            <span className="text-2xl text-[#38B2AC]">≈</span> Tailwind CSS
                        </div>
                    </div>
                </motion.div>

                {/* ========================================= */}
                {/* 3 KOLOM FITUR STATIS (TETAP DIPERTAHANKAN) */}
                {/* ========================================= */}
                <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-20 border-t border-white/10">
                    <div className="text-center mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-5xl font-extrabold text-white font-display leading-tight"
                        >
                            Realtime collaboration <br className="hidden md:block" /> is all you need
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {/* Kolom 01 */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="flex flex-col p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors relative overflow-hidden group min-h-[350px]"
                        >
                            <div className="text-[#D4FF00] text-sm font-bold tracking-widest mb-6 font-display">. 01</div>
                            <h3 className="text-2xl font-bold text-white font-display mb-4">Offline & Online Chat</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8">
                                Test your team's workflow with our bleeding-edge realtime engine. Communicate seamlessly whether you are online or returning from offline.
                            </p>
                            <div className="mt-auto flex justify-end">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#111] via-gray-600 to-gray-300 opacity-60 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.8)]"></div>
                            </div>
                        </motion.div>

                        {/* Kolom 02 */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-col p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors relative overflow-hidden group min-h-[350px]"
                        >
                            <div className="text-[#D4FF00] text-sm font-bold tracking-widest mb-6 font-display">. 02</div>
                            <h3 className="text-2xl font-bold text-white font-display mb-4">Integrate with CI</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8">
                                Understand how changes to your projects, channels, or strategies impact your app before they hit production. Ship fast and with confidence.
                            </p>
                            <div className="mt-auto flex justify-end relative">
                                <div className="absolute right-6 bottom-4 w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg rotate-12 z-10 group-hover:rotate-45 transition-transform duration-500"></div>
                                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#111] via-gray-600 to-gray-300 opacity-60 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.8)]"></div>
                            </div>
                        </motion.div>

                        {/* Kolom 03 */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors relative overflow-hidden group min-h-[350px]"
                        >
                            <div className="text-[#D4FF00] text-sm font-bold tracking-widest mb-6 font-display">. 03</div>
                            <h3 className="text-2xl font-bold text-white font-display mb-4">Live Workspaces</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8">
                                Monitor your team's application in production to spot problems or drift. Learn from user interactions to enter the virtuous cycle of active learning.
                            </p>
                            <div className="mt-auto flex justify-end relative">
                                <div className="absolute right-[-10px] bottom-8 w-28 h-8 border-[3px] border-white/40 rounded-[50%] -rotate-12 z-10 group-hover:scale-110 transition-transform duration-500"></div>
                                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#111] via-gray-600 to-gray-300 opacity-60 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.8)]"></div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ========================================= */}
                {/* ACCORDION HOVER (Pengganti area CTA Lama) */}
                {/* ========================================= */}
                <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pb-32 pt-10 border-t border-white/10">

                    <div className="text-center mb-16 mt-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-5xl font-bold text-white font-display mb-4"
                        >
                            Teams achieve more <br className="hidden md:block" /> with OpenCollab
                        </motion.h2>
                    </div>

                    {/* Container Horizontal Accordion */}
                    <div className="flex flex-col md:flex-row h-[600px] md:h-[450px] w-full gap-3">
                        {testimonials.map((item, index) => (
                            <div
                                key={item.id}
                                onMouseEnter={() => setActiveCard(index)}
                                className={`relative rounded-3xl overflow-hidden transition-all duration-700 ease-in-out cursor-pointer flex flex-col justify-end p-6 md:p-10 border border-white/10 ${activeCard === index
                                    ? 'flex-[5] md:flex-[7] bg-[#111] shadow-[0_0_30px_rgba(255,255,255,0.05)]'
                                    : 'flex-[1] bg-black hover:bg-[#1a1a1a] items-center md:items-start'
                                    }`}
                            >
                                {/* Gradient Visual Latar Belakang */}
                                <div className={`absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#050505] to-black transition-opacity duration-700 ${activeCard === index ? 'opacity-100' : 'opacity-40'}`}></div>

                                {/* Teks Vertikal (Muncul saat Kartu Mengecil) */}
                                <div className={`absolute inset-0 flex md:items-center justify-center transition-opacity duration-300 ${activeCard === index ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-300'}`}>
                                    <h3 className="text-gray-500 font-display font-bold text-sm md:-rotate-90 whitespace-nowrap tracking-widest uppercase">
                                        {item.company}
                                    </h3>
                                </div>

                                {/* Konten Utama (Muncul saat Kartu Membesar) */}
                                <div className={`relative z-10 transition-all duration-500 flex flex-col justify-end h-full w-full ${activeCard === index ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-10 pointer-events-none absolute bottom-6'}`}>

                                    <div className="flex items-center gap-3 mb-6 md:mb-10">
                                        <div className="w-8 h-8 bg-[#D4FF00] rounded-sm flex items-center justify-center">
                                            <div className="w-4 h-4 bg-black"></div>
                                        </div>
                                        <span className="text-xl font-bold font-display text-white tracking-tight">{item.company}.</span>
                                    </div>

                                    <h3 className="text-2xl md:text-4xl font-bold text-white font-display mb-4 leading-tight">
                                        {item.headline}
                                    </h3>

                                    <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-xl italic">
                                        "{item.quote}"
                                    </p>

                                    <div className="flex items-center justify-between mt-auto border-t border-white/10 pt-6">
                                        <p className="text-white text-sm font-semibold">
                                            — {item.author}
                                        </p>

                                        {/* Ikon panah seperti di gambar referensi Zoom */}
                                        <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
                                            <span className="font-bold text-lg">↗</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="relative z-10 bg-black text-white pt-20 overflow-hidden">
                    {/* Video sebagai Background dengan efek Overflow */}
                    {/* Kita geser ke kanan dengan translate-x-20 dan perbesar agar lebih megah */}
                    <div className="absolute top-0 right-0 w-[800px] h-full z-0 opacity-50 translate-x-32 translate-y-10">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-contain"
                        >
                            <source src="assets/earth-2.mp4" type="video/mp4" />
                        </video>
                        {/* Gradasi lembut agar globe tidak terpotong tajam di sisi kiri */}
                        <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent"></div>
                    </div>

                    {/* Konten Footer */}
                    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pb-16 grid grid-cols-1 md:grid-cols-3 gap-12">

                        {/* Kolom 1: Branding & Sosmed */}
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#D4FF00] rounded-sm flex items-center justify-center">
                                    <div className="w-4 h-4 bg-black"></div>
                                </div>
                                <span className="text-2xl font-bold font-display">OpenCollab.</span>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                                Empowering teams with realtime collaboration, messaging, meetings and project management in one unified workspace.
                            </p>
                            <div className="flex gap-4 text-xl text-gray-400">
                                <Link href="#" className="hover:text-white transition">X</Link>
                                <Link href="#" className="hover:text-white transition">In</Link>
                                <Link href="#" className="hover:text-white transition">Ig</Link>
                                <Link href="#" className="hover:text-white transition">Gh</Link>
                            </div>
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="mt-4 border border-white/20 px-6 py-3 text-xs font-bold hover:bg-white hover:text-black transition w-fit"
                            >
                                ↑ BACK TO TOP
                            </button>
                        </div>

                        {/* Kolom 2: Site Map */}
                        <div>
                            <h4 className="font-bold mb-8 uppercase tracking-widest text-sm text-gray-500">Site Map</h4>
                            <ul className="space-y-4 text-gray-300 text-sm">
                                <li><Link href="/" className="hover:text-[#D4FF00] transition">Homepage</Link></li>
                                <li><Link href="#" className="hover:text-[#D4FF00] transition">Technology</Link></li>
                                <li><Link href="#" className="hover:text-[#D4FF00] transition">Features</Link></li>
                                <li><Link href="#" className="hover:text-[#D4FF00] transition">Resources</Link></li>
                                <li><Link href="#" className="hover:text-[#D4FF00] transition">Careers</Link></li>
                                <li><Link href="#" className="hover:text-[#D4FF00] transition">Contact Us</Link></li>
                            </ul>
                        </div>

                        {/* Kolom 3: Legal */}
                        <div>
                            <h4 className="font-bold mb-8 uppercase tracking-widest text-sm text-gray-500">Legal</h4>
                            <ul className="space-y-4 text-gray-300 text-sm">
                                <li><Link href="#" className="hover:text-[#D4FF00] transition">Privacy Policy</Link></li>
                                <li><Link href="#" className="hover:text-[#D4FF00] transition">Terms of Service</Link></li>
                                <li><Link href="#" className="hover:text-[#D4FF00] transition">Cookies Policy</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="relative z-10 bg-[#D4FF00] text-black text-center py-4 text-xs font-bold uppercase tracking-wider">
                        Copyright © {new Date().getFullYear()} OpenCollab. All Rights Reserved.
                    </div>
                </footer>
                {/* Gradasi Bawah agar menyatu dengan latar */}
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#050505] to-transparent z-0 pointer-events-none"></div>
            </div>
        </>
    );
}