import Link from 'next/link';
import { Home, Layers, Settings, Users } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-[#050505] text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[#1a2f1a] bg-[#0a0f0a] flex flex-col">
        <div className="p-6 border-b border-[#1a2f1a]">
          <h1 className="font-mono text-[#39ff14] text-xl font-bold tracking-wider uppercase">GHOST // OPS</h1>
          <p className="text-xs text-[#39ff14]/50 font-mono mt-1">ADMIN_ACCESS_TERMINAL</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 font-mono">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-[#39ff14] hover:bg-[#39ff14]/5 rounded transition-colors group">
            <Home size={18} className="group-hover:text-[#39ff14]" />
            [ DASHBOARD ]
          </Link>
          <Link href="/admin/blueprints" className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-[#39ff14] hover:bg-[#39ff14]/5 rounded transition-colors group">
            <Layers size={18} className="group-hover:text-[#39ff14]" />
            [ BLUEPRINTS ]
          </Link>
          <Link href="/admin/team" className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-[#39ff14] hover:bg-[#39ff14]/5 rounded transition-colors group">
            <Users size={18} className="group-hover:text-[#39ff14]" />
            [ OPERATORS ]
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:text-[#39ff14] hover:bg-[#39ff14]/5 rounded transition-colors group">
            <Settings size={18} className="group-hover:text-[#39ff14]" />
            [ SYS_CFG ]
          </Link>
        </nav>
        
        <div className="p-4 border-t border-[#1a2f1a]">
           <Link href="/">
             <button className="w-full text-xs font-mono text-white/50 hover:text-red-500 py-2 border border-transparent hover:border-red-500/30 transition-all text-left px-4">
               &lt; DISCONNECT
             </button>
           </Link>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 overflow-auto relative z-10">
        {children}
      </main>
    </div>
  );
}
