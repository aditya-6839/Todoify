const BrandMarquee = () => (
    <section className="py-8 border-y border-[#EDE9E1] overflow-hidden bg-white">
        <p className="text-center text-[10px] font-black uppercase tracking-widest text-[#C9C2B8] mb-5">Trusted by teams at</p>
        <div className="flex overflow-hidden">
            <div className="marquee flex gap-14 items-center pr-14">
                {['Figma', 'Notion', 'Linear', 'Vercel', 'Stripe', 'Loom', 'Framer', 'Descript',
                    'Figma', 'Notion', 'Linear', 'Vercel', 'Stripe', 'Loom', 'Framer', 'Descript'].map((b, i) => (
                        <span key={i} className="text-[#C9C2B8] text-xs font-black uppercase tracking-widest whitespace-nowrap">{b}</span>
                    ))}
            </div>
        </div>
    </section>
);

export default BrandMarquee;
