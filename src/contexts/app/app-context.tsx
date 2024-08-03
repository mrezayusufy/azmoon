import React, { createContext, useReducer, ReactNode, useContext, useEffect } from 'react';
import { ContextProps } from '@/types';
import { initialState, reducer } from './app-reducer';
import { IQuestion } from '@/interfaces';

const AppContext = createContext<ContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const incrementOrderId = () => {
    dispatch({type: "SET_ORDER_ID", payload: state.orderId + 1})
  }
  const onStorageUpdate = (e: StorageEvent) => {
    const { key, newValue } = e as {key: string, newValue: string};
    if (key === "orderId") {
      dispatch({type: "SET_ORDER_ID", payload: parseInt(newValue) });
    } else if (key === "answer") {
      dispatch({type: "SET_ANSWER", payload: newValue});
    } else if (key === "question") {
      dispatch({type: "SET_QUESTION", payload: JSON.parse(newValue)});
    } else if (key === "isChecked") {
      dispatch({type: "CHECK_ANSWER", payload: JSON.parse(newValue)});
    } else if (key === "code") {
      dispatch({type: "SET_CODE", payload: newValue});
    } else if (key === "selected") {
      dispatch({type: "SET_SELECTED", payload: newValue});
    }
  };
  const eventListener = (event: KeyboardEvent) => {
    if (event.key === "i" || event.key === "ه") incrementOrderId();
    if (event.key === "y" || event.key === "غ") document.location.replace("/")
  }
  useEffect(() => {
    window.addEventListener("keydown", eventListener)
    window.addEventListener("storage", onStorageUpdate);
    return () => {
      window.removeEventListener("keydown", eventListener)
      window.removeEventListener("storage", onStorageUpdate);
    };
  },[])
  const setQuestion = (question: IQuestion) => {
    dispatch({type: "SET_QUESTION", payload: question})
  }
  const setSelected = (selected: string) => {
    dispatch({type: "SET_SELECTED", payload: selected})
  }
  const setAnswer = (answer: string) => {
    dispatch({type: "SET_ANSWER", payload: answer})
  }
  const checkAnswer = (condition = 0) => {
    dispatch({type: "CHECK_ANSWER", payload: condition})
  }
  const setCode = (code: string) => {
    dispatch({type: "SET_CODE", payload: code})
  }
  const setOrderId = (orderId: number) => {
    dispatch({type: "SET_ORDER_ID", payload: orderId})
  }
  
  const value = {
    state,
    setQuestion,
    setAnswer,
    setCode,
    setOrderId,
    checkAnswer,
    setSelected,
    dispatch
  }
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): ContextProps => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
