import React from 'react';
import { Step } from '../types';

interface StepIndicatorProps {
  currentStep: Step;
}

const steps = [
  { id: Step.SELECT_GENDER, label: 'Gender' },
  { id: Step.UPLOAD_PHOTO, label: 'Unggah Foto' },
  { id: Step.SHOW_RESULT, label: 'Hasil' },
];

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  let currentStepIndex = steps.findIndex(step => step.id === currentStep);
  if (currentStep === Step.GENERATING) {
    currentStepIndex = 1;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between" aria-hidden="true">
        {steps.map((step, index) => (
          <div key={step.label} className="w-full relative">
            <div className={`h-1.5 rounded-full transition-colors duration-500 ${index <= currentStepIndex ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
             {index < steps.length && (
              <div className={`absolute -top-7 text-xs sm:text-sm font-bold transition-colors duration-500 ${index <= currentStepIndex ? 'text-indigo-600' : 'text-gray-400'}`} style={{left: `${(index / (steps.length-1)) * 100}%`, transform: index === 0 ? 'translateX(0)' : index === steps.length - 1 ? 'translateX(-100%)' : 'translateX(-50%)' }}>
                 {step.label}
              </div>
             )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;