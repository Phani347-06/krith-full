import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { curriculumData } from '../data/curriculum.js';
import LessonOverlay from './LessonOverlay.jsx';

const Dashboard = () => {
  // State from localStorage
  const [completedSubtopics, setCompletedSubtopics] = useState(() => new Set(JSON.parse(localStorage.getItem('completedSubtopics') || '[]')));
  const [userStats, setUserStats] = useState(() => JSON.parse(localStorage.getItem('userStats') || '{"xp":0,"level":1}'));
  const [activeLesson, setActiveLesson] = useState(null);
  const [activeChapterId, setActiveChapterId] = useState(1);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('completedSubtopics', JSON.stringify([...completedSubtopics]));
  }, [completedSubtopics]);

  useEffect(() => {
    localStorage.setItem('userStats', JSON.stringify(userStats));
  }, [userStats]);

  // Data processing
  const totalPossibleXP = curriculumData.reduce((acc, node) => {
    return acc + node.modules.reduce((modAcc, mod) => modAcc + (mod.xp_reward || 20), 0);
  }, 0);
  const chakraPercentage = totalPossibleXP ? Math.min(100, Math.round((userStats.xp / totalPossibleXP) * 100)) : 0;

  const chapterImages = {
    1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkgC-yz3wDRDHtQVE7ZY7SZ9lnp789HqZpuncrCVaQQyeCKxT9QIFXfXpnZ4YmWHvRXyHZhzY78l-y1ZGZ8C9FGP-B4ZT_XJm5cyM0ZnOXjxJ4mP4HNtQCv4mCSUQzY6tRX5SvbHG0Wb14KcJQxdwRjhGS36jZibb008IkLSegQuD6jpOuay2fi8YONMebOaNmLI7NScZbRibO37pkx_nGBG0VLcrkvLhOc1B6zNN2rCEOIitsAsZXps8u0rku6oSosclzXWavGEc',
    2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTdibQdUWMATa00gmdKFoVjC7BNfM_RawIVGDIiig_rOQ9ub-bxZqqnkcCqksuRmhVOcrxmDj9uCZ4xulGhbFR35IkDyYr51IdVG4zi9cixA6StGiqyUaXSqzRJ0P_fxYw2nOpRn8xjG4M51azc3V1uN_9CRWx0YkIppc2TU4_9HsrNYTkh2efeyYftVKysh88dv-RvBMLqXeTxCKbxfwAwqkMS_-LuLfhsujrWvGraQzuhD9p2MTVuPOi4S7B-zgoABng1iIDJM8',
    3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkgC-yz3wDRDHtQVE7ZY7SZ9lnp789HqZpuncrCVaQQyeCKxT9QIFXfXpnZ4YmWHvRXyHZhzY78l-y1ZGZ8C9FGP-B4ZT_XJm5cyM0ZnOXjxJ4mP4HNtQCv4mCSUQzY6tRX5SvbHG0Wb14KcJQxdwRjhGS36jZibb008IkLSegQuD6jpOuay2fi8YONMebOaNmLI7NScZbRibO37pkx_nGBG0VLcrkvLhOc1B6zNN2rCEOIitsAsZXps8u0rku6oSosclzXWavGEc',
    4: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTdibQdUWMATa00gmdKFoVjC7BNfM_RawIVGDIiig_rOQ9ub-bxZqqnkcCqksuRmhVOcrxmDj9uCZ4xulGhbFR35IkDyYr51IdVG4zi9cixA6StGiqyUaXSqzRJ0P_fxYw2nOpRn8xjG4M51azc3V1uN_9CRWx0YkIppc2TU4_9HsrNYTkh2efeyYftVKysh88dv-RvBMLqXeTxCKbxfwAwqkMS_-LuLfhsujrWvGraQzuhD9p2MTVuPOi4S7B-zgoABng1iIDJM8',
  };

  const coreChapters = curriculumData.filter(n => n.chapter !== 'Side Quest');
  const sideQuests = curriculumData.filter(n => n.chapter === 'Side Quest');

  const activeChapter = coreChapters.find(c => c.id === activeChapterId) || coreChapters[0];

  const handleStartSpecificMission = (node, targetMod) => {
    if (userStats.xp < (node.xp_required || 0)) return;

    setActiveLesson({
      topic: targetMod.title,
      difficulty: node.difficulty_level,
      nodeId: node.id,
      xpReward: targetMod.xp_reward || 20,
      preWrittenTheory: targetMod.theory,
      preWrittenQuestions: targetMod.questions
    });
  };

  const handleStartMission = (node) => {
    if (userStats.xp < (node.xp_required || 0)) return;

    let targetMod = node.modules.find(mod => !completedSubtopics.has(`${node.id}:${mod.title}`));
    if (!targetMod) targetMod = node.modules[node.modules.length - 1]; // Replay last
    
    handleStartSpecificMission(node, targetMod);
  };

  const handleFinishLesson = (earnedXP) => {
    if (activeLesson) {
      const topicKey = `${activeLesson.nodeId}:${activeLesson.topic}`;
      if (!completedSubtopics.has(topicKey)) {
        setCompletedSubtopics(prev => {
          const newSet = new Set(prev);
          newSet.add(topicKey);
          return newSet;
        });
        setUserStats(prev => ({ ...prev, xp: prev.xp + earnedXP }));
      }
    }
    setActiveLesson(null);
  };

  return (
    <div className="bg-background text-on-background font-body-md ninja-grid min-h-screen relative">
      {/* Top Navigation Bar */}
      <header className="bg-[#555555] flex justify-between items-center w-full px-6 py-4 fixed top-0 z-50 border-b-4 border-[#373737] shadow-[0_4px_0px_0px_#111]">
        <div className="flex items-center gap-4">
          <span className="text-xl mc-font text-[#ffffff] drop-shadow-[2px_2px_0px_#000] uppercase tracking-tighter">CRAFTER ACADEMY</span>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <nav className="flex gap-6 mc-font text-xs uppercase tracking-tighter">
            <a className="text-[#5bb33d] hover:text-white transition-colors" href="#">Quests</a>
            <a className="text-[#c6c6c6] hover:text-white transition-colors" href="#">Blueprints</a>
            <a className="text-[#c6c6c6] hover:text-white transition-colors" href="#">Redstone</a>
            <a className="text-[#c6c6c6] hover:text-white transition-colors" href="#">Stats</a>
          </nav>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-stone-900">notifications</span>
            <span className="material-symbols-outlined text-stone-900" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
          </div>
        </div>
      </header>

      <div className="flex pt-20 pb-20 md:pb-0 min-h-screen">
        {/* Sidebar Shell */}
        <aside className="hidden lg:flex flex-col h-[calc(100vh-80px)] w-72 p-4 space-y-6 mc-panel sticky top-20">
            <div className="p-4 mc-panel-inset">
                <div className="flex items-center gap-3">
                    <img alt="Rank Icon" className="w-12 h-12 pixel-rendering" style={{imageRendering: 'pixelated'}} src="/mc_rank.png" />
                    <div>
                        <p className="mc-font text-[10px] uppercase text-white mb-2">Novice Builder</p>
                        <p className="text-[8px] mc-font text-[#5bb33d]">Next: Journeyman</p>
                    </div>
                </div>
                <div className="mt-4 bg-[#111] border-2 border-[#555] h-3 w-full overflow-hidden">
                    <div className="bg-[#5bb33d] h-full" style={{ width: `${chakraPercentage}%` }}></div>
                </div>
            </div>

            <nav className="flex flex-col gap-3">
                <button className="flex items-center gap-3 p-3 mc-button mc-button-green mc-font text-[10px]">
                    <span className="material-symbols-outlined">assignment</span>
                    Quests
                </button>
                <button className="flex items-center gap-3 p-3 mc-button mc-font text-[10px]">
                    <span className="material-symbols-outlined">psychology</span>
                    Redstone
                </button>
                <button className="flex items-center gap-3 p-3 mc-button mc-font text-[10px]">
                    <span className="material-symbols-outlined">map</span>
                    World Map
                </button>
                <button className="flex items-center gap-3 p-3 mc-button mc-font text-[10px]">
                    <span className="material-symbols-outlined">groups</span>
                    Guilds
                </button>
            </nav>

            <button onClick={() => handleStartMission(activeChapter)} className="mt-auto mc-button mc-button-green py-4 px-6 mc-font text-[10px] hover:brightness-110">
                ENTER WORLD
            </button>
        </aside>

        {/* Main Content Canvas */}
        <main className="flex-1 p-6 md:p-8 dirt-bg">
          <div className="max-w-6xl mx-auto space-y-12">
            
            {/* Hero Dashboard Section */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Panel */}
                <div className="lg:col-span-1 mc-panel p-6 relative overflow-hidden group">
                    <div className="relative z-10">
                        <h2 className="mc-font text-[14px] text-white mb-6">RANK: NOVICE</h2>
                        <img alt="Hero Portrait" className="w-full aspect-square object-cover pixel-border mb-4" style={{imageRendering: 'pixelated'}} src="/mc_avatar.png" />
                        <div className="space-y-2 mt-6">
                            <p className="mc-font text-[10px] text-[#c6c6c6]">Exp Levels ({userStats.xp} XP)</p>
                            <div className="h-6 bg-[#111] border-2 border-[#555] flex items-center px-1 overflow-hidden">
                                <div className="h-4 bg-[#5bb33d]" style={{ width: `${chakraPercentage}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Storyline Panels */}
                <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                    {/* Active Chapter */}
                    <div className="col-span-2 mc-panel-inset p-4 relative overflow-hidden group cursor-pointer" onClick={() => setActiveChapterId(activeChapter.id)}>
                        <div className="absolute top-0 right-0 p-3 mc-button-green mc-font text-[10px] text-white z-20">ACTIVE!</div>
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <div className="w-full md:w-1/3 border-4 border-[#111] overflow-hidden">
                                <img alt={activeChapter.topic_name} className="w-full h-48 object-cover opacity-90 group-hover:opacity-100 transition-opacity pixel-rendering" style={{imageRendering: 'pixelated'}} src={activeChapter.id === 1 ? '/mc_banner_forest.png' : activeChapter.id === 2 ? '/mc_banner_nether.png' : '/mc_banner_end.png'} />
                            </div>
                            <div className="flex-1 p-2 text-white">
                                <h3 className="mc-font text-lg mb-4 text-[#ffeb3b]">WORLD 0{activeChapter.id}: {activeChapter.topic_name.toUpperCase()}</h3>
                                <p className="font-['VT323'] text-xl text-[#c6c6c6] mb-6 tracking-wide">{activeChapter.storyDescription}</p>
                                <div className="flex gap-4">
                                    <button onClick={(e) => { e.stopPropagation(); handleStartMission(activeChapter); }} className="mc-button mc-font text-[10px] px-6 py-3">RESUME QUEST</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Next / Locked Chapters */}
                    {coreChapters.filter(c => c.id !== activeChapter.id).slice(0, 2).map((chapter, idx) => {
                        const isLocked = userStats.xp < (chapter.xp_required || 0);
                        return (
                            <div key={chapter.id} onClick={() => !isLocked && setActiveChapterId(chapter.id)} className={`mc-panel p-4 relative ${isLocked ? 'brightness-50 cursor-not-allowed' : 'cursor-pointer hover:brightness-110 transition-all'}`}>
                                {isLocked && (
                                    <div className="absolute inset-0 flex items-center justify-center z-10">
                                        <span className="material-symbols-outlined text-6xl text-white">lock</span>
                                    </div>
                                )}
                                <h4 className="mc-font text-[10px] text-white">WORLD 0{chapter.id}: {chapter.topic_name.toUpperCase()}</h4>
                                <div className="h-32 mc-panel-inset mt-4 flex overflow-hidden border-2 border-[#111]">
                                     <img src={chapter.id === 1 ? '/mc_banner_forest.png' : chapter.id === 2 ? '/mc_banner_nether.png' : '/mc_banner_end.png'} style={{imageRendering: 'pixelated'}} className="w-full h-full object-cover mix-blend-multiply opacity-50" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

          {/* Active Arc Storyboard (Modules Grid) */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <span className="material-symbols-outlined text-4xl text-white">grid_view</span>
              <h2 className="mc-font text-lg text-white">WORLD LEVELS</h2>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeChapter.modules.map((mod, index) => {
                const isCompleted = completedSubtopics.has(`${activeChapter.id}:${mod.title}`);
                const isBoss = mod.isBoss;

                return (
                  <div 
                    key={index} 
                    onClick={() => handleStartSpecificMission(activeChapter, mod)}
                    className={`group relative mc-panel p-6 cursor-pointer hover:brightness-110 transition-all duration-300 ${
                      isBoss 
                        ? 'col-span-1 md:col-span-2 lg:col-span-3 border-[#ff0000] border-t-[#ff6666] border-left-[#ff6666]' 
                        : ''
                    }`}
                  >
                    <div className={`absolute -top-4 -left-4 px-3 py-2 mc-font text-[10px] text-white ${isBoss ? 'mc-button border-[#990000] bg-[#cc0000]' : 'mc-button-green'}`}>
                      {isBoss ? 'BOSS MOB' : `LVL 0${index + 1}`}
                    </div>
                    {isCompleted && (
                      <div className="absolute -top-4 -right-4 mc-button-green px-3 py-2 mc-font text-[10px] text-white z-10">
                        CLEARED
                      </div>
                    )}

                    <div className="mt-4">
                      <h3 className={`font-['VT323'] tracking-wide mb-2 ${isBoss ? 'text-5xl text-[#ff6666]' : 'text-3xl text-white'}`}>{mod.title.toUpperCase()}</h3>
                      <div className={`flex justify-between items-center mt-6 pt-4 border-t-4 border-[#373737]`}>
                         <span className={`mc-font text-[10px] ${isBoss ? 'text-[#ff6666]' : 'text-[#c6c6c6]'}`}>
                           +{mod.xp_reward || 20} XP
                         </span>
                         <span className={`material-symbols-outlined text-2xl ${isCompleted ? 'text-[#5bb33d]' : 'text-white'}`}>
                           {isCompleted ? 'replay' : 'play_circle'}
                         </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Side Quests & Jutsu */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            {/* Secret Scrolls */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-white">
                <span className="material-symbols-outlined text-4xl">menu_book</span>
                <h2 className="mc-font text-lg">ANCIENT BLUEPRINTS</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {sideQuests.map((quest) => {
                  const isLocked = userStats.xp < (quest.xp_required || 0);
                  const isCompleted = quest.modules.every(mod => completedSubtopics.has(`${quest.id}:${mod.title}`));
                  return (
                    <div key={quest.id} onClick={() => !isLocked && handleStartMission(quest)} className={`flex items-center mc-panel p-4 cursor-pointer hover:brightness-110 transition-all ${isLocked ? 'brightness-50 grayscale' : ''}`}>
                      <div className="w-12 h-12 bg-[#111] border-2 border-[#555] flex items-center justify-center text-[#5bb33d]">
                        <span className="material-symbols-outlined">{isLocked ? 'lock' : 'auto_stories'}</span>
                      </div>
                      <div className="ml-4 flex-1 text-white">
                        <p className="mc-font text-[10px] uppercase">{quest.topic_name}</p>
                        <p className="text-[8px] mc-font text-[#c6c6c6] mt-2">{isLocked ? `Requires ${quest.xp_required} XP` : quest.subtitle}</p>
                      </div>
                      {isCompleted ? (
                         <span className="material-symbols-outlined ml-auto text-[#5bb33d]">check_circle</span>
                      ) : (
                         <span className="material-symbols-outlined ml-auto text-[#888]">{isLocked ? 'lock' : 'chevron_right'}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Redstone Engineering */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-white">
                <span className="material-symbols-outlined text-4xl text-[#ff5555]">bolt</span>
                <h2 className="mc-font text-lg">REDSTONE SKILLS</h2>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div onClick={() => handleStartMission(coreChapters[0])} className="mc-panel p-4 text-center cursor-pointer hover:brightness-110 transition-all text-white">
                  <div className="mb-2 text-xl font-['VT323'] tracking-widest text-[#ff5555]">PISTON</div>
                  <span className="material-symbols-outlined text-3xl text-[#ff5555]">settings_overscan</span>
                  <p className="text-[8px] mt-4 mc-font text-[#5bb33d]">READY</p>
                </div>
                <div onClick={() => handleStartMission(coreChapters[1])} className="mc-panel p-4 text-center cursor-pointer brightness-50 transition-all text-white">
                  <div className="mb-2 text-xl font-['VT323'] tracking-widest text-[#5555ff]">REPEATER</div>
                  <span className="material-symbols-outlined text-3xl text-[#5555ff]">memory</span>
                  <p className="text-[8px] mt-4 mc-font text-[#c6c6c6]">LOCKED</p>
                </div>
                <div onClick={() => handleStartMission(coreChapters[2])} className="mc-panel p-4 text-center cursor-pointer brightness-50 transition-all text-white">
                  <div className="mb-2 text-xl font-['VT323'] tracking-widest text-[#55ff55]">OBSERVER</div>
                  <span className="material-symbols-outlined text-3xl text-[#55ff55]">visibility</span>
                  <p className="text-[8px] mt-4 mc-font text-[#c6c6c6]">LOCKED</p>
                </div>
              </div>
            </div>
          </section>

          {/* Achievement Alerts */}
          {chakraPercentage >= 20 && (
              <div className="relative py-12 mt-12">
                  <div className="absolute left-1/2 -translate-x-1/2 -top-4 mc-button-green mc-font text-[10px] px-8 py-4 z-10">
                      LEVEL UP!
                  </div>
                  <div className="mc-panel p-8 text-center text-white">
                      <h3 className="mc-font text-lg mb-6 mt-4 text-[#ffeb3b]">Achievement Get!</h3>
                      <p className="font-['VT323'] text-2xl text-[#c6c6c6]">You have gathered over {userStats.xp} Experience points!</p>
                  </div>
              </div>
          )}
          </div>
        </main>
      </div>

      {/* Bottom Navigation Bar (Mobile Only) */}
      <footer className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 px-2 pb-safe mc-panel shadow-[0_-4px_0px_0px_#111]">
        <a className="flex flex-col items-center justify-center mc-button-green px-4 py-2" href="#">
          <span className="material-symbols-outlined text-white">map</span>
          <span className="mc-font text-[8px] text-white mt-1">Quests</span>
        </a>
        <a className="flex flex-col items-center justify-center text-[#c6c6c6]" href="#">
          <span className="material-symbols-outlined">menu_book</span>
          <span className="mc-font text-[8px] mt-1">Blueprints</span>
        </a>
        <a className="flex flex-col items-center justify-center text-[#c6c6c6]" href="#">
          <span className="material-symbols-outlined">fitness_center</span>
          <span className="mc-font text-[8px] mt-1">Redstone</span>
        </a>
        <a className="flex flex-col items-center justify-center text-[#c6c6c6]" href="#">
          <span className="material-symbols-outlined">bar_chart</span>
          <span className="mc-font text-[8px] mt-1">Stats</span>
        </a>
      </footer>

      {/* Active Lesson Modal Overlay */}
      <AnimatePresence>
        {activeLesson && (
          <LessonOverlay 
            topic={activeLesson.topic}
            difficulty={activeLesson.difficulty}
            xpReward={activeLesson.xpReward}
            preWrittenTheory={activeLesson.preWrittenTheory}
            preWrittenQuestions={activeLesson.preWrittenQuestions}
            onClose={() => setActiveLesson(null)}
            onFinish={handleFinishLesson}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
