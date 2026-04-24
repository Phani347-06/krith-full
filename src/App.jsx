import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('.cursor-pointer') ||
        target.closest('button') ||
        target.closest('a');
      
      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        scale: isHovering ? 1.2 : 1,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 1200, 
        damping: 60, 
        mass: 0.05,
        opacity: { duration: 0.1 }
      }}
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: 'rotate(-15deg)', transformOrigin: 'top left' }}
      >
        <path 
          d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" 
          fill={isHovering ? "#078a52" : "black"} 
          stroke="white" 
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      {isHovering && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 20 }}
          className="ml-4 bg-black text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg uppercase tracking-widest whitespace-nowrap"
        >
          Select
        </motion.div>
      )}
    </motion.div>
  );
};

const App = () => {
  const [view, setView] = useState('home');


  return (
    <div className="relative overflow-x-hidden bg-warm-cream min-h-screen font-body-standard text-on-background selection:bg-lemon-400 selection:text-black">
      <CustomCursor />
      <AnimatePresence mode="wait">
        {view === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Login onBack={() => setView('home')} onSignUp={() => setView('signup')} onLogin={() => setView('dashboard')} />
          </motion.div>
        )}

        {view === 'signup' && (
          <motion.div
            key="signup"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SignUp onBack={() => setView('home')} onLogin={() => setView('login')} onSignUp={() => setView('dashboard')} />
          </motion.div>
        )}

        {view === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <Dashboard onLogout={() => setView('home')} />
          </motion.div>
        )}

        {view === 'home' && (
          <motion.div
            key="home"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
              exit: { opacity: 0 }
            }}
            className="flex flex-col"
          >
            {/* TopNavBar */}
            <motion.nav 
              variants={{
                initial: { y: -20, opacity: 0 },
                animate: { y: 0, opacity: 1 }
              }}
              className="fixed top-0 w-full z-50 bg-warm-cream border-b border-oat-border"
            >
              <div className="flex justify-between items-center h-20 px-8 max-w-7xl mx-auto">
                <div className="font-display-secondary text-2xl italic tracking-tighter text-black flex items-center gap-2 cursor-pointer uppercase font-black">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                  CortexAI
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setView('login')} className="font-bold text-sm uppercase tracking-wide px-6 py-2 hover:text-matcha-600 transition-colors">Log In</button>
                  <button onClick={() => setView('signup')} className="font-bold text-sm uppercase tracking-wide border-2 border-black rounded-full px-6 py-2 hover:bg-lemon-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">Sign Up</button>
                </div>
              </div>
            </motion.nav>

            {/* Hero Section */}
            <header className="pt-32 pb-20 px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 min-h-[90vh]">
              <div className="flex-1 space-y-8 z-10 text-left">
                <motion.span 
                  variants={{
                    initial: { x: -20, opacity: 0 },
                    animate: { x: 0, opacity: 1 }
                  }}
                  className="font-label-uppercase text-label-uppercase text-on-surface-variant bg-surface-container-high px-4 py-2 rounded-full inline-block border border-oat-border border-dashed"
                >
                  Beta Version 2.4 Active
                </motion.span>
                <motion.h1 
                  variants={{
                    initial: { x: -30, opacity: 0 },
                    animate: { x: 0, opacity: 1 }
                  }}
                  className="font-display-hero text-7xl md:text-8xl text-clay-black max-w-2xl leading-[0.9] tracking-tighter"
                >
                  Leveling Up Your Learning
                </motion.h1>
                <motion.p 
                  variants={{
                    initial: { x: -30, opacity: 0 },
                    animate: { x: 0, opacity: 1 }
                  }}
                  className="font-body-large text-xl text-warm-charcoal max-w-xl leading-relaxed"
                >
                  The Adaptive Quest Engine transforms syllabus drudgery into interactive knowledge trees. Build your academic character stats one skill at a time.
                </motion.p>
                <motion.div 
                  variants={{
                    initial: { y: 20, opacity: 0 },
                    animate: { y: 0, opacity: 1 }
                  }}
                  className="flex flex-wrap gap-4 pt-4"
                >
                  <button 
                    onClick={() => setView('signup')}
                    className="px-8 py-4 bg-clay-black text-pure-white font-button text-button rounded-full border-2 border-clay-black btn-interaction hard-shadow-hover hover:bg-matcha-600 transition-all"
                  >
                    Start Your Campaign
                  </button>
                  <button className="px-8 py-4 bg-transparent text-clay-black font-button text-button rounded-lg border-2 border-oat-border border-dashed btn-interaction hover:bg-surface-container hover:border-solid transition-all">
                    View Skill Trees
                  </button>
                </motion.div>
              </div>

              <motion.div 
                variants={{
                  initial: { scale: 0.9, opacity: 0, rotate: 2 },
                  animate: { scale: 1, opacity: 1, rotate: 0 }
                }}
                className="flex-1 relative"
              >
                <div className="absolute inset-0 bg-lemon-400 rounded-[40px] rotate-3 scale-105 opacity-20 border-2 border-dashed border-lemon-700"></div>
                <div className="relative z-10 w-full h-[600px] rounded-[40px] border-4 border-white clay-shadow overflow-hidden bg-white">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQf24nHm7h3Kift3sGKK8tO2Vpkw7pjx1m8Z-A_6e0E2dV9Q-wgjqBLmI8cxrRA1ePU7OQ_xI1VDnbEcAjwFmde00rphvSYshlWiMs2jpRZ6V4vnnW6zV2g5NmqY_vs9LID8uKlbH42iSJ93KVuJKJkBbxzm4WDP75iFXIi7CS75QLrfiiELYDmqWkfbkKvReaumJI6sZ2KiTtiNE-co-8uHApEGxHaJ-bdlQpU4hPsciORSBXLNGekHvXm6_EvgLE6BW9X7lrqcg"
                    className="w-full h-full object-cover"
                    alt="CortexAI Hero"
                  />
                </div>
                {/* Floating Element */}
                <motion.div 
                  initial={{ y: 20, opacity: 0, rotate: -6 }}
                  animate={{ y: 0, opacity: 1, rotate: -6 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-8 -left-8 bg-white p-6 rounded-[24px] border border-oat-border clay-shadow z-20 w-64 rotate-[-6deg] text-left"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-10 h-10 bg-matcha-300 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-matcha-800">military_tech</span>
                    </div>
                    <span className="font-button text-button text-clay-black font-bold">+500 XP</span>
                  </div>
                  <p className="font-monospace-ui text-xs text-warm-charcoal">Calculus Module Complete</p>
                </motion.div>
              </motion.div>
            </header>

            {/* Matcha Section */}
            <section className="bg-matcha-800 text-pure-white py-24 px-8 border-y border-matcha-600 border-dashed relative overflow-hidden">
              <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                  <h2 className="font-section-heading text-5xl font-black mb-4 tracking-tighter">The Skill Tree</h2>
                  <p className="font-body-large text-xl text-matcha-300 max-w-2xl mx-auto">Visualize your curriculum as interconnected nodes. Unlock advanced concepts by mastering the fundamentals.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { title: "Node Mapping", icon: "account_tree", color: "bg-lemon-400", desc: "Every syllabus is parsed into a dependency graph, showing exactly what you need to know before moving forward." },
                    { title: "XP Grinding", icon: "bolt", color: "bg-matcha-600", desc: "Complete micro-quests and quizzes to earn experience points. Level up your profile across different academic domains.", shift: true },
                    { title: "Boss Fights", icon: "workspace_premium", color: "bg-slushie-500", desc: "Midterms and finals are recontextualized as major encounters. Prepare effectively using targeted study plans." }
                  ].map((card, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                      className={`bg-pure-white text-clay-black rounded-[24px] p-8 border border-oat-border clay-shadow ${card.shift ? 'md:-translate-y-8' : ''} text-left`}
                    >
                      <div className={`w-12 h-12 ${card.color} rounded-full flex items-center justify-center mb-6 border-2 border-clay-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{card.icon}</span>
                      </div>
                      <h3 className="font-card-heading text-2xl font-bold mb-3">{card.title}</h3>
                      <p className="font-body-standard text-stone-600">{card.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-matcha-600 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
            </section>

            {/* Footer */}
            <footer className="w-full py-16 px-8 border-t-2 border-dashed border-oat-border bg-warm-cream">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="font-display-secondary text-2xl italic font-bold tracking-tighter text-clay-black flex items-center gap-2">
                  <span className="material-symbols-outlined">psychology</span>
                  Campus Cortex AI
                </div>
                <div className="flex gap-8 font-label-uppercase text-xs font-bold uppercase tracking-widest text-warm-charcoal">
                  <a className="opacity-70 hover:opacity-100 hover:text-lemon-700 transition-colors" href="#">Privacy</a>
                  <a className="opacity-70 hover:opacity-100 hover:text-lemon-700 transition-colors" href="#">Terms</a>
                  <a className="opacity-70 hover:opacity-100 hover:text-lemon-700 transition-colors" href="#">Discord</a>
                  <a className="opacity-70 hover:opacity-100 hover:text-lemon-700 transition-colors" href="#">Twitter</a>
                </div>
                <div className="text-xs uppercase tracking-widest text-warm-silver">
                  © 2024 Campus Cortex AI. Built for the curious.
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
