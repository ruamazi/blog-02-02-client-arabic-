import { createContext, useContext, useEffect, useState } from "react";
import { apiUrl } from "../pages/blog/Register";
import axios from "axios";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
 const [colors, setColors] = useState({ dark: {}, light: {} });
 const [darkMode, setDarkMode] = useState(() => {
  const savedTheme = localStorage.getItem("theme");
  return (
   savedTheme === "dark" ||
   (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );
 });

 const token = localStorage.getItem("token");

 const getColors = async () => {
  try {
   const resp = await axios.get(`${apiUrl}/api/blogs/get-colors`);
   setColors(resp.data);
   localStorage.setItem("colors", JSON.stringify(resp.data));
  } catch (error) {
   console.log(error);
  }
 };

 const updateColors = (theme, property, value) => {
  const updatedColors = {
   ...colors,
   [theme]: {
    ...colors[theme],
    [property]: value,
   },
  };
  setColors(updatedColors);
  localStorage.setItem("colors", JSON.stringify(updatedColors));
 };

 const saveColorsToDB = async () => {
  try {
   await axios.post(`${apiUrl}/api/admin/update-colors`, colors, {
    headers: { Authorization: `Bearer ${token}` },
   });
  } catch (error) {
   console.error("Failed to save colors:", error);
   alert("حدث خطأ أثناء حفظ الألوان");
  }
 };

 const resetColors = async () => {
  try {
   const resp = await axios.get(`${apiUrl}/api/admin/reset-colors`, {
    headers: { Authorization: `Bearer ${token}` },
   });
   setColors(resp.data);
   localStorage.setItem("colors", JSON.stringify(resp.data));
  } catch (error) {
   console.log(error);
  }
 };

 useEffect(() => {
  const storedColors = localStorage.getItem("colors");
  if (storedColors) {
   setColors(JSON.parse(storedColors));
  } else {
   getColors();
  }
 }, []);

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

 const getCurrentThemeColors = () => {
  return darkMode ? colors?.dark : colors?.light;
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
    saveColorsToDB,
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
