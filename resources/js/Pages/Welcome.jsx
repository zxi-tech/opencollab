import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// DATA STATIS
// ==========================================
const features = [
    { title: "Team Chat", desc: "Realtime communication with channels and direct messages." },
    { title: "Video Meeting", desc: "HD meetings powered by WebRTC." },
    { title: "Project Boards", desc: "Manage tasks and workflows visually." },
    { title: "Native Desktop App", desc: "Lightning-fast client for Windows, macOS, and Linux built with Tauri." } // <-- Tambahan baru yang sangat relevan!
];

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

const faqs = [
    { q: "What makes OpenCollab different from Slack or Teams?", a: "OpenCollab is 100% open-source and self-hosted. You own your data entirely. It unifies high-speed messaging, task boards, and HD video meetings into a single platform, powered by Laravel Reverb for instant updates with lower memory overhead." },
    { q: "Can we integrate our existing development tools?", a: "Yes. OpenCollab natively supports webhooks and deeply integrates with GitHub, GitLab, Jira, and most major CI/CD environments out of the box." },
    { q: "Is our team data secure on your infrastructure?", a: "Absolutely. We employ enterprise-grade TLS 1.3 encryption for data in transit and AES-256 at rest, paired with customizable private channel permissions." }
];

export default function Welcome() {
    const [activeCard, setActiveCard] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);

    // Animasi Hero 3D bawaan
    const fadeInUp3D = {
        hidden: { opacity: 0, y: 40, rotateX: -15 },
        visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <>
            <Head title="OpenCollab - Unified Workspace" />

            <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative font-sans [perspective:1000px]">

                {/* Background Video Globe */}
                <div className="absolute top-[-5%] md:top-[0%] left-1/2 -translate-x-1/2 w-full max-w-[900px] aspect-square opacity-30 pointer-events-none flex items-center justify-center mix-blend-screen z-0">
                    <video
                        autoPlay loop muted playsInline preload="metadata"
                        className="w-full h-full object-cover"
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
                    initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative z-50 flex items-center justify-between px-6 md:px-8 py-6 max-w-7xl mx-auto backdrop-blur-sm bg-black/10"
                >
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-[#D4FF00] rounded-sm flex items-center justify-center shadow-[0_0_15px_rgba(212,255,0,0.4)]">
                            <div className="w-3 h-3 bg-black"></div>
                        </div>
                        <span className="text-2xl font-extrabold tracking-tight font-display text-white">OpenCollab.</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm text-gray-300 font-medium absolute left-1/2 -translate-x-1/2">
                        <Link href="#" className="hover:text-white hover:shadow-[0_4px_0_-2px_#D4FF00] transition-all pb-1">Product ▾</Link>
                        <Link href="#" className="hover:text-white hover:shadow-[0_4px_0_-2px_#D4FF00] transition-all pb-1">Documentation</Link>
                        <Link href="#" className="hover:text-white hover:shadow-[0_4px_0_-2px_#D4FF00] transition-all pb-1">Community</Link>
                        <Link href="#" className="hover:text-white hover:shadow-[0_4px_0_-2px_#D4FF00] transition-all pb-1">Contribute</Link>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <Link href="#" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white bg-white/5 border border-white/10 rounded-full transition">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                            Download
                        </Link>
                        <div className="w-px h-5 bg-gray-700"></div>
                        <Link href="/login" className="px-5 py-2 text-sm font-semibold border border-gray-600 bg-transparent text-white rounded-full hover:bg-white hover:text-black transition">
                            Log In
                        </Link>
                    </div>

                    {/* Mobile Hamburger */}
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="flex md:hidden flex-col justify-center items-center gap-1.5 w-6 h-6 z-50 bg-transparent border-none cursor-pointer">
                        <span className={`h-0.5 w-6 bg-white rounded-full transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`h-0.5 w-6 bg-white rounded-full transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`h-0.5 w-6 bg-white rounded-full transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </motion.nav>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div initial={{ opacity: 0, y: -20, rotateX: 30 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} exit={{ opacity: 0, y: -20, rotateX: 30 }} className="fixed inset-0 bg-black/95 z-40 flex flex-col justify-center items-center gap-8 text-xl font-bold md:hidden" style={{ transformOrigin: 'top' }}>
                            {/* Sesuaikan dengan jalur Open-Source */}
                            <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#D4FF00]">Documentation</Link>
                            <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#D4FF00]">Community</Link>
                            <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#D4FF00]">Contribute</Link>

                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="px-8 py-3 border border-white/20 rounded-full w-48 text-center">Log In</Link>
                            <Link href="/register" onClick={() => setIsMobileMenuOpen(false)} className="px-8 py-3 bg-[#D4FF00] text-black rounded-full w-48 text-center">Sign Up</Link>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Hero Section */}
                <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-20 pb-16 [transform-style:preserve-3d]">
                    <motion.div initial="hidden" animate="visible" variants={fadeInUp3D} className="mb-8 px-4 py-1.5 border border-gray-700/50 rounded-full bg-black/60 backdrop-blur-md flex items-center gap-2 text-xs font-semibold text-gray-200 shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse shadow-[0_0_8px_#D4FF00]"></span>
                        Introducing OpenCollab Realtime Engine
                    </motion.div>

                    <motion.h1 initial="hidden" animate="visible" variants={fadeInUp3D} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-5xl leading-tight text-white pb-2 font-display">
                        Unify your entire team in <br /> one seamless workspace
                    </motion.h1>

                    <motion.p initial="hidden" animate="visible" variants={fadeInUp3D} transition={{ delay: 0.2 }} className="mt-6 text-gray-300 max-w-2xl text-sm md:text-lg leading-relaxed font-medium">
                        The open-source, all-in-one platform that brings meetings, fast messaging, and deep collaboration together. Own your workspace, keep your projects moving, and your people connected.
                    </motion.p>

                    <motion.div initial="hidden" animate="visible" variants={fadeInUp3D} transition={{ delay: 0.3 }} className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                        <Link href="/register" className="px-8 py-3.5 text-sm font-bold bg-[#D4FF00] text-black rounded-full hover:bg-[#bce600] hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,255,0,0.4)]">
                            → Start Collaborating
                        </Link>
                        <a
                            href="https://github.com/zxi-tech/opencollab"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-8 py-3.5 text-sm font-semibold bg-white/10 text-white border border-white/20 rounded-full hover:bg-white/20 transition backdrop-blur-md"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                            </svg>
                            View GitHub
                        </a>
                    </motion.div>
                </main>

                {/* Tech Stack */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }} className="relative z-10 mt-12 pb-24 flex flex-col items-center">
                    <p className="text-xs text-gray-400 mb-6 uppercase tracking-widest font-display font-semibold">Powered by Modern Tech Stack</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-80">
                        <div className="text-lg md:text-xl font-bold font-display flex items-center gap-2 hover:opacity-100 hover:text-white transition">
                            <span className="text-2xl text-[#FF2D20]">♦</span> Laravel Reverb
                        </div>
                        <div className="text-lg md:text-xl font-bold font-display flex items-center gap-2 hover:opacity-100 hover:text-white transition">
                            <span className="text-2xl text-[#61DAFB]">⚛</span> React.js
                        </div>
                        <div className="text-lg md:text-xl font-bold font-display flex items-center gap-2 hover:opacity-100 hover:text-white transition">
                            <span className="text-2xl text-[#38B2AC]">≈</span> Tailwind CSS
                        </div>
                    </div>
                </motion.div>

                {/* 3 Columns Features Static (KEMBALI KE VERSI ASLI TANPA 3D) */}
                <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-20 border-t border-white/10">
                    <div className="text-center mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                            className="text-4xl md:text-5xl font-extrabold text-white font-display leading-tight"
                        >
                            Realtime collaboration <br className="hidden md:block" /> is all you need
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {/* Kolom 01 */}
                        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="flex flex-col p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors relative overflow-hidden group min-h-[350px]">
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
                        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors relative overflow-hidden group min-h-[350px]">
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
                        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] transition-colors relative overflow-hidden group min-h-[350px]">
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

                {/* Grid Feature Grid - ADDED 3D HOVER */}
                <section className="border-t border-white/10 py-24 bg-transparent [perspective:1000px]">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl font-bold font-display">Everything your team needs</h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 [transform-style:preserve-3d]">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05, rotateX: 10, rotateY: -10, z: 10 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#D4FF00]/30 hover:bg-white/[0.06] transition-colors shadow-lg cursor-pointer"
                                >
                                    <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
                                    <p className="text-gray-400">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Accordion Hover Testimonials */}
                <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pb-32 pt-10 border-t border-white/10">
                    <div className="text-center mb-16 mt-10">
                        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-bold text-white font-display mb-4">
                            Teams achieve more <br className="hidden md:block" /> with OpenCollab
                        </motion.h2>
                    </div>

                    <div className="flex flex-col md:flex-row h-[600px] md:h-[450px] w-full gap-3">
                        {testimonials.map((item, index) => (
                            <div
                                key={item.id} onMouseEnter={() => setActiveCard(index)}
                                className={`relative rounded-3xl overflow-hidden transition-all duration-700 ease-in-out flex flex-col justify-end p-6 md:p-10 border border-white/10 ${activeCard === index ? 'flex-[5] md:flex-[7] bg-[#111] shadow-[0_0_30px_rgba(255,255,255,0.05)]' : 'flex-[1] bg-black hover:bg-[#1a1a1a] items-center md:items-start'}`}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#050505] to-black transition-opacity duration-700 ${activeCard === index ? 'opacity-100' : 'opacity-40'}`}></div>
                                <div className={`absolute inset-0 flex md:items-center justify-center transition-opacity duration-300 ${activeCard === index ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-300'}`}>
                                    <h3 className="text-gray-500 font-display font-bold text-sm md:-rotate-90 whitespace-nowrap tracking-widest uppercase">{item.company}</h3>
                                </div>
                                <div className={`relative z-10 transition-all duration-500 flex flex-col justify-end h-full w-full ${activeCard === index ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-10 pointer-events-none absolute bottom-6'}`}>
                                    <div className="flex items-center gap-3 mb-6 md:mb-10">
                                        <div className="w-8 h-8 bg-[#D4FF00] rounded-sm flex items-center justify-center"><div className="w-4 h-4 bg-black" /></div>
                                        <span className="text-xl font-bold font-display text-white tracking-tight">{item.company}.</span>
                                    </div>
                                    <h3 className="text-2xl md:text-4xl font-bold text-white font-display mb-4 leading-tight">{item.headline}</h3>
                                    <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-xl italic">"{item.quote}"</p>
                                    <div className="flex items-center justify-between mt-auto border-t border-white/10 pt-6">
                                        <p className="text-white text-sm font-semibold">— {item.author}</p>
                                        <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform"><span className="font-bold text-lg">↗</span></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ Section - ADDED 3D FOLD HINGE EFFECT */}
                <section className="border-t border-white/10 py-24 max-w-4xl mx-auto px-6 [perspective:1000px]">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold font-display">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                layout
                                className="border border-white/10 bg-white/[0.03] rounded-2xl overflow-hidden shadow-lg"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-6 text-left flex justify-between items-center font-bold text-sm md:text-base hover:bg-white/[0.05] z-10 relative">
                                    <span>{faq.q}</span>
                                    <motion.span
                                        animate={{ rotate: openFaq === i ? 45 : 0 }}
                                        className="text-xl font-light"
                                    >
                                        +
                                    </motion.span>
                                </button>
                                <AnimatePresence initial={false}>
                                    {openFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0, rotateX: -90 }}
                                            animate={{ height: 'auto', opacity: 1, rotateX: 0 }}
                                            exit={{ height: 0, opacity: 0, rotateX: -90 }}
                                            transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                                            style={{ transformOrigin: 'top' }}
                                        >
                                            <p className="p-6 pt-0 text-sm text-gray-400 leading-relaxed border-t border-white/5 bg-black/20">
                                                {faq.a}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Final Conversion CTA - ADDED 3D POP-OUT ENTRANCE */}
                <section className="relative py-32 border-t border-white/10 overflow-hidden [perspective:1000px]">
                    <div className="absolute w-[500px] h-[500px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full bg-[#D4FF00]/5 blur-[120px] pointer-events-none" />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotateX: 40, y: 50 }}
                        whileInView={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                        className="flex flex-col items-center justify-center text-center px-4 relative z-10"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight font-display mb-6 max-w-3xl drop-shadow-2xl">
                            Ready to transform how your team works?
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base max-w-xl mb-10">
                            Join thousands of engineers, designers, and project managers building on OpenCollab.
                        </p>

                        <motion.div whileHover={{ scale: 1.1, translateZ: 30 }} transition={{ type: 'spring', stiffness: 400 }}>
                            <Link href="/register" className="px-10 py-4 text-sm font-bold bg-[#D4FF00] text-black rounded-full hover:bg-[#bce600] transition-all shadow-[0_0_40px_rgba(212,255,0,0.4)] inline-block">
                                Get Started for Free
                            </Link>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Footer */}
                <footer className="relative z-10 bg-black text-white pt-20 overflow-hidden border-t border-white/10">
                    <div className="absolute top-0 right-0 w-[800px] h-full z-0 opacity-40 translate-x-32 translate-y-10 pointer-events-none">
                        <video
                            autoPlay loop muted playsInline preload="metadata"
                            className="w-full h-full object-contain"
                        >
                            <source src="assets/earth-2.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pb-16 grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#D4FF00] rounded-sm flex items-center justify-center"><div className="w-4 h-4 bg-black" /></div>
                                <span className="text-2xl font-bold font-display">OpenCollab.</span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                                Empowering teams with realtime collaboration, messaging, meetings and project management in one unified workspace.
                            </p>
                            <div className="flex gap-4 text-xl text-gray-500">
                                <Link href="#" aria-label="X (Twitter)" className="hover:text-white transition">X</Link>
                                <Link href="#" aria-label="LinkedIn" className="hover:text-white transition">In</Link>
                                <Link href="#" aria-label="Instagram" className="hover:text-white transition">Ig</Link>
                                <Link href="#" aria-label="GitHub" className="hover:text-white transition">Gh</Link>
                            </div>
                            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="mt-4 border border-white/20 px-6 py-3 text-xs font-bold hover:bg-white hover:text-black transition w-fit">
                                ↑ BACK TO TOP
                            </button>
                        </div>

                        <div>
                            <h4 className="font-bold mb-8 uppercase tracking-widest text-sm text-gray-500">Site Map</h4>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li><Link href="/" className="hover:text-[#D4FF00] transition">Homepage</Link></li>
                                <li><Link href="#" className="hover:text-[#D4FF00] transition">Technology</Link></li>
                                <li><Link href="#" className="hover:text-[#D4FF00] transition">Features</Link></li>
                                <li><Link href="#" className="hover:text-[#D4FF00] transition">Resources</Link></li>
                                <li><Link href="#" className="hover:text-[#D4FF00] transition">Careers</Link></li>
                                <li><Link href="#" className="hover:text-[#D4FF00] transition">Contact Us</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-8 uppercase tracking-widest text-sm text-gray-500">Legal</h4>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li><Link href="#" className="hover:text-[#D4FF00] transition">Privacy Policy</Link></li>
                                <li><Link href="#" className="hover:text-[#D4FF00] transition">Terms of Service</Link></li>
                                <li><Link href="#" className="hover:text-[#D4FF00] transition">Cookies Policy</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="relative z-10 bg-[#D4FF00] text-black text-center py-4 text-xs font-bold uppercase tracking-wider">
                        Copyright © {new Date().getFullYear()} OpenCollab. All Rights Reserved.
                    </div>
                </footer>
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#050505] to-transparent z-0 pointer-events-none" />
            </div>
        </>
    );
}