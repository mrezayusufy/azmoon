import { useContext } from "react";
import { useEffect } from "react";
import { createContext, useReducer } from "react";
import appReducer from "./app-reducer";

const AppContext = createContext();
const initialState = {
 
  theme: localStorage.getItem("theme") || "light",
  showSidebar: true,
};

// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(appReducer, initialState);

 

  const changeTheme = (theme) => {
    dispatch({ type: "CHANGE_THEME", payload: theme });
  };

  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  };


  useEffect(() => {
    localStorage.setItem("theme", state.theme);
  }, [state.theme]);

  return (
    <AppContext.Provider
      value={{ ...state, changeTheme, toggleSidebar }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext, AppProvider };
