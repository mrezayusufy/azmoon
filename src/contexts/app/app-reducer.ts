import { State, Action } from '@/types';

export const initialState: State = {
  orderId: parseInt(localStorage.getItem('orderId') as string) || 0,
  isChecked: Boolean(JSON.parse(localStorage.getItem('isChecked') as string)) || false,
  isCorrect: Boolean(localStorage.getItem('isCorrect')) || false,
  code: localStorage.getItem('code') || '',
  answer: localStorage.getItem("answer") || '',
  selected: localStorage.getItem("selected") || '',
  question: JSON.parse(localStorage.getItem("question") as string) || null,
  showSidebar: Boolean(localStorage.getItem("showSidebar")) || true
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "TOGGLE_SIDEBAR": 
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
    case "CHECK_ANSWER": 
      const condition = action.payload;
      console.log("condition", condition);
      if(condition === 0)
        localStorage.setItem('isChecked', "false");
      else
        localStorage.setItem('isChecked', "true");
      return {
        ...state,
        isChecked: condition === 0 ? false : true,
      };
    case "SET_QUESTION": 
      localStorage.setItem('question', JSON.stringify(action.payload));
      return {
        ...state,
        question: action.payload,
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
    case 'SET_ORDER_ID':
      const newOrderId = action.payload;
      localStorage.setItem('orderId', newOrderId.toString());
      return { ...state, orderId: newOrderId };
    case 'SET_CODE':
      const newCode = action.payload;
      localStorage.setItem('code', newCode);
      return { ...state, code: newCode };
    default:
      return state;
  }
};
