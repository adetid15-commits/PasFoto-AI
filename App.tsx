import React, { useState, useCallback } from 'react';
import { Step, Gender } from './types';
import { generatePasFoto } from './services/geminiService';
import GenderSelector from './components/GenderSelector';
import PhotoUploader from './components/PhotoUploader';
import ResultDisplay from './components/ResultDisplay';
import StepIndicator from './components/StepIndicator';
import { Spinner } from './components/IconComponents';

const App: React.FC = () => {
  const [step, setStep] = useState<Step>(Step.SELECT_GENDER);
  const [gender, setGender] = useState<Gender | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenderSelect = useCallback((selectedGender: Gender) => {
    setGender(selectedGender);
    setStep(Step.UPLOAD_PHOTO);
  }, []);

  const handleGenerate = useCallback(async (image: string, color: 'red' | 'blue') => {
    if (!gender) {
      setError('Gender belum dipilih. Silakan kembali ke langkah pertama.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setStep(Step.GENERATING);

    try {
      const resultImage = await generatePasFoto(image, gender, color);
      setGeneratedImage(resultImage);
      setStep(Step.SHOW_RESULT);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan tidak diketahui.');
      setStep(Step.UPLOAD_PHOTO); // Go back to upload step on error
    } finally {
      setIsLoading(false);
    }
  }, [gender]);

  const handleReset = useCallback(() => {
    setStep(Step.SELECT_GENDER);
    setGender(null);
    setGeneratedImage(null);
    setError(null);
    setIsLoading(false);
  }, []);

  const renderStepContent = () => {
    switch (step) {
      case Step.SELECT_GENDER:
        return <GenderSelector onSelect={handleGenderSelect} />;
      case Step.UPLOAD_PHOTO:
        return <PhotoUploader onGenerate={handleGenerate} />;
      case Step.GENERATING:
        return (
          <div className="text-center fade-in-up">
            <Spinner className="w-20 h-20 text-indigo-600 mx-auto" />
            <h2 className="mt-6 text-2xl font-bold text-gray-800">AI sedang bekerja...</h2>
            <p className="text-gray-600 mt-2">Ini mungkin memakan waktu beberapa detik. Mohon tunggu.</p>
            <div className="mt-4 text-sm text-gray-500">
                <p>Menerapkan pakaian formal...</p>
                <p>Menyesuaikan latar belakang...</p>
                <p>Meningkatkan kualitas gambar...</p>
            </div>
          </div>
        );
      case Step.SHOW_RESULT:
        if (generatedImage) {
          return <ResultDisplay imageSrc={generatedImage} onReset={handleReset} />;
        }
        // Fallback if image is null
        handleReset();
        return null;
      default:
        return <div>Langkah tidak valid</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8">
      <header className="w-full max-w-4xl text-center mb-8">
        <h1 className="text-5xl sm:text-6xl font-black text-gray-800">
          PasFoto <span className="gradient-text">AI</span>
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Buat pas foto profesional Anda dalam hitungan detik.
        </p>
      </header>

      <main className="w-full max-w-4xl bg-white/70 backdrop-blur-xl p-6 sm:p-10 rounded-3xl shadow-xl shadow-blue-100/50 flex flex-col items-center">
        {step !== Step.GENERATING && step !== Step.SHOW_RESULT && (
            <div className="w-full max-w-md mb-12 mt-4">
            <StepIndicator currentStep={step} />
            </div>
        )}
        
        {error && (
            <div className="mb-6 w-full max-w-2xl bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                <strong className="font-bold">Oops! </strong>
                <span className="block sm:inline">{error}</span>
                <button onClick={() => setError(null)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <span className="text-2xl font-bold">&times;</span>
                </button>
            </div>
        )}

        <div className="w-full flex justify-center min-h-[400px] items-center">
            {renderStepContent()}
        </div>
      </main>
      
      <footer className="w-full max-w-4xl text-center mt-8 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} PasFoto AI. Ditenagai oleh Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;
