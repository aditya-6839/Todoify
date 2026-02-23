import { cn } from "@/lib/utils";

export const BentoGrid = ({
    className,
    children
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
                className
            )}>
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon
}) => {
    return (
        <div
            className={cn(
                "row-span-1 rounded-none group/bento hover:shadow-2xl transition duration-300 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 cursor-pointer",
                className
            )}>
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-none overflow-hidden">
                {header}
            </div>
            <div className="group-hover/bento:translate-x-2 transition duration-300">
                <div className="bg-white/50 dark:bg-black/50 p-1.5 rounded-none w-fit mb-2">
                    {icon}
                </div>
                <div className="font-sans font-bold text-[#2A2620] dark:text-neutral-200 mb-2 mt-2">
                    {title}
                </div>
                <div className="font-sans font-medium text-[#7A7060] text-xs dark:text-neutral-300">
                    {description}
                </div>
            </div>
        </div>
    );
};


