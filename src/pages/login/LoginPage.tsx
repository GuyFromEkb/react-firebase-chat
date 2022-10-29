import { FC } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.scss";

const LoginPage: FC = () => {
  return (
    <div className="form">
      <div className="form__wrap">
        <div className="form__title">React Chat</div>
        <div className="form__subtitle">Login</div>
        <form className="form-reg">
          <input type="text" placeholder="Email" />
          <input type="Password" placeholder="Password" />
          <button>Login</button>
          <div className="form-reg__footer">
            You do not have an account? <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
