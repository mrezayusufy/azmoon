import React, { createContext, useReducer, ReactNode, useContext, useEffect } from 'react';
import { ContextProps } from '@/types';
import { initialState, reducer } from './app-reducer';
import { IQuestion, ITeam } from '@/interfaces';
import { SHORTCUTS } from '@/constants';
import { starterType } from '@/types/app.type';

const AppContext = createContext<ContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // actions
  const incrementOrderId = () => {
    dispatch({type: "INCREMENT_ORDER_ID"})
  }
  const setQuestion = (question: IQuestion) => {
    dispatch({type: "SET_QUESTION", payload: question})
  }
  const setStarter = (value: starterType) => {
    dispatch({type: "SET_STARTER", payload: value})
  }
  const setWinner = (value: string) => {
    dispatch({type: "SET_WINNER", payload: value})
  }
  const setTeam = (value: ITeam) => {
    dispatch({type: "SET_TEAM", payload: value})
  }
  const reset = () => {
    dispatch({type: "RESET"})
  }
  const toggleSidebar = () => {
    dispatch({type: "TOGGLE_SIDEBAR"})
  }
  const setSelected = (selected: string) => {
    dispatch({type: "SET_SELECTED", payload: selected})
  }
  const setAnswer = (answer: string) => {
    dispatch({type: "SET_ANSWER", payload: answer})
  }
  const checkAnswer = (value: boolean) => {
    dispatch({type: "CHECK_ANSWER", payload: {isChecked: value}})
  }
  const setCode = (code: string) => {
    dispatch({type: "SET_CODE", payload: code})
  }
  const setOrderId = (orderId: number) => {
    dispatch({type: "SET_ORDER_ID", payload: orderId})
  }
  
  const setAnnouncer = (value: string) => {
    dispatch({type: "SET_ANNOUNCER", payload: value})
  }
  // sync localstorage
  const onStorageUpdate = (e: StorageEvent) => {
    const { key, newValue } = e as {key: string, newValue: any};
    if (key === "orderId") {
      setOrderId(parseInt(newValue));
    } else if (key === "announcer") {
      setAnnouncer(newValue);
    } else if (key === "answer") {
      setAnswer(newValue);
    } else if (key === "question") {
      setQuestion(JSON.parse(newValue))
    } else if (key === "isChecked") {
      checkAnswer(JSON.parse(newValue));
    } else if (key === "code") {
      setCode(newValue);
    } else if (key === "selected") {
      setSelected(newValue);
    } else if (key === "starter") {
      setStarter(JSON.parse(newValue));
    }
  };
 
  // keyboard event handler for increment and nav to home page
  const eventListener = (event: KeyboardEvent) => {
    event.preventDefault();
    if (event.ctrlKey && (event.key === "]" || event.key === "چ")) incrementOrderId();
    if (event.ctrlKey && (event.key === SHORTCUTS.home.key || event.key === SHORTCUTS.home.persianKey)) document.location.replace("/")
  }

  useEffect(() => {
    window.addEventListener("keydown", eventListener)
    window.addEventListener("storage", onStorageUpdate);
    return () => {
      window.removeEventListener("keydown", eventListener)
      window.removeEventListener("storage", onStorageUpdate);
    };
  },[])
 
  
  const value = {
    state,
    setQuestion,
    setAnnouncer,
    setAnswer,
    setCode,
    reset,
    setOrderId,
    checkAnswer,
    setSelected,
    setTeam,
    toggleSidebar,
    setWinner,
    setStarter,
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
