import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignInForm() {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { email, password } = state;

    try {
      const response = await axios.post("https://gladiator-api-8x04.onrender.com/user/users/login", {
        email,
        password
      });

      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);

      // Handle successful login (e.g., store token in localStorage, redirect, etc.)
      alert(`Login successful!`);

      // Redirect to the root route
      navigate("/");

      // Clear form fields
      setState({
        email: "",
        password: ""
      });

    } catch (error) {
      // Handle login error (e.g., display error message)
      alert(`Login failed: ${error.response.data.message}`);
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Sign in</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <a href="#">Forgot your password?</a>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
