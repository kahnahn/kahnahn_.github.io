
import React, { useState, useMemo } from 'react';
import type { TestQuestion } from '../types';

interface TestViewProps {
  questions: TestQuestion[];
  testType: 'mini' | 'mock';
  onComplete: (incorrectWords: string[]) => void;
}

const TestView: React.FC<TestViewProps> = ({ questions, testType, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);

  const handleAnswerSelect = (optionIndex: number) => {
    if (isAnswered) return;

    setSelectedAnswer(optionIndex);
    setIsAnswered(true);

    if (currentQuestion.options[optionIndex].isCorrect) {
      setScore(prev => prev + 1);
    } else {
      setIncorrectWords(prev => [...prev, currentQuestion.word]);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    return (
      <div className="w-full max-w-2xl bg-slate-800 rounded-xl shadow-2xl p-8 text-center text-white animate-fade-in">
        <h2 className="text-3xl font-bold text-amber-400 mb-2">Test Complete!</h2>
        <p className="text-xl text-slate-300 mb-6">{testType === 'mini' ? 'Mini Test' : 'Mock Test'} Results</p>
        <p className="text-5xl font-bold mb-4">{score} / {questions.length}</p>
        <p className="text-2xl font-light mb-8">({((score / questions.length) * 100).toFixed(0)}%)</p>
        <button
          onClick={() => onComplete(incorrectWords)}
          className="w-full md:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors"
        >
          Continue Learning
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl bg-slate-800 rounded-xl shadow-2xl p-6 md:p-8 text-white animate-fade-in">
      <div className="mb-6 text-center">
        <p className="text-indigo-400 font-semibold">{testType === 'mini' ? 'Mini Test' : 'Mock Test'}</p>
        <h2 className="text-2xl font-bold">Question {currentQuestionIndex + 1} of {questions.length}</h2>
      </div>

      <div className="text-center mb-8">
        <p className="text-slate-300 text-lg mb-2">What is the definition of:</p>
        <p className="text-4xl font-bold text-amber-400">{currentQuestion.word}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = option.isCorrect;
          
          let buttonClass = "p-4 rounded-lg text-left transition-all duration-300 border-2 border-slate-700 hover:border-indigo-500 hover:bg-slate-700";

          if (isAnswered) {
            if (isCorrect) {
              buttonClass = "p-4 rounded-lg text-left border-2 border-green-500 bg-green-500/20 text-white";
            } else if (isSelected && !isCorrect) {
              buttonClass = "p-4 rounded-lg text-left border-2 border-red-500 bg-red-500/20 text-white";
            } else {
               buttonClass = "p-4 rounded-lg text-left border-2 border-slate-700 opacity-50";
            }
          }

          return (
            <button key={index} onClick={() => handleAnswerSelect(index)} disabled={isAnswered} className={buttonClass}>
              {option.definition}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="mt-8 text-center">
          <button onClick={handleNext} className="w-full md:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors">
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Test'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TestView;
