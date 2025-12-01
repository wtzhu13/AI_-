import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ResultDisplayProps {
  imageSrc: string;
  resultText: string;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ imageSrc, resultText, onReset }) => {
  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-up">
      <div className="bg-stone-800 rounded-2xl overflow-hidden shadow-2xl border border-stone-700">
        <div className="relative h-48 sm:h-64 bg-black">
          <img 
            src={imageSrc} 
            alt="User Face" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 to-transparent"></div>
          <div className="absolute bottom-4 left-6">
            <h2 className="text-2xl font-serif text-amber-400 font-bold">面相解析报告</h2>
            <div className="h-1 w-12 bg-amber-600 mt-1"></div>
          </div>
        </div>
        
        <div className="p-6 sm:p-8">
          <div className="prose prose-invert prose-stone prose-headings:text-amber-200 prose-headings:font-serif prose-p:leading-relaxed prose-strong:text-amber-100 max-w-none">
            <ReactMarkdown>{resultText}</ReactMarkdown>
          </div>
        </div>

        <div className="p-6 bg-stone-900/50 border-t border-stone-800 text-center">
          <button
            onClick={onReset}
            className="px-8 py-3 bg-transparent border border-amber-600 text-amber-500 hover:bg-amber-600 hover:text-white rounded-full transition-all duration-300 font-medium"
          >
            测算下一位
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
