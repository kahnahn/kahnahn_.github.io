
import React, { useState, useEffect, useCallback } from 'react';
import Flashcard from './components/Flashcard';
import TestView from './components/TestView';
import SummaryView from './components/SummaryView';
import ProgressBar from './components/ProgressBar';
import { VOCABULARY_WORDS, ArrowLeftIcon, ArrowRightIcon } from './constants';
import type { VocabularyWord, TestQuestion, TestOption } from './types';

type AppMode = 'flashcard' | 'test' | 'summary';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState<AppMode>('flashcard');
  const [testQuestions, setTestQuestions] = useState<TestQuestion[]>([]);
  const [testType, setTestType] = useState<'mini' | 'mock'>('mini');
  const [incorrectWords, setIncorrectWords] = useState<Set<string>>(new Set());
  const [lastDirection, setLastDirection] = useState<'next' | 'prev' | null>(null);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const generateTest = useCallback((sourceWords: VocabularyWord[], questionCount: number) => {
    const shuffledSource = shuffleArray(sourceWords);
    const questions: TestQuestion[] = [];

    for (let i = 0; i < Math.min(questionCount, shuffledSource.length); i++) {
      const correctWord = shuffledSource[i];
      const distractors = shuffleArray(VOCABULARY_WORDS.filter(w => w.word !== correctWord.word)).slice(0, 3);
      
      const options: TestOption[] = shuffleArray([
        { definition: correctWord.definition, isCorrect: true },
        ...distractors.map(d => ({ definition: d.definition, isCorrect: false }))
      ]);

      questions.push({ word: correctWord.word, options });
    }
    setTestQuestions(questions);
    setMode('test');
  }, []);

  useEffect(() => {
    if (mode !== 'flashcard' || lastDirection !== 'next') return;
    
    const currentWordNumber = currentIndex + 1;
    if (currentWordNumber > 0 && currentWordNumber < VOCABULARY_WORDS.length) {
      if (currentWordNumber % 50 === 0) {
        setTestType('mock');
        const source = VOCABULARY_WORDS.slice(currentIndex - 49, currentIndex + 1);
        generateTest(source, 20);
      } else if (currentWordNumber % 20 === 0) {
        setTestType('mini');
        const source = VOCABULARY_WORDS.slice(currentIndex - 19, currentIndex + 1);
        generateTest(source, 10);
      }
    }
  }, [currentIndex, mode, lastDirection, generateTest]);

  const handleNext = () => {
    setLastDirection('next');
    if (currentIndex < VOCABULARY_WORDS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setMode('summary');
    }
  };

  const handlePrev = () => {
    setLastDirection('prev');
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleTestComplete = (newlyIncorrectWords: string[]) => {
    setIncorrectWords(prev => new Set([...prev, ...newlyIncorrectWords]));
    setMode('flashcard');
    setTestQuestions([]);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIncorrectWords(new Set());
    setMode('flashcard');
  }

  const getIncorrectWordsData = (): VocabularyWord[] => {
    return VOCABULARY_WORDS.filter(word => incorrectWords.has(word.word));
  }

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-4 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-100">SAT Vocabulary Flashcards</h1>
        <p className="text-slate-400 mt-2">Learn the 1000 most common words for the SAT</p>
      </header>
      
      <main className="w-full max-w-2xl flex flex-col items-center justify-center flex-grow">
        {mode === 'flashcard' && (
          <Flashcard wordData={VOCABULARY_WORDS[currentIndex]} />
        )}
        {mode === 'test' && (
          <TestView questions={testQuestions} testType={testType} onComplete={handleTestComplete} />
        )}
        {mode === 'summary' && (
            <SummaryView incorrectWords={getIncorrectWordsData()} onRestart={handleRestart} />
        )}
      </main>

      {mode === 'flashcard' && (
        <footer className="w-full max-w-2xl">
          <ProgressBar current={currentIndex} total={VOCABULARY_WORDS.length} />
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center px-6 py-3 bg-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors"
            >
              <ArrowLeftIcon className="w-6 h-6 mr-2"/>
              Prev
            </button>
            <div className="text-lg font-mono text-slate-400">
              {currentIndex + 1} / {VOCABULARY_WORDS.length}
            </div>
            <button
              onClick={handleNext}
              className="flex items-center px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors"
            >
              {currentIndex === VOCABULARY_WORDS.length - 1 ? 'Summary' : 'Next'}
              <ArrowRightIcon className="w-6 h-6 ml-2"/>
            </button>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
