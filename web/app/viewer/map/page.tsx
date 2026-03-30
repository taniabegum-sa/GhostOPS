'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Share2, FileWarning, Eye } from 'lucide-react';
import { collection, onSnapshot, query, queryEqual } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function PublicViewerPage() {
  const [nodes, setNodes] = useState<any[]>([]);

  useEffect(() => {
    // Subscribe to the EvidenceNodes stream for the Asylum Wing B Map
    const q = query(collection(db, 'EvidenceNodes'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setNodes(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-[#050505] text-white overflow-hidden p-6 font-mono animate-flicker space-y-4">
       <header className="flex items-center justify-between border-b border-[#39ff14]/30 pb-4">
          <div className="flex items-center gap-4">
             <div className="text-[#39ff14]">
                <Eye size={24} />
             </div>
             <div>
                <h1 className="text-xl font-bold tracking-widest uppercase">PUBLIC VIEWER // ASYLUM WING B</h1>
                <p className="text-xs text-[#39ff14]/60">READ_ONLY ACCESS_LEVEL_0</p>
             </div>
          </div>
          <div className="flex gap-4">
             <button className="flex items-center gap-2 text-xs border border-[#1a2f1a] px-4 py-2 hover:border-[#39ff14] hover:text-[#39ff14] transition-all bg-[#0a0f0a]">
                <Share2 size={14} /> SHARE_LINK
             </button>
             <Link href="/">
                <button className="flex items-center gap-2 text-xs border border-red-500/30 px-4 py-2 hover:bg-red-500/10 text-red-500 transition-all">
                   <FileWarning size={14} /> DISCONNECT
                </button>
             </Link>
          </div>
       </header>

       <main className="flex-1 relative border border-[#1a2f1a] bg-[#0a0f0a] flex items-center justify-center overflow-hidden group">
          <div className="absolute inset-0 max-w-5xl max-h-[800px] w-full h-full m-auto border border-[#39ff14]/20 opacity-50 bg-[linear-gradient(rgba(57,255,20,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(57,255,20,0.1)_1px,transparent_1px)] bg-[size:50px_50px]">
             
             {/* Live Data Render */}
             {nodes.map((node) => (
               <div 
                 key={node.id}
                 className="absolute w-4 h-4 rounded-full group/pin"
                 style={{ 
                   left: node.x, 
                   top: node.y, 
                   backgroundColor: node.type === 'PHOTO' ? 'red' : '#39ff14',
                   boxShadow: `0 0 10px ${node.type === 'PHOTO' ? 'red' : '#39ff14'}`
                 }}
                 title={`${node.type} EVIDENCE`}
               >
                 {node.type === 'PHOTO' && <div className="absolute inset-0 w-full h-full rounded-full bg-red-500 animate-ping opacity-75 cursor-not-allowed"></div>}
                 <span className="opacity-0 group-hover/pin:opacity-100 absolute -top-8 bg-[#050505] border border-[#39ff14] px-2 py-1 text-[10px] whitespace-nowrap z-50">
                    EVD-{node.id.substring(0, 4)} // {node.type}
                 </span>
               </div>
             ))}

          </div>

          <div className="absolute bottom-4 left-4 bg-[#050505]/80 p-3 border border-[#1a2f1a] backdrop-blur-sm">
             <div className="text-xs text-[#39ff14]">MAP LEGEND</div>
             <div className="flex items-center gap-2 mt-2 text-[10px] text-white/60">
                <span className="w-2 h-2 bg-red-500 rounded-full inline-block"></span> ANOMALY (PHOTO/VIDEO)
             </div>
             <div className="flex items-center gap-2 mt-1 text-[10px] text-white/60">
                <span className="w-2 h-2 bg-[#39ff14] inline-block"></span> EQUIPMENT (AUDIO/EMF)
             </div>
          </div>
       </main>
    </div>
  );
}
