import React from 'react';
import { Substance } from '../types';
import { STATIC_SAFETY_DATA } from '../constants';

interface Props {
  substanceName: Substance; // Strongly typed now
  doseContext: string;
}

const SafetyGuide: React.FC<Props> = ({ substanceName, doseContext }) => {
  const data = STATIC_SAFETY_DATA[substanceName];

  if (!data) return null;

  return (
    <div className="mt-6 border border-purple-500/30 rounded-xl bg-gradient-to-br from-slate-900 to-purple-900/20 overflow-hidden shadow-lg animate-fade-in-up">
      <div className="bg-purple-900/40 p-3 border-b border-purple-500/20 flex justify-between items-center">
        <h3 className="font-semibold text-purple-200 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Guide de Réduction des Risques
        </h3>
        <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full border border-purple-500/30 truncate max-w-[150px]">
          {substanceName}
        </span>
      </div>
      
      <div className="p-5 space-y-4">
        <div>
          <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-2">Effets Principaux</h4>
          <div className="flex flex-wrap gap-2">
            {data.effects.map((effect, idx) => (
              <span key={idx} className="text-sm bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
                {effect}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-2">Conseils de Sécurité (Set & Setting)</h4>
          <div className="bg-slate-900/50 p-4 rounded-lg border-l-2 border-purple-500">
            <p className="text-slate-300 text-sm leading-relaxed italic">
              "{data.advice}"
            </p>
          </div>
        </div>

        <div className="flex items-center text-xs text-slate-400 mt-2 bg-slate-800/50 p-2 rounded-lg w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Durée estimée: <span className="text-white ml-1 font-medium">{data.duration}</span>
        </div>
        
        <div className="text-[10px] text-slate-500 text-center pt-2 border-t border-slate-800">
          * Les effets et la durée peuvent varier selon le métabolisme et le dosage ({doseContext}).
        </div>
      </div>
    </div>
  );
};

export default SafetyGuide;