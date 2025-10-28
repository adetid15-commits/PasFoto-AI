import React from 'react';
import { DownloadIcon, RetryIcon } from './IconComponents';

interface ResultDisplayProps {
  imageSrc: string;
  onReset: () => void;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ imageSrc, onReset }) => {
  return (
    <div className="w-full max-w-4xl text-center fade-in-up">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Pas Foto Anda Siap!</h2>
      <p className="text-gray-600 mb-10">Unduh foto Anda dalam ukuran yang diinginkan.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="flex flex-col items-center">
            <div className="p-2 bg-white rounded-lg shadow-2xl shadow-indigo-100/50 w-full max-w-xs">
                 <img src={imageSrc} alt="Pas Foto 3x4" className="rounded-md w-full" style={{ aspectRatio: '3 / 4', objectFit: 'cover' }} />
            </div>
            <a
                href={imageSrc}
                download="pasfoto_3x4.png"
                className="mt-6 inline-flex items-center gap-2 bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
            >
                <DownloadIcon className="w-5 h-5" />
                <span>Unduh 3x4</span>
            </a>
        </div>
        
        <div className="flex flex-col items-center">
            <div className="p-2 bg-white rounded-lg shadow-2xl shadow-purple-100/50 w-full max-w-xs">
                <img src={imageSrc} alt="Pas Foto 4x6" className="rounded-md w-full" style={{ aspectRatio: '4 / 6', objectFit: 'cover' }} />
            </div>
            <a
                href={imageSrc}
                download="pasfoto_4x6.png"
                className="mt-6 inline-flex items-center gap-2 bg-purple-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-purple-700 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
            >
                <DownloadIcon className="w-5 h-5" />
                <span>Unduh 4x6</span>
            </a>
        </div>
      </div>
      
      <button
        onClick={onReset}
        className="mt-12 inline-flex items-center gap-2 text-indigo-600 font-bold py-3 px-8 rounded-lg border-2 border-indigo-500 hover:bg-indigo-50 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
      >
        <RetryIcon className="w-5 h-5" />
        <span>Buat Lagi</span>
      </button>
    </div>
  );
};

export default ResultDisplay;