import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { IQuestion, IQuestionActions, IQuestionState } from '../interfaces';
const INITIAL_STATE: IQuestionState = {
  answer: "",
  answerChecked: false,
  code: "",
  orderId: 1,
  question: null,
  selectedAnswer: "",
}

export const useQuestionStore = create<IQuestionState & IQuestionActions>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      setOrderId: (orderId: number) => set({orderId}),
      setQuestion: (question: IQuestion) => set({question}),
      setAnswer: (answer: string) => set({answer}),
      setCode: (code: string) => set({ code }),
      setSelectedAnswer: (answer: string) => set({ selectedAnswer: answer }),
      checkAnswer: () => set((state: IQuestionState) => {
        if (!state.question) return { answerChecked: true };
        const correct = state.question.correctAnswer;
        const isCorrect = state.selectedAnswer === correct;
        return {
          answerChecked: true,
          answer: isCorrect ? correct : state.selectedAnswer
        };
      }),
      setAnswerChecked: (checked: boolean) => set({ answerChecked: checked }),
    }),
    {
      name: 'game-storage', 
      onRehydrateStorage: (state: any) => {
        const style = (color = "#3ca015") => `background-color: ${color}; padding: 5px 30px; border-radius: 20px; font-size: 14px`;
        console.log('%chydration starts', style())
        // optional
        return (state: any, error: any) => {
          console.log(state.selectedAnswer)
          console.log("question_id",state.question.id)
          if (error) {
            console.log('an error happened during hydration', error)
          } else {
            console.log('%chydration finished', style("#d9534f"))
          }
        }
      },
    }
  )
);