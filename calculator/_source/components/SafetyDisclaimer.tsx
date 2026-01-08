import React, { useState, useEffect } from 'react';

interface Props {
  onAccept: () => void;
}

const SafetyDisclaimer: React.FC<Props> = ({ onAccept }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleAccept = () => {
    setIsOpen(false);
    onAccept();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="bg-slate-900 border border-purple-500/30 rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center justify-center mb-6 text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-center mb-4 text-white">Avertissement Important</h2>
        <div className="space-y-3 text-slate-300 text-sm leading-relaxed mb-6">
          <p>
            Cette application est fournie à titre informatif et de <strong>réduction des risques</strong> uniquement.
          </p>
          <p>
            Nous n'encourageons pas la consommation de substances illégales. Les dosages sont des estimations basées sur des moyennes et peuvent varier considérablement selon la physiologie individuelle et la puissance du produit.
          </p>
          <p className="font-semibold text-purple-300">
            Commencez toujours bas. Vous pouvez toujours en prendre plus, mais jamais en prendre moins.
          </p>
        </div>
        <button
          onClick={handleAccept}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-[1.02] active:scale-95"
        >
          J'ai compris et j'accepte
        </button>
      </div>
    </div>
  );
};

export default SafetyDisclaimer;