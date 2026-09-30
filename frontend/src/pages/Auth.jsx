import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { loginUser, registerUser } from "../services/auth.service";

function Auth() {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    let data;

    if (isLogin) {
      data = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      dispatch(
        loginSuccess({
          user: {
            id: data.id,
            name: data.name,
            email: data.email,
          },
          token: data.token,
        })
      );
        localStorage.setItem("token", data.token);

    } else {
      data = await registerUser(formData);
    }

    setMessage(data.message);

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  } catch (error) {
    setMessage(
      error.response?.data?.message || "Something went wrong"
    );
  }
};

  return (
    <div>
      <h1>KochiGo</h1>

      {isLogin ? <h2>Login</h2> : <h2>Register</h2>}

      <form onSubmit={handleSubmit}>

        {!isLogin && (
          <div>
            <label>Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        )}

        <div>
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      {message && <p>{message}</p>}

      <button
        type="button"
        onClick={() => {
          setIsLogin(!isLogin);
          setMessage("");
          setFormData({
            name: "",
            email: "",
            password: "",
          });
        }}
      >
        {isLogin
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </button>
    </div>
  );
}

export default Auth;