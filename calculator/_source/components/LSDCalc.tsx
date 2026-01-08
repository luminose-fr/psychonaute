import React, { useEffect } from 'react';
import { DoseLevel, CalculationResult } from '../types';
import { LSD_TIERS } from '../constants';

interface Props {
  onCalculate: (results: CalculationResult[], exactDose?: string) => void;
}

const LSDCalc: React.FC<Props> = ({ onCalculate }) => {

  useEffect(() => {
    calculate();
  }, []);

  const calculate = () => {
    const results: CalculationResult[] = Object.keys(LSD_TIERS).map((key) => {
      const level = key as DoseLevel;
      const tier = LSD_TIERS[level];
      
      return {
        level,
        amount: tier.min, // Displaying the lower bound of the range for safety
        unit: 'µg',
        description: tier.desc
      };
    });
    onCalculate(results, "100µg de LSD");
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg text-sm text-blue-200">
        <p>Le dosage du LSD dépend moins du poids corporel que les autres substances. Ces paliers sont des standards universels.</p>
      </div>
      <div className="text-xs text-slate-500">
        * Les dosages indiqués sont le bas de la fourchette pour chaque niveau.
      </div>
    </div>
  );
};

export default LSDCalc;