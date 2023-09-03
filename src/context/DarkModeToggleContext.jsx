import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeToggleContext = createContext();

function DarkModeToggleProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

  function toggleDarkMode() {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <DarkModeToggleContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeToggleContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeToggleContext);

  if (context === undefined)
    throw new Error("DarkModeToggleContext was used outside it's provider");

  return context;
}

export { DarkModeToggleProvider, useDarkMode };
