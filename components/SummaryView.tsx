
import React from 'react';
import type { VocabularyWord } from '../types';

interface SummaryViewProps {
  incorrectWords: VocabularyWord[];
  onRestart: () => void;
}

const SummaryView: React.FC<SummaryViewProps> = ({ incorrectWords, onRestart }) => {
  return (
    <div className="w-full max-w-4xl bg-slate-800 rounded-xl shadow-2xl p-6 md:p-8 text-white animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-amber-400 mb-4">Study Summary</h2>
      {incorrectWords.length > 0 ? (
        <>
          <p className="text-center text-slate-300 mb-8">Here are the words you might want to review.</p>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
            {incorrectWords.map((word) => (
              <div key={word.word} className="bg-slate-900 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-indigo-400">{word.word}</h3>
                <p className="text-slate-300 italic">({word.type}) {word.definition}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-slate-300 mb-8 text-lg">Congratulations! You didn't miss any words in the tests!</p>
      )}
      <div className="mt-8 text-center">
        <button
          onClick={onRestart}
          className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default SummaryView;
