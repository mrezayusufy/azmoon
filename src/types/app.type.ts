import { IQuestion } from "@/interfaces";

// types.ts
export type State = {
  orderId: number;
  code: string;
  showSidebar: boolean;
  isChecked: boolean;
  answer: string;
  question: IQuestion;
  isCorrect: boolean;
  selected: string;
};

export type Action =
  | { type: 'SET_ORDER_ID'; payload: number }
  | { type: 'SET_CODE'; payload: string }
  | { type: 'SET_SELECTED'; payload: string }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'RESET' }
  | { type: 'CHECK_ANSWER', payload: number}
  | { type: 'SET_QUESTION', payload: IQuestion }
  | { type: 'SET_ANSWER', payload: string };

export type ContextProps = {
  state: State;
  dispatch: React.Dispatch<Action>;
  setQuestion: (question: IQuestion) => void;
  setAnswer: (answer: string) => void,
  setCode: (code: string) => void,
  setOrderId: (orderId: number) => void,
  checkAnswer: (condition: number) => void,
  setSelected: (selected: string) => void,
};
