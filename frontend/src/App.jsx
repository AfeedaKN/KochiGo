import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { getProfile } from "./services/auth.service";
import { loginSuccess, logout } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    const restoreUser = async () => {
      try {
        const data = await getProfile();

        dispatch(
          loginSuccess({
            user: data.user,
            token: token,
          })
        );
      } catch (error) {
        localStorage.removeItem("token");
        dispatch(logout());
      }
    };

    restoreUser();
  }, [dispatch]);

  return <>{isAuthenticated ? <Home /> : <Auth />}</>;
}

export default App;