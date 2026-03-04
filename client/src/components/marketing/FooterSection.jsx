import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Linkedin, Instagram, Twitter } from 'lucide-react';
import Logo from '@/assets/Logo';

/* ─────────────────────────────────────────
   Footer link columns — Todoify adapted
───────────────────────────────────────── */
const columns = [
    {
        heading: 'Features',
        links: [
            { label: 'How It Works', href: '/how-it-works' },
            { label: 'For Teams', href: '/teams' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'Habit Tracking', href: '/features/habit-tracking' },
            { label: 'Templates', href: '/templates' },
        ],
    },
    {
        heading: 'Resources',
        links: [
            { label: 'Help Center', href: '/resources/help' },
            { label: 'Productivity Tips', href: '/resources/methods' },
            { label: 'Integrations', href: '/resources/integrations' },
            { label: 'Customer Stories', href: '/resources/stories' },
            { label: 'Developer API', href: '/developers' },
            { label: 'Status', href: '/status' },
        ],
    },
    {
        heading: 'Company',
        links: [
            { label: 'About Us', href: '/about' },
            { label: 'Careers', href: '/careers' },
            { label: 'Blog', href: '/blog' },
            { label: 'Press', href: '/press' },
        ],
    },
];

const socials = [
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
];

const FooterSection = () => {
    return (
        <footer style={{ backgroundColor: 'var(--background)', fontFamily: 'var(--font-sans)' }}>

            {/* ── Top border ── */}
            <div
                className="w-full h-px"
                style={{ backgroundColor: 'var(--border)' }}
            />

            {/* ── Main grid ── */}
            <div className="max-w-[1280px] mx-auto px-6 lg:px-16 py-14 grid grid-cols-1 lg:grid-cols-[1.4fr_repeat(3,1fr)_auto] gap-12">

                {/* ── Brand column ── */}
                <div className="flex flex-col gap-4">
                    <Logo size="w-32" />
                    <p
                        className="text-sm leading-relaxed max-w-[240px]"
                        style={{ color: 'var(--muted-foreground)' }}
                    >
                        Join thousands of people who organize
                        work and life with{' '}
                        <span
                            className="font-semibold"
                            style={{ color: 'var(--foreground)' }}
                        >
                            Todoify
                        </span>.
                    </p>
                </div>

                {/* ── Link columns ── */}
                {columns.map((col) => (
                    <div key={col.heading} className="flex flex-col gap-4">
                        <h3
                            className="text-sm font-black tracking-wide"
                            style={{ color: 'var(--foreground)' }}
                        >
                            {col.heading}
                        </h3>
                        <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                            {col.links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.href}
                                        className="text-sm font-medium transition-colors duration-150 hover:underline underline-offset-4"
                                        style={{ color: 'var(--primary)' }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* ── Social icons ── */}
                <div className="flex lg:flex-col gap-3 items-start">
                    {socials.map(({ icon: Icon, href, label }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="w-8 h-8 rounded-md flex items-center justify-center transition-colors duration-150"
                            style={{
                                backgroundColor: 'var(--secondary)',
                                color: 'var(--muted-foreground)',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = 'var(--primary)';
                                e.currentTarget.style.color = 'var(--primary-foreground)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = 'var(--secondary)';
                                e.currentTarget.style.color = 'var(--muted-foreground)';
                            }}
                        >
                            <Icon className="w-4 h-4" />
                        </a>
                    ))}
                </div>
            </div>

            {/* ── Bottom bar ── */}
            <div
                className="w-full h-px"
                style={{ backgroundColor: 'var(--border)' }}
            />
            <div className="max-w-[1280px] mx-auto px-6 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                    {[
                        { label: 'Security', href: '/security' },
                        { label: 'Privacy', href: '/privacy' },
                        { label: 'Terms', href: '/terms' },
                    ].map((item, i, arr) => (
                        <React.Fragment key={item.label}>
                            <Link
                                to={item.href}
                                className="text-[0.75rem] font-medium transition-colors hover:underline underline-offset-4"
                                style={{ color: 'var(--muted-foreground)' }}
                            >
                                {item.label}
                            </Link>
                            {i < arr.length - 1 && (
                                <span
                                    className="text-[0.75rem]"
                                    style={{ color: 'var(--border)' }}
                                >
                                    |
                                </span>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <p
                    className="text-[0.75rem] font-medium m-0"
                    style={{ color: 'var(--muted-foreground)' }}
                >
                    © {new Date().getFullYear()} Todoify. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default FooterSection;
