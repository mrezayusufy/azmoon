import { IQuestion } from '@/interfaces';
import { State, Action } from '@/types';

export const initialState: State = {
  showSidebar: true,
  winner: localStorage.getItem('winner') || '',
  score: localStorage.getItem("orderId") && parseInt(localStorage.getItem("score") as string) || 0,
  team: null,
  orderId: localStorage.getItem("orderId") && parseInt(localStorage.getItem('orderId') as string) || 0,
  isChecked: Boolean(JSON.parse(localStorage.getItem('isChecked') as string)) || false,
  code: localStorage.getItem('code') || '',
  answer: localStorage.getItem("answer") || '',
  announcer: localStorage.getItem("announcer") || '',
  selected: localStorage.getItem("selected") || '',
  question: localStorage.getItem("question") && JSON.parse(localStorage.getItem("question") as string) || null,
  starter: JSON.parse(localStorage.getItem("starter") as string) || {IsAnnouncer: false, IsScore: false, IsQuestion: false, IsWinner: false},
};
const question: IQuestion = {
  questionType: 0,
  orderId: 0,
  categoryId: 0,
  content: "",
  competitionId: 0,
  correctAnswer: "",
  id: 1,
  options: "",
  optionsList: [],
  score: 0,
  timer: 0,
} 
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "CHECK_ANSWER": 
      const condition = action.payload;
      if(condition.isChecked)
        localStorage.setItem('isChecked', "true");
      else
        localStorage.setItem('isChecked', "false");
      return {
        ...state,
        isChecked: condition.isChecked,
      };
    case "SET_QUESTION": 
      localStorage.setItem('question', JSON.stringify(action.payload));
      return {
        ...state,
        question: action.payload,
      };
    case "SET_SCORE": 
      const score = action.payload;
      localStorage.setItem('score', score.toString());
      return {
        ...state,
        score: score,
      };
    case "SET_STARTER": 
      localStorage.setItem('starter', JSON.stringify(action.payload));
      return {
        ...state,
        starter: action.payload,
      };
    case "SET_TEAM":
      return {
        ...state,
        team: action.payload,
      };
    case "SET_WINNER":
      localStorage.setItem('winner', action.payload);
      return {
        ...state,
        winner: action.payload,
      };
    case "SET_SELECTED": 
      localStorage.setItem('selected', action.payload);
      return {
        ...state,
        selected: action.payload,
      };
    case "SET_ANSWER": 
      localStorage.setItem('answer', action.payload);
      return {
        ...state,
        answer: action.payload,
      };
    case "SET_ANNOUNCER": 
      localStorage.setItem('announcer', action.payload);
      return {
        ...state,
        announcer: action.payload,
      };
    case 'SET_ORDER_ID':
      const newOrderId = action.payload;
       
      localStorage.setItem('orderId', newOrderId.toString());
      return { ...state, orderId: newOrderId };
    case 'INCREMENT_ORDER_ID':
      const orderId = state.orderId+1;
      localStorage.setItem("isChecked", "false");
      localStorage.setItem('orderId', orderId.toString());
      return { ...state, orderId: orderId };
    case 'SET_CODE':
      const newCode = action.payload;
      localStorage.setItem('code', newCode);
      return { ...state, code: newCode };
    case 'TOGGLE_SIDEBAR':
      return { ...state, showSidebar: !state.showSidebar };
    case 'RESET':
      localStorage.setItem('code', '');
      localStorage.setItem('orderId', '');
      localStorage.setItem('announcer', '');
      localStorage.setItem('answer', '');
      localStorage.setItem('isChecked', 'false');
      localStorage.setItem('question', JSON.stringify(question));
      return { ...state, question: question, code: "", orderId: 0, announcer: "", answer: "", isChecked: false  };
    default:
      return state;
  }
};
