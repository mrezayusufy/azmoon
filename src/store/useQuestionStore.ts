import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IQuestion, IQuestionActions, IQuestionState } from '../interfaces';

const INITIAL_STATE: IQuestionState = {
  answer: "",
  answerChecked: false,
  code: "",
  orderId: 1,
  question: null,
  selectedAnswer: "",
};

export const useQuestionStore = create<IQuestionState & IQuestionActions>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      setOrderId: (orderId: number) => set({ orderId }),
      setQuestion: (question: IQuestion) => set({ question }),
      setAnswer: (answer: string) => set({ answer }),
      setCode: (code: string) => set({ code }),
      setSelectedAnswer: (selectedAnswer: string) => set({ selectedAnswer }),
      checkAnswer: () => set((state) => {
        if (!state.question) return { answerChecked: true };
        const correct = state.question.correctAnswer;
        const isCorrect = state.selectedAnswer === correct;
        return {
          answerChecked: true,
          answer: isCorrect ? correct : state.selectedAnswer,
        };
      }),
      setAnswerChecked: (answerChecked: boolean) => set({ answerChecked }),
    }),
    {
      name: 'game-storage',
    }
  )
);
