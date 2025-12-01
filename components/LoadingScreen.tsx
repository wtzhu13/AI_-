import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-stone-700 rounded-full"></div>
        <div className="absolute inset-0 border-t-4 border-amber-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">☯</span>
        </div>
      </div>
      <h3 className="text-xl font-serif text-amber-100 mb-2">大师正在凝神推演...</h3>
      <p className="text-stone-400 text-sm animate-pulse">观气色，定乾坤</p>
    </div>
  );
};

export default LoadingScreen;
