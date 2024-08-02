import { ReactElement, useContext, useReducer, createContext, useEffect } from "react";
import appReducer from "./app-reducer";

const initialState = {
  theme: localStorage.getItem("theme") || "light",
  showSidebar: true,
  toggleSidebar: () => {}
};
const AppContext = createContext(initialState);

// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }: {children: ReactElement}) => {

  const [state, dispatch] = useReducer(appReducer, initialState);

 

  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  };


  useEffect(() => {
    localStorage.setItem("theme", state.theme);
  }, [state.theme]);

  return (
    <AppContext.Provider
      value={{ ...state, toggleSidebar }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext, AppProvider };
