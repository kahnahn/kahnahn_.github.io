
import React, { useState, useEffect } from 'react';
import type { VocabularyWord } from '../types';
import { generateExample } from '../services/geminiService';
import { SparklesIcon } from '../constants';

interface FlashcardProps {
  wordData: VocabularyWord;
}

const Flashcard: React.FC<FlashcardProps> = ({ wordData }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [newExample, setNewExample] = useState<string | null>(null);
  const [isLoadingExample, setIsLoadingExample] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
    setNewExample(null);
  }, [wordData]);

  const handleGenerateExample = async () => {
    setIsLoadingExample(true);
    const example = await generateExample(wordData.word, wordData.definition);
    setNewExample(example);
    setIsLoadingExample(false);
  };

  return (
    <div className="w-full max-w-2xl" style={{ perspective: '1000px' }}>
      <div
        className="relative w-full h-80 md:h-96 transition-transform duration-700"
        style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Card Front */}
        <div className="absolute w-full h-full bg-slate-800 rounded-xl shadow-2xl flex items-center justify-center p-6 cursor-pointer" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
          <h1 className="text-5xl md:text-7xl font-bold text-white text-center">{wordData.word}</h1>
        </div>
        
        {/* Card Back */}
        <div className="absolute w-full h-full bg-indigo-900 rounded-xl shadow-2xl flex flex-col justify-between p-6 overflow-y-auto" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
          <div>
            <div className="text-center mb-4">
              <h2 className="text-3xl md:text-4xl font-semibold text-white">{wordData.word}</h2>
              <p className="text-lg text-indigo-300 italic">({wordData.type}) {wordData.definition}</p>
            </div>
            <div className="space-y-4 text-indigo-100">
              <div>
                <p className="font-bold text-indigo-300">Example:</p>
                <p className="italic">"{wordData.example}"</p>
              </div>
              {newExample && (
                <div>
                  <p className="font-bold text-indigo-300">AI Example:</p>
                  <p className="italic">"{newExample}"</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-indigo-700 flex justify-center" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleGenerateExample}
              disabled={isLoadingExample}
              className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
            >
              {isLoadingExample ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-5 h-5 mr-2" />
                  Generate New Example
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;