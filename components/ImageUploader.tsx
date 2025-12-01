import React, { ChangeEvent } from 'react';

interface ImageUploaderProps {
  onImageSelect: (imageData: string) => void;
  onCameraRequest: () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, onCameraRequest }) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onImageSelect(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-stone-800/50 rounded-2xl border border-stone-700 shadow-xl backdrop-blur-sm">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-stone-700 rounded-full mx-auto flex items-center justify-center mb-4 border border-amber-500/30">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-amber-100 mb-2">上传或拍摄面部照片</h2>
        <p className="text-stone-400 text-sm">AI大师将为您解析面相，指点迷津</p>
      </div>

      <div className="flex flex-col gap-4">
        <label className="flex items-center justify-center w-full px-6 py-4 border-2 border-dashed border-stone-600 rounded-xl cursor-pointer hover:border-amber-500/50 hover:bg-stone-700/50 transition-all group">
          <div className="flex flex-col items-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-stone-500 group-hover:text-amber-400 mb-2 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <span className="text-stone-300 font-medium group-hover:text-amber-100">从相册选择</span>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-stone-700"></div>
          <span className="flex-shrink-0 mx-4 text-stone-500 text-sm">或者</span>
          <div className="flex-grow border-t border-stone-700"></div>
        </div>

        <button
          onClick={onCameraRequest}
          className="w-full py-4 bg-amber-700 hover:bg-amber-600 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          打开摄像头
        </button>
      </div>
      
      <p className="mt-6 text-xs text-center text-stone-500">
        *照片仅用于实时分析，不会被服务器永久保存。
      </p>
    </div>
  );
};

export default ImageUploader;
