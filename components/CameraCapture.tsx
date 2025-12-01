import React, { useRef, useEffect, useState, useCallback } from 'react';

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  onCancel: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onCancel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: false,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        setError('无法访问摄像头，请检查权限设置。');
        console.error("Camera error:", err);
      }
    };

    startCamera();

    return () => {
      // Cleanup stream on unmount
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const handleCapture = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg', 0.8);
        
        // Stop stream before passing data
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        
        onCapture(imageData);
      }
    }
  }, [onCapture, stream]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <p className="text-red-400 mb-4">{error}</p>
        <button 
          onClick={onCancel}
          className="px-4 py-2 bg-stone-700 text-stone-200 rounded hover:bg-stone-600"
        >
          返回
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <div className="relative w-full aspect-[3/4] bg-black rounded-lg overflow-hidden shadow-2xl border-2 border-amber-600/30">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover transform scale-x-[-1]" // Mirror effect
        />
        {/* Overlay guide */}
        <div className="absolute inset-0 pointer-events-none border-2 border-amber-500/20 rounded-lg">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-64 border-2 border-dashed border-amber-400/50 rounded-full opacity-50"></div>
          <p className="absolute bottom-4 left-0 right-0 text-center text-amber-200/70 text-sm">请将面部对准框内</p>
        </div>
      </div>
      
      <canvas ref={canvasRef} className="hidden" />

      <div className="flex gap-4 mt-6">
        <button
          onClick={onCancel}
          className="px-6 py-3 rounded-full bg-stone-800 text-stone-400 hover:bg-stone-700 transition-colors"
        >
          取消
        </button>
        <button
          onClick={handleCapture}
          className="px-6 py-3 rounded-full bg-amber-600 text-white font-bold hover:bg-amber-500 transition-colors shadow-lg shadow-amber-900/50 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          拍照
        </button>
      </div>
    </div>
  );
};

export default CameraCapture;
