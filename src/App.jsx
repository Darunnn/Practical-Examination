import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "./features/themeSlice";
import ThemeToggle from "./components/ThemeToggle";
import ProductList from "./components/Product/ProductList";
import Cart from "./components/Product/Cart";
import ChatBox from "./components/chat/chatBox";
import RegistrationForm from './components/Register/RegistrationForm';
function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    document.documentElement.className = theme; 
  }, [theme]);
  const handleRegistration = async (formData) => {
    dispatch(registerStart());
    try {
      // Replace with your actual API call
      const response = await registerUser(formData);
      dispatch(registerSuccess(response.data));
    } catch (error) {
      dispatch(registerFailure(error.message));
      throw error; // This will trigger the error handling in the form
    }
  };
  return (
    <div > 
      <RegistrationForm onSubmit={handleRegistration} />
      <ThemeToggle />
      <ProductList />
      <ChatBox />
      <Cart/>
    </div>
  );
}

export default App;
