
export interface VocabularyWord {
  word: string;
  type: string;
  definition: string;
  example: string;
}

export interface TestOption {
  definition: string;
  isCorrect: boolean;
}

export interface TestQuestion {
  word: string;
  options: TestOption[];
}
