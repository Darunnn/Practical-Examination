import useTheme from "../hooks/useTheme";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, switchTheme } = useTheme(); 

  return (
    
 
    <div style={{display: "flex", justifyContent: "flex-end"}}>
        <a
  onClick={switchTheme}
 
    
    style={{  cursor: 'pointer' }}
>
  {theme === "light" ? <Moon size={30} color="black" /> : <Sun size={30}  color='#ffffff'/>}
</a>
    </div>
  );
};

export default ThemeToggle;
