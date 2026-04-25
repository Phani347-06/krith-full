import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import confetti from 'canvas-confetti';

// XP awarded per correct answer by question type
const XP_RULES = { mcq: 20, fill_blank: 30, coding: 50 };
const PASS_THRESHOLD = 0.6; // 60% of max possible XP to pass

const LessonOverlay = ({ topic, difficulty, onClose, onFinish, preWrittenTheory, preWrittenQuestions, xpReward = 100 }) => {
  const [stage, setStage] = useState('theory');
  const [lessonData, setLessonData] = useState({
    theory: preWrittenTheory || 'Lesson content coming soon...',
    questions: preWrittenQuestions || []
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [earnedXP, setEarnedXP] = useState(0);
  const [xpBreakdown, setXpBreakdown] = useState([]);
  const [passed, setPassed] = useState(false);
  const fillInputRef = useRef(null);

  // Max possible XP for this lesson
  const maxPossibleXP = (preWrittenQuestions || []).reduce((sum, q) => {
    const qType = q.type || q.question_type;
    return sum + (XP_RULES[qType] || 20);
  }, 0);

  // Sync state when a new lesson is opened
  useEffect(() => {
    if (preWrittenTheory) {
      setLessonData({ theory: preWrittenTheory, questions: preWrittenQuestions || [] });
      setStage('theory');
      setErrorMessage(null);
      setEarnedXP(0);
      setXpBreakdown([]);
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setFeedback(null);
      setPassed(false);
    } else {
      setErrorMessage("This mission's intelligence files are still being decrypted. Check back soon!");
      setStage('error');
    }
  }, [preWrittenTheory, preWrittenQuestions]);

  // Auto-focus fill-in-blank input when question changes
  useEffect(() => {
    if (stage === 'quiz' && fillInputRef.current) {
      setTimeout(() => fillInputRef.current?.focus(), 100);
    }
  }, [currentQuestionIndex, stage]);

  const handleNextStage = () => {
    if (stage === 'theory') {
      setStage('quiz');
    } else if (stage === 'quiz') {
      if (currentQuestionIndex < (lessonData?.questions?.length || 0) - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setFeedback(null);
      } else {
        // Quiz done — check pass threshold
        // earnedXP state updates asynchronously, so compute from breakdown
        const totalEarned = xpBreakdown.reduce((s, b) => s + b.xpGained, 0);
        const hasPassed = maxPossibleXP === 0 || totalEarned >= maxPossibleXP * PASS_THRESHOLD;
        setPassed(hasPassed);
        setStage('summary');
        if (hasPassed) {
          confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#078a52', '#84e7a5', '#000000'] });
        }
      }
    }
  };

  const handleAnswer = (answer) => {
    if (feedback || !lessonData?.questions?.[currentQuestionIndex]) return;

    const currentQuestion = lessonData.questions[currentQuestionIndex];
    const qType = currentQuestion.type || currentQuestion.question_type;
    // Case-insensitive, trimmed comparison for fill-in-blank
    const isCorrect = answer.trim().toLowerCase() === currentQuestion.correct_answer.trim().toLowerCase();
    const xpGained = isCorrect ? (XP_RULES[qType] || 20) : 0;

    const newTotal = earnedXP + xpGained;
    setEarnedXP(newTotal);
    setXpBreakdown(prev => [...prev, { qType, isCorrect, xpGained }]);

    setFeedback({
      correct: isCorrect,
      xpGained,
      correctAnswer: currentQuestion.correct_answer,
      message: isCorrect
        ? `🎯 Correct! +${xpGained} XP`
        : `❌ Not quite. The correct answer was: "${currentQuestion.correct_answer}"`
    });

    setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: answer }));
  };

  // ── Loading ──────────────────────────────────────────────────────────
  if (stage === 'loading') {
    return (
      <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-16 h-16 border-4 border-stone-100 border-t-black rounded-full mb-6" />
        <p className="font-display-secondary text-lg font-black uppercase tracking-widest animate-pulse">Forging Your Quest...</p>
      </div>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────
  if (stage === 'error') {
    return (
      <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-10 text-center">
        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-3xl flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-4xl">warning</span>
        </div>
        <h2 className="text-2xl font-black mb-4 uppercase tracking-tight">Quest Interrupted</h2>
        <p className="text-stone-500 max-w-md mb-10 leading-relaxed">
          {errorMessage || 'We encountered a glitch. Check back soon!'}
        </p>
        <div className="flex gap-4">
          <button onClick={onClose} className="px-10 py-4 bg-stone-100 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-stone-200 transition-all">Dismiss</button>
        </div>
      </div>
    );
  }

  const currentQuestion = lessonData?.questions?.[currentQuestionIndex];
  const qType = currentQuestion ? (currentQuestion.type || currentQuestion.question_type) : null;
  const selectedAnswer = userAnswers[currentQuestionIndex];

  // Helper to get MCQ button style
  const getMCQStyle = (opt) => {
    if (!selectedAnswer) return 'bg-stone-50 border-stone-200 hover:border-black hover:bg-stone-100';
    const isCorrectOpt = opt === feedback?.correctAnswer;
    const isSelected = opt === selectedAnswer;
    if (isCorrectOpt) return 'bg-green-500 border-green-600 text-white shadow-lg';
    if (isSelected && !isCorrectOpt) return 'bg-red-500 border-red-600 text-white';
    return 'bg-stone-50 border-stone-100 opacity-50';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] stone-bg flex flex-col"
    >
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="shrink-0 z-10 bg-[#555] border-b-4 border-[#373737] px-10 py-5 flex justify-between items-center shadow-[0_4px_0_0_#111]">
        <div className="flex items-center gap-4">
          <span className="mc-font text-[10px] uppercase tracking-widest text-[#ffeb3b]">Active Quest</span>
          <h2 className="font-['VT323'] text-4xl tracking-widest text-white">{topic}</h2>
        </div>
        <div className="flex items-center gap-6">
          {stage === 'quiz' && lessonData?.questions && (
            <div className="flex items-center gap-2">
              {lessonData.questions.map((_, i) => (
                <div key={i} className={`w-3 h-3 border-2 transition-all ${
                  xpBreakdown[i]
                    ? (xpBreakdown[i].isCorrect ? 'bg-[#5bb33d] border-[#3c8527]' : 'bg-[#ff5555] border-[#990000]')
                    : i === currentQuestionIndex ? 'bg-white border-[#373737]' : 'bg-transparent border-[#888]'
                }`} />
              ))}
            </div>
          )}
          {/* Live XP counter */}
          {stage === 'quiz' && (
            <span className="mc-font text-[10px] text-[#5bb33d] bg-[#111] px-4 py-3 border-2 border-[#555]">
              {earnedXP} XP
            </span>
          )}
          <button onClick={onClose} className="w-10 h-10 mc-button flex items-center justify-center hover:brightness-110 transition-all">
            <span className="material-symbols-outlined text-white">close</span>
          </button>
        </div>
      </header>

      {/* ── Scrollable body ─────────────────────────────────────────── */}
      <div style={{ height: 'calc(100vh - 73px)', overflowY: 'auto' }}>
        <main className="max-w-3xl mx-auto px-8 py-12">
          <AnimatePresence mode="wait">

            {/* ── Theory ─────────────────────────────────────────────── */}
            {stage === 'theory' && (
              <motion.div key="theory" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="space-y-10">
                <div className="mc-panel p-8 text-white prose prose-invert max-w-none prose-headings:font-['VT323'] prose-headings:text-3xl prose-p:font-['VT323'] prose-p:text-xl prose-code:bg-[#111] prose-code:px-2 prose-code:py-1">
                  <ReactMarkdown>{lessonData.theory}</ReactMarkdown>
                </div>
                <button
                  onClick={handleNextStage}
                  disabled={!lessonData?.questions?.length}
                  className="w-full py-6 mc-button-green mc-font text-lg disabled:opacity-50 hover:brightness-110 transition-all"
                >
                  {lessonData?.questions?.length ? "START QUEST ⚔️" : 'LOADING...'}
                </button>
              </motion.div>
            )}

            {/* ── Quiz ───────────────────────────────────────────────── */}
            {stage === 'quiz' && currentQuestion && (
              <motion.div key={`q-${currentQuestionIndex}`} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="space-y-6">

                <div className="mc-panel p-10 text-white">
                  <p className="mc-font text-[10px] text-[#c6c6c6] mb-4">
                    Quest Level {currentQuestionIndex + 1} of {lessonData.questions.length}
                    <span className="ml-4 text-[#888]">|</span>
                    <span className="ml-4 text-[#ffeb3b]">{qType === 'fill_blank' ? 'Fill Blank' : qType?.toUpperCase()} · +{XP_RULES[qType] || 20} XP</span>
                  </p>
                  <h3 className="font-['VT323'] text-4xl mb-8 leading-tight tracking-wide">{currentQuestion.question_text}</h3>

                  {/* MCQ options */}
                  {qType === 'mcq' && (
                    <div className="grid grid-cols-1 gap-3">
                      {currentQuestion.options?.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleAnswer(opt)}
                          disabled={!!selectedAnswer}
                          className={`w-full p-5 text-left mc-button transition-all text-sm font-['VT323'] text-xl tracking-widest ${
                            selectedAnswer ? '' : 'hover:brightness-110'
                          } ${
                            selectedAnswer && opt === feedback?.correctAnswer ? '!bg-[#5bb33d] !border-[#3c8527]' : ''
                          } ${
                            selectedAnswer && opt === selectedAnswer && opt !== feedback?.correctAnswer ? '!bg-[#ff5555] !border-[#990000]' : ''
                          }`}
                        >
                          <span className="inline-block w-7 h-7 bg-[#111] border-2 border-[#555] text-center text-xs mc-font leading-7 mr-3 text-white">
                            {['A','B','C','D'][i]}
                          </span>
                          {opt}
                          {/* Show tick/cross icons after answering */}
                          {selectedAnswer && opt === feedback?.correctAnswer && (
                            <span className="float-right material-symbols-outlined text-white">check_circle</span>
                          )}
                          {selectedAnswer && opt === selectedAnswer && opt !== feedback?.correctAnswer && (
                            <span className="float-right material-symbols-outlined text-white">cancel</span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Fill in the blank */}
                  {qType === 'fill_blank' && (
                    <div className="space-y-4">
                      <input
                        ref={fillInputRef}
                        type="text"
                        placeholder="Type answer & press Enter..."
                        disabled={!!selectedAnswer}
                        className={`w-full p-5 mc-panel-inset font-['VT323'] text-2xl text-white outline-none transition-all ${
                          selectedAnswer
                            ? (feedback?.correct ? '!border-[#5bb33d]' : '!border-[#ff5555]')
                            : 'focus:border-[#ffeb3b]'
                        }`}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleAnswer(e.target.value); }}
                      />
                      {!selectedAnswer && (
                        <p className="mc-font text-[8px] text-[#c6c6c6] text-center">Press Enter to Craft</p>
                      )}
                    </div>
                  )}

                  {/* Coding question */}
                  {qType === 'coding' && (
                    <div className="bg-[#111] text-white p-6 border-4 border-[#373737] font-['VT323'] text-xl space-y-4">
                      <p className="text-[#5bb33d]">// Coding Challenge — +50 XP</p>
                      <pre className="overflow-x-auto whitespace-pre-wrap text-[#c6c6c6]">{currentQuestion.starter_code}</pre>
                      <button
                        onClick={() => handleAnswer(currentQuestion.correct_answer || 'coding_complete')}
                        disabled={!!selectedAnswer}
                        className="w-full py-3 mc-button-green mc-font text-[10px] disabled:opacity-50"
                      >
                        ✓ Mark Complete
                      </button>
                    </div>
                  )}
                </div>

                {/* Feedback bar */}
                {feedback && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className={`p-6 border-4 flex items-center justify-between gap-4 ${feedback.correct ? 'bg-[#5bb33d] border-[#3c8527] text-white' : 'bg-[#ff5555] border-[#990000] text-white'}`}
                  >
                    <div>
                      <p className={`mc-font text-xs`}>
                        {feedback.message}
                      </p>
                      <p className="text-[10px] mc-font mt-2 text-[#eee]">
                        Total: <span className="text-[#ffeb3b]">{earnedXP} / {maxPossibleXP} XP</span>
                      </p>
                    </div>
                    <button
                      onClick={handleNextStage}
                      className="shrink-0 px-8 py-4 mc-button mc-font text-xs hover:brightness-110 transition-all"
                    >
                      NEXT →
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* ── Summary ────────────────────────────────────────────── */}
            {stage === 'summary' && (
              <motion.div key="summary" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-8">

                {/* Pass or Fail badge */}
                <div className={`w-32 h-32 flex items-center justify-center mx-auto border-4 border-white ${passed ? 'bg-[#5bb33d]' : 'bg-[#ff5555]'}`}>
                  <span className="material-symbols-outlined text-white text-6xl">
                    {passed ? 'emoji_events' : 'sentiment_dissatisfied'}
                  </span>
                </div>

                <div>
                  <h2 className="mc-font text-2xl mb-4 text-[#ffeb3b] text-shadow-[2px_2px_0px_#000]">{passed ? 'Quest Cleared! 🎉' : 'You Died...'}</h2>
                  <p className="font-['VT323'] text-3xl text-white">
                    {passed
                      ? `You survived ${topic} with ${earnedXP}/${maxPossibleXP} XP!`
                      : `You scored ${earnedXP}/${maxPossibleXP} XP. You need ${Math.ceil(maxPossibleXP * PASS_THRESHOLD)} XP to respawn.`}
                  </p>
                </div>

                {/* XP Breakdown table */}
                <div className="mc-panel p-8 text-left space-y-3">
                  <p className="mc-font text-[10px] text-[#c6c6c6] mb-4 text-center">Quest Log</p>
                  {xpBreakdown.map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-1">
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 flex items-center justify-center mc-font text-[8px] text-white ${item.isCorrect ? 'bg-[#5bb33d] border-2 border-[#3c8527]' : 'bg-[#ff5555] border-2 border-[#990000]'}`}>
                          {item.isCorrect ? 'V' : 'X'}
                        </span>
                        <span className="font-['VT323'] text-2xl text-white uppercase tracking-wider">
                          Q{i + 1} · {item.qType === 'fill_blank' ? 'Fill Blank' : item.qType?.toUpperCase()}
                        </span>
                      </div>
                      <span className={`mc-font text-[10px] ${item.isCorrect ? 'text-[#5bb33d]' : 'text-[#888]'}`}>
                        {item.isCorrect ? `+${item.xpGained} XP` : '0 XP'}
                      </span>
                    </div>
                  ))}
                  <div className="border-t-4 border-[#373737] pt-4 mt-4 flex justify-between items-center">
                    <span className="mc-font text-[10px] text-white">Total</span>
                    <span className={`mc-font text-xs ${passed ? 'text-[#5bb33d]' : 'text-[#ff5555]'}`}>
                      {earnedXP} / {maxPossibleXP} XP
                    </span>
                  </div>
                  <div className="w-full h-4 bg-[#111] border-2 border-[#555] overflow-hidden mt-2">
                    <div
                      className={`h-full transition-all ${passed ? 'bg-[#5bb33d]' : 'bg-[#ff5555]'}`}
                      style={{ width: `${maxPossibleXP ? (earnedXP / maxPossibleXP) * 100 : 0}%` }}
                    />
                  </div>
                  <p className="text-[8px] mc-font text-center text-[#c6c6c6] mt-2">
                    {maxPossibleXP ? Math.round((earnedXP / maxPossibleXP) * 100) : 0}% · Threshold: 60%
                  </p>
                </div>

                {/* Action buttons */}
                {passed ? (
                  <button
                    onClick={() => onFinish(earnedXP)}
                    className="w-full py-5 mc-button-green mc-font text-[10px] hover:brightness-110 transition-all"
                  >
                    ENTER NEXT WORLD
                  </button>
                ) : (
                  <div className="flex gap-4">
                    <button
                      onClick={onClose}
                      className="flex-1 py-5 mc-button mc-font text-[10px] hover:brightness-110 transition-all"
                    >
                      EXIT TO TITLE
                    </button>
                    <button
                      onClick={() => {
                        setStage('theory');
                        setCurrentQuestionIndex(0);
                        setUserAnswers({});
                        setFeedback(null);
                        setEarnedXP(0);
                        setXpBreakdown([]);
                        setPassed(false);
                      }}
                      className="flex-1 py-5 mc-button-green mc-font text-[10px] hover:brightness-110 transition-all"
                    >
                      RESPAWN
                    </button>
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>
    </motion.div>
  );
};

export default LessonOverlay;
