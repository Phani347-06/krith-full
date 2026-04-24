import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { curriculumData as initialData } from '../data/curriculum';

const Dashboard = ({ onLogout }) => {
  const [curriculum, setCurriculum] = useState(initialData);
  const [scale, setScale] = useState(0.6);
  const [x, setX] = useState(100);
  const [y, setY] = useState(100);
  const containerRef = useRef(null);

  const EASE_PREMIUM = [0.22, 1, 0.36, 1];

  const handleFinishModule = (id) => {
    setCurriculum(prev => prev.map(node => {
      if (node.id === id) return { ...node, status: 'mastered', progress: 100 };
      return node;
    }));
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomSpeed = 0.001;
    const minScale = 0.15;
    const maxScale = 2;
    const delta = -e.deltaY;
    const newScale = Math.min(Math.max(scale + delta * zoomSpeed * scale, minScale), maxScale);
    
    if (newScale !== scale) {
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const scaleRatio = newScale / scale;
      const newX = mouseX - (mouseX - x) * scaleRatio;
      const newY = mouseY - (mouseY - y) * scaleRatio;
      setScale(newScale);
      setX(newX);
      setY(newY);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (container) container.removeEventListener('wheel', handleWheel);
    };
  }, [scale, x, y]);

  const handleReset = () => {
    setScale(0.6);
    setX(100);
    setY(100);
  };

  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX - x, y: e.clientY - y };
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    setX(e.clientX - dragStartPos.current.x);
    setY(e.clientY - dragStartPos.current.y);
  };

  const handlePointerUp = () => setIsDragging(false);

  const getTrackStyles = (track) => {
    switch(track) {
      case 'frontend': return { border: 'border-matcha-300', bg: 'bg-matcha-300', shadow: 'shadow-[12px_12px_0px_0px_rgba(132,231,165,0.25)]', icon: 'html', accent: '#84e7a5' };
      case 'sql': return { border: 'border-ube-300', bg: 'bg-ube-300', shadow: 'shadow-[12px_12px_0px_0px_rgba(193,176,255,0.25)]', icon: 'database', accent: '#c1b0ff' };
      default: return { border: 'border-black', bg: 'bg-white', shadow: 'shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]', icon: 'code', accent: '#000000' };
    }
  };

  const isNodeVisible = (node) => {
    if (!node.prerequisite_topic_id) return true;
    const prereq = curriculum.find(n => n.id === node.prerequisite_topic_id);
    return prereq && prereq.status === 'mastered';
  };

  return (
    <div 
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="bg-warm-cream bg-grid-pattern w-screen h-screen font-body-standard text-primary overflow-hidden relative select-none"
    >
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-5 bg-white/80 backdrop-blur-md border-b-2 border-oat-border">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, ease: EASE_PREMIUM }} className="flex items-center gap-6">
          <h1 className="text-2xl font-black tracking-tighter text-black font-['Epilogue'] uppercase italic">CortexAI</h1>
        </motion.div>
        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, ease: EASE_PREMIUM }} className="flex items-center gap-4">
          <button onClick={onLogout} className="w-12 h-12 rounded-full bg-white border-2 border-black flex items-center justify-center hover:bg-lemon-400 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
            <span className="material-symbols-outlined font-black">logout</span>
          </button>
        </motion.div>
      </header>

      <motion.aside 
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_PREMIUM }}
        className="fixed top-[94px] bottom-0 left-0 hidden md:flex flex-col w-72 p-6 space-y-8 bg-white/80 backdrop-blur-md border-r-2 border-oat-border z-40"
      >
        <div className="flex items-center gap-4 mb-4 px-2">
          <div className="w-14 h-14 rounded-2xl bg-black border-2 border-black flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)]">
            <span className="material-symbols-outlined text-white text-3xl">map</span>
          </div>
          <div className="text-left">
            <h2 className="font-['Epilogue'] font-black text-sm tracking-widest text-black uppercase">System Engine</h2>
            <p className="font-['Epilogue'] font-bold text-[10px] text-matcha-600 uppercase tracking-tighter">Quest Protocol Active</p>
          </div>
        </div>
        <nav className="flex-1 flex flex-col gap-3">
          {['Curriculum', 'Stats', 'Network', 'Artifacts', 'Settings'].map((item, idx) => (
            <motion.a 
              key={item}
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: EASE_PREMIUM, delay: 0.4 + (idx * 0.1) }}
              className={`flex items-center gap-5 p-4 rounded-2xl font-['Epilogue'] font-black text-xs uppercase tracking-widest border-2 transition-all ${idx === 0 ? 'bg-black text-white border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)] -rotate-1' : 'text-stone-400 border-transparent hover:text-black hover:bg-stone-50'}`} 
              href="#"
            >
              <span className="material-symbols-outlined text-xl">{['school', 'bar_chart', 'hub', 'box', 'settings'][idx]}</span>
              {item}
            </motion.a>
          ))}
        </nav>
      </motion.aside>

      <main onPointerDown={handlePointerDown} className="absolute inset-0 overflow-hidden cursor-grab active:cursor-grabbing z-0">
        <div className="fixed bottom-10 right-10 z-30">
          <button onClick={handleReset} className="w-14 h-14 bg-white rounded-full border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-black hover:bg-lemon-400 transition-all">
            <span className="material-symbols-outlined font-black">filter_center_focus</span>
          </button>
        </div>

        <motion.div animate={{ x, y, scale }} transition={isDragging ? { type: 'just' } : { type: 'spring', stiffness: 200, damping: 25 }} className="absolute origin-top-left">
          <div className="relative min-w-[7000px] min-h-[3000px]">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <defs>
                <filter id="glow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                {/* Industry Grade Arrowheads */}
                <marker id="arrow-locked" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#8c8c8c" />
                </marker>
                <marker id="arrow-mastered" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#078a52" />
                </marker>
              </defs>
              {curriculum.map(node => {
                if (!node.prerequisite_topic_id) return null;
                const prereq = curriculum.find(n => n.id === node.prerequisite_topic_id);
                if (!prereq || !isNodeVisible(node)) return null;
                const isMastered = node.status === 'mastered';
                
                // Offset the end of the line slightly to look better with the arrowhead
                const angle = Math.atan2(node.position.y - prereq.position.y, node.position.x - prereq.position.x);
                const offset = 165; // Stop at card edge
                const endX = node.position.x - Math.cos(angle) * offset;
                const endY = node.position.y - Math.sin(angle) * offset;
                const startX = prereq.position.x + Math.cos(angle) * 165;
                const startY = prereq.position.y + Math.sin(angle) * 165;

                let d = `M ${startX} ${startY} C ${(startX + endX) / 2} ${startY}, ${(startX + endX) / 2} ${endY}, ${endX} ${endY}`;
                
                return (
                  <motion.path 
                    key={`line-${node.id}`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                    d={d}
                    fill="none"
                    stroke={isMastered ? '#078a52' : '#8c8c8c'}
                    strokeWidth={isMastered ? "5" : "3"}
                    strokeDasharray={isMastered ? "0" : "12,12"}
                    filter={isMastered ? "url(#glow)" : ""}
                    markerEnd={isMastered ? "url(#arrow-mastered)" : "url(#arrow-locked)"}
                  />
                );
              })}
            </svg>

            <AnimatePresence mode="popLayout">
              {curriculum.map((node, i) => {
                if (!isNodeVisible(node)) return null;
                const styles = getTrackStyles(node.track_type);
                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.6, ease: EASE_PREMIUM }}
                    whileHover={{ scale: 1.05, zIndex: 50 }}
                    className={`absolute w-80 bg-white rounded-[32px] border-2 ${styles.border} ${styles.shadow} p-8 z-10 cursor-pointer overflow-hidden`}
                    style={{ 
                      left: node.position.x, 
                      top: node.position.y,
                      transform: 'translate(-50%, -50%)' 
                    }}
                  >
                    {node.status === 'mastered' && <div className="absolute top-0 right-0 w-32 h-32 bg-matcha-100 rounded-full blur-3xl opacity-40 -mr-16 -mt-16 pointer-events-none" />}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl ${styles.bg} border-2 border-black/10 flex items-center justify-center shadow-md`}>
                          <span className="material-symbols-outlined text-white text-2xl">{styles.icon}</span>
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-0.5">{node.chapter}</p>
                          <h3 className="font-['Epilogue'] font-black text-xl text-black leading-tight tracking-tight">{node.topic_name}</h3>
                        </div>
                      </div>
                      {node.status === 'mastered' && (
                        <div className="bg-matcha-600 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"><span className="material-symbols-outlined text-white text-lg font-black">check</span></div>
                      )}
                    </div>
                    <div className="space-y-2.5 mt-6">
                      {node.modules.map((mod, mi) => (
                        <div key={mi} className="flex items-center gap-4 p-3 rounded-2xl bg-stone-50 border border-stone-100 group">
                          <span className="text-[10px] font-black text-stone-300 w-7 tracking-tighter">{mod.split(' ')[0]}</span>
                          <span className="text-xs font-bold text-stone-700 truncate">{mod.split(' ').slice(1).join(' ')}</span>
                        </div>
                      ))}
                    </div>
                    {node.status !== 'mastered' && (
                      <motion.button whileHover={{ scale: 1.02, backgroundColor: styles.accent === '#000000' ? '#078a52' : styles.accent }} whileTap={{ scale: 0.98 }} onClick={() => handleFinishModule(node.id)} className="w-full mt-8 py-4 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all">Complete Level</motion.button>
                    )}
                    <div className="mt-8 pt-6 border-t border-dashed border-stone-200 flex justify-between items-center">
                      <div className="flex items-center gap-2"><span className="material-symbols-outlined text-matcha-600 text-lg font-black">stars</span><span className="text-sm font-black text-matcha-600 tracking-tight">{node.xp_reward} <span className="text-[10px] uppercase opacity-60">XP</span></span></div>
                      <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest bg-stone-50 px-3 py-1.5 rounded-full border border-stone-100">{node.difficulty_level}</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
