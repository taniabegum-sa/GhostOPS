import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#050505] animate-flicker space-y-16 p-6">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative w-64 h-64 md:w-80 md:h-80 opacity-90 filter drop-shadow-[0_0_15px_rgba(57,255,20,0.6)]">
          <Image 
            src="/logo.png" 
            alt="Ghost Ops Logo" 
            fill 
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="flex flex-col w-full max-w-sm gap-6 mt-12 z-10">
        <Link href="/admin/dashboard" className="w-full">
          <button className="group relative w-full overflow-hidden bg-[#050505] border-[1.5px] border-[#39ff14]/70 px-8 py-4 text-center">
            <div className="absolute inset-0 w-1/4 h-full bg-[#39ff14]/10 transform -skew-x-12 -translate-x-[150%] group-hover:translate-x-[400%] transition-transform duration-700 ease-in-out"></div>
            <span className="relative font-mono text-[#39ff14] tracking-widest uppercase font-semibold flex items-center justify-center gap-3">
              [ ADMIN LOGIN ]
            </span>
          </button>
        </Link>

        <Link href="/viewer/map" className="w-full">
          <button className="group w-full relative overflow-hidden bg-[#1a2f1a]/30 border-[1.5px] border-[#39ff14]/40 px-8 py-4 text-center hover:border-[#39ff14]/80 transition-colors">
            <span className="relative font-mono text-white/90 tracking-widest uppercase flex items-center justify-center gap-3 text-sm">
              &lt; PUBLIC VIEWER &gt;
            </span>
          </button>
        </Link>
      </div>
      
      <div className="absolute bottom-6 left-6 flex flex-col font-mono text-[10px] text-[#39ff14]/50">
        <span>SYSLOG: INITIALIZED</span>
        <span>NODE: ALPHA-7</span>
        <span className="animate-pulse">STATUS: WAITING_FOR_OPERATOR</span>
      </div>
    </main>
  );
}
