import useTheme from "../hooks/useTheme";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, switchTheme } = useTheme(); // ใช้ hook ที่ทำงานร่วมกับ Redux

  return (
    
 
    <div style={{display: "flex", justifyContent: "flex-end"}}>
         <button
      onClick={switchTheme} 
      className={` p-2 rounded-full transition-colors duration-300 
        ${theme === "light" ? "bg-gray-200 text-black" : "bg-gray-800 text-white"}`}  
    >
      {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
    </button>
    </div>
  );
};

export default ThemeToggle;
