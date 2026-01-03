import React, { useState, useEffect } from 'react';
import { MushroomType, DoseLevel, CalculationResult } from '../types';
import { MUSHROOM_FACTORS } from '../constants';

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
    <div className="space-y-4 animate-fade-in">
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-2">Type de Champignon</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as MushroomType)}
          className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors"
        >
          {Object.values(MushroomType).map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      
      <div className="p-4 bg-purple-900/20 border border-purple-500/20 rounded-lg text-sm text-purple-200">
        <p>Les dosages sont calculés pour un poids de <strong>{weight}kg</strong>.</p>
      </div>
    </div>
  );
};

export default MushroomCalc;