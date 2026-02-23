import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/layout/Logo';

const Footer = () => {
    return (
        <footer className="bg-[#2A2620] py-16">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-10 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Logo size="w-28" className="mb-4 opacity-90" />
                        <p className="text-[#6B6358] text-sm font-medium leading-relaxed">
                            The beautifully organised todo app for individuals and teams.
                        </p>
                    </div>
                    {/* Link columns */}
                    {[
                        { head: 'Product', links: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
                        { head: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
                        { head: 'Legal', links: ['Privacy', 'Terms', 'Cookies', 'Security'] },
                    ].map(col => (
                        <div key={col.head}>
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#4A4540] mb-4">{col.head}</p>
                            <ul className="space-y-2.5">
                                {col.links.map(l => (
                                    <li key={l}>
                                        <Link to="#" className="text-[#6B6358] text-sm font-medium hover:text-white transition-colors">{l}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="border-t border-[#3D3929] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[#4A4540] text-xs font-medium">© 2026 Todoify, Inc. All rights reserved.</p>
                    <p className="text-[#4A4540] text-xs font-medium">Made with ♥ for productivity lovers.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
