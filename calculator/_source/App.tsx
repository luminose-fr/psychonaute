import React, { useState } from 'react';
import { Substance, CalculationResult, DoseLevel } from './types';
import MushroomCalc from './components/MushroomCalc';
import LSDCalc from './components/LSDCalc';
import MDMACalc from './components/MDMACalc';
import SafetyDisclaimer from './components/SafetyDisclaimer';
import SafetyGuide from './components/GeminiAdvice';
import Login from './components/Login';

function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // App State
  const [activeTab, setActiveTab] = useState<Substance>(Substance.MUSHROOMS);
  const [weight, setWeight] = useState<number>(70);
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [hasAcceptedSafety, setHasAcceptedSafety] = useState(false);
  const [currentDoseContext, setCurrentDoseContext] = useState<string>("");

  const handleCalculate = (newResults: CalculationResult[], doseContext: string = "") => {
    setResults(newResults);
    setCurrentDoseContext(doseContext);
  };

  const renderActiveCalculator = () => {
    switch (activeTab) {
      case Substance.MUSHROOMS:
        return <MushroomCalc weight={weight} onCalculate={handleCalculate} />;
      case Substance.LSD:
        return <LSDCalc onCalculate={handleCalculate} />;
      case Substance.MDMA:
        return <MDMACalc weight={weight} onCalculate={handleCalculate} />;
      default:
        return null;
    }
  };

  const getTabColor = (tab: Substance) => {
    switch (tab) {
      case Substance.MUSHROOMS: return 'text-purple-400 border-purple-400';
      case Substance.LSD: return 'text-blue-400 border-blue-400';
      case Substance.MDMA: return 'text-pink-400 border-pink-400';
      default: return 'text-slate-500 border-transparent';
    }
  };

  // If not authenticated, show Login screen
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-slate-200 p-4 md:p-8 font-sans selection:bg-purple-500/30">
      {!hasAcceptedSafety && <SafetyDisclaimer onAccept={() => setHasAcceptedSafety(true)} />}

      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="text-center space-y-2">
          <div className="inline-block p-3 rounded-full bg-purple-500/10 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">
            PsycheSafe Calc
          </h1>
          <p className="text-slate-400 text-sm">Calculateur de dosage & Réduction des risques</p>
        </header>

        {/* Weight Input (Global) */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="mb-6">
             <label className="flex justify-between text-sm font-medium text-slate-300 mb-2">
                <span>Votre Poids</span>
                <span className="text-purple-400 font-bold">{weight} kg</span>
             </label>
             <input
               type="range"
               min="40"
               max="120"
               value={weight}
               onChange={(e) => setWeight(parseInt(e.target.value))}
               className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400"
             />
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-800 mb-6 overflow-x-auto">
            {Object.values(Substance).map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveTab(sub)}
                className={`flex-1 pb-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap px-4 ${
                  activeTab === sub
                    ? getTabColor(sub)
                    : 'text-slate-500 border-transparent hover:text-slate-300'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* Dynamic Calculator Content */}
          <div className="min-h-[150px]">
            {renderActiveCalculator()}
          </div>
        </div>

        {/* Results Display */}
        {results.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 animate-fade-in-up">
            {results.map((res, idx) => (
              <div 
                key={idx}
                className={`relative overflow-hidden rounded-xl p-5 border transition-all hover:scale-[1.02] ${
                  res.level === DoseLevel.NORMAL 
                    ? 'bg-purple-900/10 border-purple-500/50 shadow-purple-900/20 shadow-lg ring-1 ring-purple-500/20' 
                    : 'bg-slate-900/40 border-slate-800'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                    res.level === DoseLevel.NORMAL ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {res.level}
                  </span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {res.amount} <span className="text-lg text-slate-400 font-normal">{res.unit}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mt-2">
                  {res.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Static Safety Guide */}
        {hasAcceptedSafety && results.length > 0 && (
          <SafetyGuide 
            substanceName={activeTab} 
            doseContext={currentDoseContext}
          />
        )}
        
        {/* Footer */}
        <footer className="text-center text-xs text-slate-600 pb-8 mt-12">
          <p>© {new Date().getFullYear()} PsycheSafe. Harm Reduction saves lives.</p>
          <p className="mt-1">En cas d'urgence, contactez le 112 ou les services d'urgence locaux.</p>
        </footer>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}

export default App;