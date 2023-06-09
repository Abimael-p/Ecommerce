import { useId, useState } from "react";
import "./LoginForm.css";

const LoginForm = ({ onLogin }) => {
  const nameId = useId();
  const passwordId = useId();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const newFormData = { ...formData, [name]: value };

    setFormData(newFormData);
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) return;

    onLogin(formData);
  };

  return (
    <form onSubmit={handlesubmit}>
      <div className="container__form__login">
        <div>
          <div>
            <label htmlFor={nameId}>Email</label>
          </div>
          <input
            type="email"
            value={formData.email}
            onChange={handleChange}
            id={nameId}
            name="email"
            required
          />
        </div>
        <div>
          <div>
            <label htmlFor={passwordId}>Password</label>
          </div>
          <input
            type={isPasswordVisible ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            name="password"
            id={passwordId}
            required
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <i className="bx bx-low-vision"></i>
          </button>
        </div>
      </div>

      <div className="container__button__login">
        <button className="button__login" type="submit">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
