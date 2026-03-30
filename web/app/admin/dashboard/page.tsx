export default function DashboardPage() {
  return (
    <div className="p-8 font-mono animate-flicker space-y-8">
      <header>
        <h2 className="text-2xl font-bold text-[#39ff14]">ACTIVE CASES_</h2>
        <p className="text-sm text-white/50 mt-2">Displaying all operational sectors in current workspace.</p>
      </header>

      {/* Mock Blueprint Workspace A Placeholder */}
      <section>
         <h3 className="text-sm text-[#39ff14]/70 uppercase tracking-widest border-b border-[#39ff14]/20 pb-2 mb-4">Workspace A: Blueprint Digitization</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-[#1a2f1a] bg-[#0a0f0a] p-6 hover:border-[#39ff14]/50 transition-colors cursor-pointer group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#39ff14]/5 transform rotate-45 translate-x-8 -translate-y-8"></div>
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="text-lg text-white group-hover:text-[#39ff14] transition-colors">SECTOR 01: ASYLUM WING B</h4>
                        <p className="text-xs text-white/40 mt-1">LAST_SYNC: 04:23_AM_EST</p>
                    </div>
                    <span className="text-xs bg-[#1a2f1a] text-[#39ff14] px-2 py-1 rounded-sm">DIGITIZED</span>
                </div>
                
                <div className="mt-6 flex gap-4 text-xs">
                   <div className="flex-1 p-3 bg-[#050505] border border-[#1a2f1a]">
                      <div className="text-white/30 mb-1">EVIDENCE NODES</div>
                      <div className="text-xl text-white">12_</div>
                   </div>
                   <div className="flex-1 p-3 bg-[#050505] border border-[#1a2f1a]">
                      <div className="text-white/30 mb-1">OPERATORS</div>
                      <div className="text-xl text-[#39ff14]">03_</div>
                   </div>
                </div>
            </div>

            <div className="border border-[#1a2f1a] border-dashed bg-[#0a0f0a]/50 p-6 flex flex-col items-center justify-center text-center hover:border-[#39ff14]/50 hover:bg-[#39ff14]/5 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-[#39ff14]/30 flex items-center justify-center mb-4">
                   <span className="text-[#39ff14] text-xl">+</span>
                </div>
                <h4 className="text-sm text-[#39ff14]">INITIATE NEW SMART SCAN</h4>
                <p className="text-xs text-white/40 mt-2 max-w-[200px]">Upload hand-drawn sketch for OpenCV Blueprint Filter processing.</p>
            </div>
         </div>
      </section>

      {/* Mock Evidence Nodes Workspace B Placeholder */}
      <section className="mt-12">
         <h3 className="text-sm text-[#39ff14]/70 uppercase tracking-widest border-b border-[#39ff14]/20 pb-2 mb-4">Workspace B: Evidence Stream</h3>
         <div className="flex flex-col gap-3">
             {[
               { id: 'EVD-992', type: 'AUDIO/EVP', loc: 'SECTOR_01/BASEMENT', time: 'T-Minus 4m' },
               { id: 'EVD-993', type: 'PHOTO/THERMAL', loc: 'SECTOR_01/BASEMENT/HALL_3', time: 'T-Minus 12m' },
               { id: 'EVD-994', type: 'GEAR/EMF_READER', loc: 'SECTOR_01/FLOOR_2', time: 'T-Minus 1hr' },
             ].map(ev => (
                <div key={ev.id} className="flex items-center justify-between p-4 bg-[#0a0f0a] border-l-2 border-[#1a2f1a] hover:border-[#39ff14] transition-colors">
                   <div className="flex items-center gap-4">
                      <span className="text-[#39ff14] text-xs">[{ev.id}]</span>
                      <div>
                         <div className="text-sm">{ev.type}</div>
                         <div className="text-xs text-white/40">{ev.loc}</div>
                      </div>
                   </div>
                   <div className="text-xs text-white/50 text-right">
                      {ev.time}
                   </div>
                </div>
             ))}
         </div>
      </section>
    </div>
  );
}
