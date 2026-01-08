import React, { useState, useEffect } from 'react';
import { MushroomType, DoseLevel, CalculationResult } from '../types';
import { MUSHROOM_FACTORS, MUSHROOM_VISUALS } from '../constants';

interface Props {
  weight: number;
  onCalculate: (results: CalculationResult[], exactDose?: string) => void;
}

const MushroomCalc: React.FC<Props> = ({ weight, onCalculate }) => {
  const [type, setType] = useState<MushroomType>(MushroomType.CUBENSIS_DRIED);

  useEffect(() => {
    calculate();
  }, [weight, type]);

  const calculate = () => {
    const factors = MUSHROOM_FACTORS[type];
    const results: CalculationResult[] = Object.keys(factors).map((key) => {
      const level = key as DoseLevel;
      const factor = factors[level];
      const amount = Math.round((weight * factor) * 100) / 100;
      
      let description = "";
      switch (level) {
        case DoseLevel.MICRO: description = "Sub-perceptuel. Productivité."; break;
        case DoseLevel.LOW: description = "Léger. Couleurs vives, rires."; break;
        case DoseLevel.NORMAL: description = "Standard. Visuels, introspection."; break;
        case DoseLevel.HIGH: description = "Fort. Distorsion forte, spirituel."; break;
        case DoseLevel.HEROIC: description = "Dissolution de l'ego. Intense."; break;
      }

      return {
        level,
        amount,
        unit: 'g',
        description
      };
    });
    onCalculate(results, `${results[2].amount}g de ${type}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-3">Type de Champignon</label>
        
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(MUSHROOM_VISUALS).map(([key, visual]) => {
            const isSelected = type === key;
            return (
              <button
                key={key}
                onClick={() => setType(key as MushroomType)}
                className={`
                  relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200
                  ${isSelected 
                    ? 'bg-purple-900/20 border-purple-500 shadow-lg shadow-purple-900/20' 
                    : 'bg-slate-800/50 border-slate-700 hover:border-slate-600 hover:bg-slate-800'}
                `}
              >
                <div className={`mb-2 ${isSelected ? visual.color : 'text-slate-500'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d={visual.iconPath} />
                  </svg>
                </div>
                <span className={`text-xs font-medium text-center ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                  {visual.label}
                </span>
                
                {isSelected && (
                  <div className="absolute top-2 right-2 text-purple-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="p-4 bg-purple-900/20 border border-purple-500/20 rounded-lg text-sm text-purple-200 flex items-start gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 shrink-0 opacity-70" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <p>Les dosages sont calculés pour un poids de <strong>{weight}kg</strong>.</p>
      </div>
    </div>
  );
};

export default MushroomCalc;