import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "./features/themeSlice";
import ThemeToggle from "./components/ThemeToggle";
import ProductList from "./components/Product/ProductList";
function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    document.documentElement.className = theme; 
  }, [theme]);

  return (
    <div > 
   
      <ThemeToggle />
      <ProductList />
    </div>
  );
}

export default App;
