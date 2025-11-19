import React, { useState } from 'react';
import { AnalysisResult, PracticeQuestion } from '../types';

interface ResultsViewProps {
  result: AnalysisResult;
  onBack: () => void;
  imageSrc: string | null;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ result, onBack, imageSrc }) => {
  const [activeTab, setActiveTab] = useState<'solution' | 'concept' | 'practice'>('solution');

  return (
    <div className="flex flex-col md:flex-row h-full bg-slate-50 dark:bg-slate-900 overflow-hidden transition-colors duration-300">
      
      {/* Desktop: Left Panel (Image & Context) */}
      <div className="hidden md:flex w-[350px] lg:w-[400px] flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 h-full overflow-y-auto">
         <div className="p-6 space-y-6">
            {/* Header Context */}
            <div className="flex items-center gap-3">
               <span className="text-4xl bg-slate-100 dark:bg-slate-700 w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm">{result.emoji}</span>
               <div>
                 <h2 className="text-xs font-bold text-primary-600 dark:text-primary-400 tracking-wider uppercase">{result.subject}</h2>
                 <h1 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">{result.topic}</h1>
               </div>
            </div>

            {/* Source Image Preview */}
            {imageSrc && (
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700 relative group">
                 <img src={imageSrc} alt="Original Problem" className="w-full h-auto object-cover" />
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
              </div>
            )}

            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
               <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Quick Summary</h3>
               <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                 {result.explanation.substring(0, 100)}...
               </p>
            </div>
            
            <button 
              onClick={onBack}
              className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Analyze New Photo
            </button>
         </div>
      </div>

      {/* Main Content Area (Mobile & Desktop Right Panel) */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Mobile Header (Hidden on MD) */}
        <div className="md:hidden bg-white dark:bg-slate-800 px-6 py-6 pb-4 shadow-sm z-10 transition-colors border-b border-slate-100 dark:border-slate-700 flex justify-between items-start">
          <div className="flex items-center gap-3 mb-2">
             <span className="text-3xl">{result.emoji}</span>
             <div>
               <h2 className="text-xs font-bold text-primary-600 dark:text-primary-400 tracking-wider uppercase">{result.subject}</h2>
               <h1 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">{result.topic}</h1>
             </div>
          </div>
          <button onClick={onBack} className="p-2 bg-slate-100 dark:bg-slate-700 rounded-full text-slate-500 dark:text-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 px-4 md:px-8 transition-colors shrink-0">
          <button 
            onClick={() => setActiveTab('solution')}
            className={`flex-1 md:flex-none md:w-32 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'solution' ? 'border-primary-600 text-primary-700 dark:text-primary-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
          >
            Solution
          </button>
          <button 
            onClick={() => setActiveTab('concept')}
            className={`flex-1 md:flex-none md:w-32 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'concept' ? 'border-primary-600 text-primary-700 dark:text-primary-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
          >
            Concept
          </button>
          <button 
            onClick={() => setActiveTab('practice')}
            className={`flex-1 md:flex-none md:w-32 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === 'practice' ? 'border-primary-600 text-primary-700 dark:text-primary-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
          >
            Practice
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 pb-24 no-scrollbar max-w-4xl mx-auto w-full">
          
          {/* Solution Tab */}
          {activeTab === 'solution' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-lg">Step-by-Step Breakdown</h3>
              </div>
              {result.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4 md:gap-6 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 font-bold flex items-center justify-center text-base shadow-sm group-hover:scale-110 transition-transform">
                    {idx + 1}
                  </div>
                  <div className="flex-1 bg-white dark:bg-slate-800 p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 transition-all hover:shadow-md text-lg leading-relaxed">
                    {step}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Concept Tab */}
          {activeTab === 'concept' && (
            <div className="animate-fade-in space-y-6">
              <div className="bg-indigo-900 dark:bg-indigo-950 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden transition-colors">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full translate-x-20 -translate-y-20 blur-3xl"></div>
                 <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500 opacity-20 rounded-full -translate-x-10 translate-y-10 blur-2xl"></div>
                 
                 <h3 className="font-bold text-2xl mb-4 flex items-center gap-3 relative z-10">
                  <span className="p-2 bg-indigo-800 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                    </svg>
                  </span>
                  Core Concept
                 </h3>
                 <p className="text-indigo-50 leading-relaxed text-xl font-light relative z-10">
                   {result.explanation}
                 </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-2xl p-6 transition-colors">
                   <h4 className="font-bold text-orange-800 dark:text-orange-300 mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Key Takeaway
                   </h4>
                   <p className="text-orange-700 dark:text-orange-200/80">
                     Mastering {result.topic.toLowerCase()} is essential for solving more complex problems in {result.subject}.
                   </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-6 transition-colors">
                   <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                       <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                     </svg>
                      Academic Tip
                   </h4>
                   <p className="text-blue-700 dark:text-blue-200/80">
                     Try writing out the steps yourself without looking at the solution to reinforce memory.
                   </p>
                </div>
              </div>
            </div>
          )}

          {/* Practice Tab */}
          {activeTab === 'practice' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 px-1 text-lg">Test your knowledge</h3>
              <div className="grid grid-cols-1 gap-6">
                {result.practiceQuestions.map((q, idx) => (
                  <PracticeCard key={idx} question={q} index={idx} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Sticky Footer Action (Hidden on Desktop) */}
        <div className="md:hidden absolute bottom-6 right-6 z-20">
          <button 
            onClick={onBack}
            className="bg-slate-900 dark:bg-primary-600 hover:bg-slate-800 dark:hover:bg-primary-700 text-white rounded-full p-4 shadow-xl transform transition hover:scale-105 flex items-center gap-2 pr-6"
          >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
             </svg>
             <span className="font-semibold">Snap Another</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper Sub-component for Practice
const PracticeCard: React.FC<{ question: PracticeQuestion; index: number }> = ({ question, index }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-md">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
            <span className="inline-block py-1 px-3 rounded-full bg-slate-100 dark:bg-slate-700 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Question {index + 1}</span>
        </div>
        <p className="text-slate-800 dark:text-slate-200 font-medium mb-6 text-lg">{question.question}</p>
        
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${showAnswer ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
           <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800/30 mb-2 transition-colors">
              <p className="text-green-800 dark:text-green-300 text-base font-medium"><span className="font-bold">Answer:</span> {question.answer}</p>
              {question.hint && <p className="text-green-600 dark:text-green-400/80 text-sm mt-2 italic">💡 Hint: {question.hint}</p>}
           </div>
        </div>
      </div>
      
      <button 
        onClick={() => setShowAnswer(!showAnswer)}
        className="w-full bg-slate-50 dark:bg-slate-800/80 py-4 text-sm font-bold text-primary-600 dark:text-primary-400 border-t border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
      >
        {showAnswer ? (
            <>Hide Answer</>
        ) : (
            <>Reveal Answer</>
        )}
      </button>
    </div>
  );
};