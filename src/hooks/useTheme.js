import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/themeSlice"; // หรือเส้นทางที่ถูกต้อง

const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const switchTheme = () => {
    dispatch(toggleTheme()); 
  };

  return {
    theme,
    switchTheme,
  };
};

export default useTheme;
