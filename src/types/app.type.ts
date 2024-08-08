import { IQuestion, ITeam } from "@/interfaces";
export type starterType = {
  IsAnnouncer?: boolean,
  IsQuestion?: boolean,
  IsScore?: boolean,
  IsWinner?: boolean,
}
export type State = {
  orderId: number;
  code: string;
  isChecked: boolean;
  answer: string;
  question: IQuestion | null;
  announcer: string;
  winner: string | null;
  selected: string;
  team: ITeam | null;
  showSidebar: boolean;
  starter: starterType;
  score: number;
};

export type Action =
  | { type: 'SET_ORDER_ID'; payload: number }
  | { type: 'INCREMENT_ORDER_ID' }
  | { type: 'SET_CODE'; payload: string }
  | { type: 'SET_SCORE'; payload: number }
  | { type: 'SET_STARTER'; payload: starterType }
  | { type: 'SET_SELECTED'; payload: string }
  | { type: 'SET_ANNOUNCER'; payload: string }
  | { type: 'SET_TEAM'; payload: ITeam }
  | { type: 'SET_WINNER'; payload: string }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'RESET' }
  | { type: 'CHECK_ANSWER', payload: {isChecked: boolean}}
  | { type: 'SET_QUESTION', payload: IQuestion }
  | { type: 'SET_ANSWER', payload: string };

export type ContextProps = {
  state: State;
  dispatch: React.Dispatch<Action>;
  setQuestion: (value: IQuestion) => void;
  setAnswer: (value: string) => void,
  setCode: (value: string) => void,
  setOrderId: (value: number) => void,
  checkAnswer: (value: boolean) => void,
  setSelected: (value: string) => void,
  setTeam: (value: ITeam) => void,
  reset: () => void,
  toggleSidebar: () => void,
  setAnnouncer: (value: string) => void,
  setWinner: (value: string) => void,
  setStarter: (value: starterType) => void,
  setScore: (value: number) => void,
};
