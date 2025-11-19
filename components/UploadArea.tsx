import React, { useRef, useState } from 'react';

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
}

export const UploadArea: React.FC<UploadAreaProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row items-center justify-center p-6 md:p-12 gap-8 md:gap-16 h-full">
      
      {/* Hero Section (Text) */}
      <div className="flex-1 max-w-lg text-center md:text-left space-y-6">
        <div className="inline-block p-2 px-4 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-semibold text-sm tracking-wide mb-2">
          ✨ AI Homework Assistant
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
          Stuck on a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-primary-400 dark:to-indigo-400">problem?</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-relaxed">
          Snap a photo or upload a screenshot. Get step-by-step solutions, clear explanations, and practice questions in seconds.
        </p>
        
        {/* Feature Pills for Desktop */}
        <div className="hidden md:flex gap-4 text-sm font-medium text-slate-500 dark:text-slate-400 pt-4">
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <span className="w-2 h-2 rounded-full bg-green-400"></span> Math
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span> Science
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <span className="w-2 h-2 rounded-full bg-orange-400"></span> History
          </div>
        </div>
      </div>

      {/* Upload Card */}
      <div 
        className={`
          w-full max-w-md aspect-[4/5] md:aspect-square lg:aspect-[4/3] 
          bg-white dark:bg-slate-800 rounded-3xl shadow-2xl 
          border-2 border-dashed 
          flex flex-col items-center justify-center relative overflow-hidden group 
          transition-all duration-300
          ${isDragging 
            ? 'border-primary-500 bg-primary-50 dark:bg-slate-800 scale-[1.02]' 
            : 'border-slate-200 dark:border-slate-600 hover:border-primary-400 dark:hover:border-primary-500'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 z-0 transition-colors duration-300" />
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 rounded-full bg-primary-100 dark:bg-primary-900/20 opacity-50 z-0 blur-3xl transition-colors" />
        <div className="absolute bottom-[-30px] left-[-30px] w-48 h-48 rounded-full bg-blue-100 dark:bg-blue-900/20 opacity-50 z-0 blur-2xl transition-colors" />

        {/* Content */}
        <div className="z-10 flex flex-col items-center space-y-8 text-center px-6">
          <div className={`
            w-24 h-24 rounded-full flex items-center justify-center shadow-inner mb-2 transition-all duration-300
            ${isDragging ? 'bg-primary-100 dark:bg-primary-900/50 scale-110' : 'bg-slate-100 dark:bg-slate-700'}
          `}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-primary-600 dark:text-primary-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
            </svg>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transform transition hover:-translate-y-1 flex items-center justify-center gap-3 w-full md:w-auto whitespace-nowrap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 0011.586 4H8.414a1 1 0 00-.707.293L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              <span className="text-lg">Take Photo / Upload</span>
            </button>
            <p className="text-sm text-slate-400 dark:text-slate-500 font-medium pt-2">
               or drag and drop here
            </p>
          </div>
        </div>
      </div>

      {/* Hidden Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />
      
      {/* Mobile feature pills */}
      <div className="md:hidden mt-2 flex gap-4 text-slate-400 dark:text-slate-500 text-sm">
         <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400"></span> Math</div>
         <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400"></span> Science</div>
         <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-400"></span> History</div>
      </div>
    </div>
  );
};