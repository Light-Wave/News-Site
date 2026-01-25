/* SpellIcon is a more fantasy-styled version of share buttons, right now they have no real link to any social media. 
TODO: Decide if we want it to link to actual media, do nothing, or create a simple fake site (static single page for each spell) **/

/*The function takes a color, a desciptive tooltip text and the icon to display (the child) 
On desktop the icon have a animation effect when hovered over
*/

export default function SpellIcon({ children, color, tooltip }: { children: React.ReactNode; color: string; tooltip: string }) {
    const colorMap: Record<string, { gradient: string; border: string; bloom: string; iconGlow: string }> = {
        blue: {
            gradient: "from-blue-600/30 to-blue-950/80",
            border: "border-blue-400/40",
            bloom: "bg-blue-500/40",
            iconGlow: "drop-shadow-[0_0_8px_rgba(59,130,146,0.6)]",
        },
        amber: {
            gradient: "from-amber-600/30 to-amber-950/80",
            border: "border-amber-400/40",
            bloom: "bg-amber-500/40",
            iconGlow: "drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]",
        },
        purple: {
            gradient: "from-purple-600/30 to-purple-950/80",
            border: "border-purple-400/40",
            bloom: "bg-purple-500/40",
            iconGlow: "drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]",
        },
    };

    const style = colorMap[color] || colorMap.amber;

    return (
        <div className="group relative" title={tooltip}>
            {/* Outer highlight of the icon */}
            <div className={`
        absolute -inset-1 rounded-md blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500
        ${style.bloom} -z-10
      `} />

            {/* Inner icon */}
            <div className={`
        relative w-14 h-14 flex items-center justify-center 
        bg-stone-950 rounded-sm
        border-2 ${style.border}
        shadow-[inset_0_0_15px_rgba(0,0,0,0.9),0_10px_15px_-3px_rgba(0,0,0,0.5)]
        hover:scale-110 hover:-translate-y-2 hover:rotate-2
        transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer
        z-10 overflow-hidden
      `}>
                <div className={`absolute inset-0 bg-gradient-to-t ${style.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="absolute inset-0 border-t border-l border-white/20 pointer-events-none" />
                <div className="absolute inset-0 border-b border-r border-black/50 pointer-events-none" />
                <span className={`
          text-3xl z-20 transition-all duration-300 
          group-hover:scale-110 group-hover:saturate-150 
          ${style.iconGlow}
        `}>
                    {children}
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity bg-gradient-to-tr from-transparent via-white to-transparent -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />
            </div>
        </div>
    );
}
