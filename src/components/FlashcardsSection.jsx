import React, { useState } from 'react';
import { 
  Sparkles, 
  RotateCw, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Lightbulb, 
  BookOpen, 
  Shuffle, 
  Layers,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FlashcardsSection({
  flashcards,
  onGainExp,
  learnedCardIds = [],
  onToggleLearnedCard
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('all');

  const subjects = ['all', 'Data Structures & Algorithms', 'Operating Systems', 'Database Management Systems', 'Analog Electronics'];

  const filteredCards = flashcards.filter((card) => {
    if (selectedSubject === 'all') return true;
    return card.subject === selectedSubject;
  });

  const activeCard = filteredCards[currentIndex] || filteredCards[0];
  const isLearned = activeCard ? learnedCardIds.includes(activeCard.id) : false;

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    setCurrentIndex(randomIndex);
  };

  const handleGotIt = () => {
    if (!isLearned && activeCard) {
      onToggleLearnedCard(activeCard.id);
      onGainExp(5, 'Mastered Flashcard Concept (+5 EXP)');
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.65 }
      });
    }
  };

  return (
    <section className="py-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-xl border border-purple-800/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-bold mb-3 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Precise Short Notes & Cram Cards</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Exam Flashcards (Last-Minute Revision)
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Flip through short notes, formulas, and high-yield definitions right before your exam. Memorize critical edge cases in seconds!
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-xl flex items-center gap-4 text-xs">
            <div>
              <div className="text-2xl font-black text-purple-300">{learnedCardIds.length} / {flashcards.length}</div>
              <div className="text-slate-300 text-[11px]">Concepts Mastered</div>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div>
              <div className="text-2xl font-black text-indigo-300">+5 EXP</div>
              <div className="text-slate-300 text-[11px]">Per Card Learned</div>
            </div>
          </div>
        </div>

        {/* Subject Filter Pills */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center gap-2">
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => {
                setSelectedSubject(sub);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                selectedSubject === sub
                  ? 'bg-purple-500 text-white font-bold shadow-md'
                  : 'bg-white/10 hover:bg-white/15 text-slate-300'
              }`}
            >
              {sub === 'all' ? 'All Subjects' : sub}
            </button>
          ))}
        </div>
      </div>

      {/* Main Flashcard Container */}
      {activeCard ? (
        <div className="max-w-2xl mx-auto">
          {/* Card Meta Bar */}
          <div className="flex items-center justify-between mb-3 text-xs text-slate-600 px-1">
            <span className="font-bold">
              Card {currentIndex + 1} of {filteredCards.length}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShuffle}
                className="flex items-center gap-1 text-slate-500 hover:text-indigo-600 font-semibold"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Shuffle</span>
              </button>
              <span className="text-slate-300">•</span>
              <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                {activeCard.code}
              </span>
            </div>
          </div>

          {/* Interactive Flashcard with Flip Animation */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className={`min-h-[340px] rounded-3xl p-8 cursor-pointer transition-all duration-300 flex flex-col justify-between border-2 shadow-lg relative ${
              isFlipped
                ? 'bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white border-indigo-700'
                : 'bg-white text-slate-900 border-slate-200 hover:border-purple-400 hover:shadow-xl'
            }`}
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between">
              <span className={`text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                isFlipped ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-400/30' : 'bg-purple-50 text-purple-700 border border-purple-200'
              }`}>
                {activeCard.topic}
              </span>

              <div className="flex items-center gap-1.5 text-xs font-semibold opacity-75">
                <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
                <span>{isFlipped ? 'Click to view question' : 'Click to flip for answer'}</span>
              </div>
            </div>

            {/* Card Content */}
            <div className="my-auto py-6">
              {!isFlipped ? (
                /* FRONT: QUESTION */
                <div className="space-y-4 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto shadow-xs font-bold text-lg">
                    ?
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black leading-snug max-w-xl mx-auto">
                    {activeCard.question}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Tap anywhere on the card to flip and check concise notes
                  </p>
                </div>
              ) : (
                /* BACK: CONCISE ANSWER & NOTES */
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-wide">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>Precise Short Notes:</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans bg-white/5 p-3 rounded-xl border border-white/10">
                    {activeCard.answerSummary}
                  </p>

                  <div className="space-y-1.5">
                    {activeCard.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="text-xs text-indigo-200 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0"></span>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {activeCard.nithTip && (
                    <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                      <span><b>NITH Exam Tip:</b> {activeCard.nithTip}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Card Footer */}
            <div className="flex items-center justify-between text-xs pt-4 border-t border-current/10">
              <span className="font-semibold opacity-70">
                {activeCard.subject}
              </span>
              <span className="font-bold">
                {isFlipped ? 'Answer Side' : 'Question Side'}
              </span>
            </div>
          </div>

          {/* Navigation & Action Controls */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-xs transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleGotIt}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all active:scale-95 ${
                isLearned
                  ? 'bg-emerald-600 text-white'
                  : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isLearned ? 'Mastered!' : 'Got It! (+5 EXP)'}</span>
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-xs transition-all"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
