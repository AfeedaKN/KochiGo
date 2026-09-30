import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

function Home() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  return (
    <div>
      <h1>Welcome to KochiGo</h1>

      <p>Welcome, {user?.name}</p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Home;