import React, { useEffect } from 'react';
import { DoseLevel, CalculationResult } from '../types';
import { MDMA_FACTOR, MDMA_MAX_SAFE } from '../constants';

interface Props {
  weight: number;
  onCalculate: (results: CalculationResult[], exactDose?: string) => void;
}

const MDMACalc: React.FC<Props> = ({ weight, onCalculate }) => {
  
  useEffect(() => {
    calculate();
  }, [weight]);

  const calculate = () => {
    // Standard rule: 1.5mg per kg
    let recommended = Math.round(weight * MDMA_FACTOR);
    
    // Safety cap
    const isCapped = recommended > MDMA_MAX_SAFE;
    if (isCapped) recommended = MDMA_MAX_SAFE;

    const results: CalculationResult[] = [
      {
        level: DoseLevel.LOW,
        amount: Math.round(recommended * 0.7),
        unit: 'mg',
        description: "Effets légers, moins de 'comedown' lendemain."
      },
      {
        level: DoseLevel.NORMAL,
        amount: recommended,
        unit: 'mg',
        description: isCapped 
          ? `Plafonné à ${MDMA_MAX_SAFE}mg pour la sécurité (Règle max).` 
          : "Dose standard recommandée (1.5mg/kg)."
      },
      {
        level: DoseLevel.HIGH,
        amount: Math.round(recommended * 1.3),
        unit: 'mg',
        description: "Risque accru de neurotoxicité et hangover difficile."
      }
    ];

    onCalculate(results, `${recommended}mg de MDMA`);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="p-4 bg-pink-900/20 border border-pink-500/20 rounded-lg text-sm text-pink-200">
        <p>La règle de réduction des risques pour la MDMA est stricte : <strong>1.5 mg par kg</strong> de poids corporel.</p>
        <p className="mt-2 text-xs opacity-75">Max recommandé : 120mg par session, quel que soit le poids.</p>
      </div>
    </div>
  );
};

export default MDMACalc;