import React from "react";
import axios from "axios";

function SignUpForm() {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async evt => {
    evt.preventDefault();

    const { name, email, password } = state;

    try {
      const response = await axios.post("https://gladiator-api-8x04.onrender.com/user/users/register", {
        name,
        email,
        password
      });

      // Handle successful signup (e.g., redirect to login page, show success message)
      alert(`Sign up successful!`);

      // Clear form fields
      setState({
        name: "",
        email: "",
        password: ""
      });

    } catch (error) {
      // Handle signup error (e.g., display error message)
      alert(`Sign up failed: ${error.response.data.message}`);
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
