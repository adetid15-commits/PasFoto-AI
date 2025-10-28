import React, { useState, useRef, useCallback } from 'react';
import { UploadIcon } from './IconComponents';

interface PhotoUploaderProps {
  onGenerate: (image: string, color: 'red' | 'blue') => void;
}

const PhotoUploader: React.FC<PhotoUploaderProps> = ({ onGenerate }) => {
  const [image, setImage] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState<'red' | 'blue'>('red');
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if(file.size > 4 * 1024 * 1024) { // 4MB limit
        setError("Ukuran file terlalu besar. Maksimal 4MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setError(null);
      };
      reader.onerror = () => {
        setError("Gagal membaca file.");
      }
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateClick = () => {
    if (image) {
      onGenerate(image, bgColor);
    }
  };
  
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileChange({ target: { files: [file] } as unknown as HTMLInputElement } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className="w-full max-w-2xl fade-in-up">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Unggah Foto Anda</h2>
        <p className="text-gray-600 mb-6 text-center">Pilih foto close-up terbaik Anda dengan pencahayaan yang baik.</p>
        
        <div
            className={`w-full p-4 border-2 border-dashed rounded-2xl transition-all duration-300 ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-white hover:border-indigo-400'}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            {image ? (
                <div className="text-center p-4">
                    <img src={image} alt="Preview" className="mx-auto rounded-lg max-h-60 shadow-md mb-4" />
                    <button
                        onClick={() => { setImage(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                        className="text-sm text-indigo-600 hover:underline font-semibold"
                    >
                        Pilih foto lain
                    </button>
                </div>
            ) : (
                <div
                    className="flex flex-col items-center justify-center py-10 cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <UploadIcon className="w-12 h-12 text-gray-400 mb-3" />
                    <p className="font-semibold text-gray-700">Klik untuk mengunggah atau seret foto</p>
                    <p className="text-sm text-gray-500">PNG, JPG, atau WEBP (maks. 4MB)</p>
                </div>
            )}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
            />
        </div>

        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        
        <div className={`mt-6 transition-opacity duration-500 ${image ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <p className="font-semibold text-gray-700 mb-3 text-center">Pilih Warna Latar Belakang</p>
            <div className="flex justify-center gap-4">
                <button
                    onClick={() => setBgColor('red')}
                    className={`w-16 h-16 rounded-full bg-red-600 focus:outline-none transition-all duration-200 shadow-md ${bgColor === 'red' ? 'ring-4 ring-offset-2 ring-indigo-500 scale-110' : 'hover:scale-105'}`}
                    aria-label="Latar Merah"
                ></button>
                <button
                    onClick={() => setBgColor('blue')}
                    className={`w-16 h-16 rounded-full bg-blue-700 focus:outline-none transition-all duration-200 shadow-md ${bgColor === 'blue' ? 'ring-4 ring-offset-2 ring-indigo-500 scale-110' : 'hover:scale-105'}`}
                    aria-label="Latar Biru"
                ></button>
            </div>
            <button
                onClick={handleGenerateClick}
                disabled={!image}
                className="mt-8 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg py-3 px-4 rounded-lg hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-300"
            >
                Generate Pas Foto
            </button>
        </div>
    </div>
  );
};

export default PhotoUploader;