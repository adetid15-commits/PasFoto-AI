import React from 'react';
import { Gender } from '../types';
import { MaleIcon, FemaleIcon } from './IconComponents';

interface GenderSelectorProps {
  onSelect: (gender: Gender) => void;
}

const GenderSelector: React.FC<GenderSelectorProps> = ({ onSelect }) => {
  return (
    <div className="w-full max-w-2xl text-center fade-in-up">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Pilih Gender</h2>
      <p className="text-gray-600 mb-10">Pilihan Anda akan menentukan model pakaian formal yang digunakan.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <button
          onClick={() => onSelect(Gender.MALE)}
          className="group relative flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-2xl hover:shadow-indigo-200/50 hover:-translate-y-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 transition-all duration-300"
        >
          <MaleIcon className="w-24 h-24 text-gray-300 group-hover:text-indigo-500 transition-colors duration-300" />
          <span className="mt-4 text-xl font-bold text-gray-700 group-hover:text-indigo-600">Pria</span>
        </button>
        <button
          onClick={() => onSelect(Gender.FEMALE)}
          className="group relative flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-2xl hover:shadow-pink-200/50 hover:-translate-y-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-pink-500 transition-all duration-300"
        >
          <FemaleIcon className="w-24 h-24 text-gray-300 group-hover:text-pink-500 transition-colors duration-300" />
          <span className="mt-4 text-xl font-bold text-gray-700 group-hover:text-pink-600">Wanita</span>
        </button>
      </div>
    </div>
  );
};

export default GenderSelector;