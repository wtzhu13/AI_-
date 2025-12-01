import React, { useState } from 'react';
import { AppStatus, BirthDetails } from './types';
import { analyzeFace } from './services/geminiService';
import ImageUploader from './components/ImageUploader';
import CameraCapture from './components/CameraCapture';
import LoadingScreen from './components/LoadingScreen';
import ResultDisplay from './components/ResultDisplay';
import BaziInput from './components/BaziInput';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [result, setResult] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  
  const [birthDetails, setBirthDetails] = useState<BirthDetails>({
    year: '',
    month: '',
    day: '',
    hour: ''
  });

  const handleImageSelect = (imageData: string) => {
    setSelectedImage(imageData);
    processImage(imageData);
  };

  const processImage = async (imageData: string) => {
    setStatus(AppStatus.ANALYZING);
    try {
      const analysis = await analyzeFace(imageData, birthDetails);
      setResult(analysis);
      setStatus(AppStatus.RESULT);
    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || '分析过程中出现错误');
      setStatus(AppStatus.ERROR);
    }
  };

  const resetApp = () => {
    setStatus(AppStatus.IDLE);
    setSelectedImage(null);
    setResult('');
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-[#1c1917] bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] text-stone-200 font-serif selection:bg-amber-900 selection:text-white pb-12">
      {/* Header */}
      <header className="py-6 border-b border-stone-800 bg-stone-900/80 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center text-stone-900 font-bold text-2xl shadow-lg shadow-amber-900/50">
              相
            </div>
            <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-600">
              视娱 面相大师
            </h1>
          </div>
          <div className="text-xs text-stone-500 font-sans hidden sm:block">
            科技与传统文化的融合
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 mt-8 sm:mt-12 flex-grow">
        
        {/* Error Message */}
        {status === AppStatus.ERROR && (
          <div className="max-w-md mx-auto mb-8 p-4 bg-red-900/20 border border-red-800 text-red-300 rounded-lg text-center animate-bounce-in">
            <p>{errorMsg}</p>
            <button 
              onClick={resetApp}
              className="mt-2 text-sm underline hover:text-red-200"
            >
              重试
            </button>
          </div>
        )}

        {/* State Views */}
        {status === AppStatus.IDLE && (
          <div className="animate-fade-in">
             <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-amber-50 mb-4">相由心生，境随心转</h2>
                <p className="text-stone-400 max-w-xl mx-auto leading-relaxed">
                  上传您的面部照片，AI大师将结合传统面相学理论与生辰八字，为您解读五官密码，分析事业、情感与运势，助您趋吉避凶。
                </p>
             </div>
             
             <BaziInput value={birthDetails} onChange={setBirthDetails} />

            <ImageUploader 
              onImageSelect={handleImageSelect} 
              onCameraRequest={() => setStatus(AppStatus.CAMERA_ACTIVE)}
            />
          </div>
        )}

        {status === AppStatus.CAMERA_ACTIVE && (
          <CameraCapture 
            onCapture={handleImageSelect}
            onCancel={() => setStatus(AppStatus.IDLE)}
          />
        )}

        {status === AppStatus.ANALYZING && (
          <LoadingScreen />
        )}

        {status === AppStatus.RESULT && selectedImage && (
          <ResultDisplay 
            imageSrc={selectedImage} 
            resultText={result} 
            onReset={resetApp}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 text-center text-stone-600 text-sm">
        <p>© {new Date().getFullYear()} 视娱 面相大师 - 仅供娱乐参考</p>
      </footer>
    </div>
  );
};

export default App;