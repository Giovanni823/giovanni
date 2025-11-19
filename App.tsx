import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { UploadArea } from './components/UploadArea';
import { ResultsView } from './components/ResultsView';
import { AppState, AnalysisResult } from './types';
import { analyzeImage } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.HOME);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Full Data URL
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleFileSelect = useCallback(async (file: File) => {
    try {
      setAppState(AppState.ANALYZING);
      setError(null);

      // Create a FileReader to get the Data URL for preview
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        if (typeof reader.result === 'string') {
            const fullDataUrl = reader.result;
            setSelectedImage(fullDataUrl);
            
            // Extract base64 for API
            const base64 = fullDataUrl.split(',')[1];
            
            try {
              const result = await analyzeImage(base64, file.type);
              setAnalysisResult(result);
              setAppState(AppState.RESULTS);
            } catch (apiError) {
              console.error(apiError);
              setError("We couldn't analyze this image. It might be blurry or unsupported.");
              setAppState(AppState.ERROR);
            }
        }
      };

      reader.onerror = () => {
        setError("Failed to read the file.");
        setAppState(AppState.ERROR);
      };

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setAppState(AppState.ERROR);
    }
  }, []);

  const resetApp = () => {
    setAppState(AppState.HOME);
    // We keep selectedImage briefly if we want to animate out, but here we clear it
    setTimeout(() => {
      setSelectedImage(null);
      setAnalysisResult(null);
      setError(null);
    }, 300);
  };

  return (
    <div className={isDarkMode ? 'dark h-full' : 'h-full'}>
      {/* Main Container - Full width/height with responsive constraints */}
      <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
        
        {/* Header remains visible to maintain context */}
        <Header 
          resetApp={resetApp} 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode} 
        />

        <main className="flex-1 flex flex-col overflow-hidden relative w-full max-w-7xl mx-auto">
          
          {appState === AppState.HOME && (
            <UploadArea onFileSelect={handleFileSelect} />
          )}

          {appState === AppState.ANALYZING && (
             <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in">
                <div className="relative w-32 h-32 mb-8">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-700"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <span className="text-4xl animate-bounce">🧠</span>
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-3">Analyzing...</h3>
                <p className="text-slate-500 dark:text-slate-400 text-lg max-w-md">
                  Identifying the problem, solving the math, and finding the best explanation for you.
                </p>
             </div>
          )}

          {appState === AppState.RESULTS && analysisResult && (
            <ResultsView 
              result={analysisResult} 
              onBack={resetApp} 
              imageSrc={selectedImage} 
            />
          )}

          {appState === AppState.ERROR && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
               <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12 text-red-500 dark:text-red-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008h-.008v-.008Z" />
                  </svg>
               </div>
               <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">Analysis Failed</h3>
               <p className="text-slate-500 dark:text-slate-400 mb-8 text-lg max-w-md">{error}</p>
               <button onClick={resetApp} className="bg-primary-600 hover:bg-primary-700 text-white px-10 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                 Try Again
               </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;