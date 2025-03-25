import { createContext, useContext, useEffect, useState } from "react";

const websiteThemeSchema = {
 dark: {
  primaryBackground: "#101828",
  secondaryBackground: "#1e2938",
  tertiaryBackground: "#141d27", // comment bg
  primaryColor: "#ffffff",
  secondaryColor: "#d1d5dc",
  primaryBtn: "#2c7fff", //blue btn
  secondaryBtn: "#00c951", // green btn
  tertiaryBtn: "#e8000b", // red btn
  quaternaryBtn: "#e17100", //gold btn
  backToHomeBtn: "#45556c",
  grayColor: "#6a7282", // gray for btn and text
 },
 light: {
  primaryBackground: "#e6e7eb",
  secondaryBackground: "#ffffff",
  tertiaryBackground: "#dceaff", // comment bg
  primaryColor: "#1e2938",
  secondaryColor: "#364154",
  primaryBtn: "#2c7fff", //blue btn
  secondaryBtn: "#00c951", //green btn
  tertiaryBtn: "#e8000b", //red btn
  quaternaryBtn: "#e17100", //gold btn
  backToHomeBtn: "#45556c",
  grayColor: "#6a7282", // gray for btn and text
 },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
 const [darkMode, setDarkMode] = useState(() => {
  const savedTheme = localStorage.getItem("theme");
  return (
   savedTheme === "dark" ||
   (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
 });

 const [colors, setColors] = useState(websiteThemeSchema);

 useEffect(() => {
  if (darkMode) {
   document.documentElement.classList.add("dark");
   localStorage.setItem("theme", "dark");
  } else {
   document.documentElement.classList.remove("dark");
   localStorage.setItem("theme", "light");
  }
 }, [darkMode]);

 const toggleDarkMode = () => {
  setDarkMode(!darkMode);
 };

 const updateColors = (theme, property, value) => {
  setColors((prev) => ({
   ...prev,
   [theme]: {
    ...prev[theme],
    [property]: value,
   },
  }));
 };

 const resetColors = () => {
  setColors(websiteThemeSchema);
 };

 const getCurrentThemeColors = () => {
  return darkMode ? colors.dark : colors.light;
 };

 return (
  <ThemeContext.Provider
   value={{
    darkMode,
    toggleDarkMode,
    colors,
    currentColors: getCurrentThemeColors(),
    updateColors,
    resetColors,
   }}
  >
   {children}
  </ThemeContext.Provider>
 );
};

export const useTheme = () => {
 const context = useContext(ThemeContext);
 if (!context) {
  throw new Error("useTheme must be used within a ThemeProvider");
 }
 return context;
};
