import { FC, useState } from "react";
import { Link } from "react-router-dom";
import loadAvatar from "../../assets/img/addAvatar.png";
import "./RegisterPage.scss";

const RegisterPage: FC = () => {
  const [prevAvatar, setPrevAvatar] = useState("");

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files?.[0];
    if (!imgFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(imgFile);

    reader.onload = () => {
      if (reader.readyState === 2 && typeof reader.result === "string") {
        setPrevAvatar(reader.result);
      }
    };
  };

  const avatarImg = prevAvatar ? prevAvatar : loadAvatar;
  return (
    <div className="form">
      <div className="form__wrap">
        <div className="form__title">React Chat</div>
        <div className="form__subtitle">Register</div>
        <form className="form-reg">
          <input type="text" placeholder="Display Name" />
          <input type="text" placeholder="Email" />
          <input type="Password" placeholder="Password" />
          <label className="form-reg__input-file">
            <img style={{ borderRadius: prevAvatar && "50%" }} src={avatarImg} alt="load-avatar" />
            <span>Add an avatar</span>
            <input onChange={handleChangeAvatar} accept="image/*" type="file" />
          </label>
          <button>Sign Up</button>
          <div className="form-reg__footer">
            You do have an account? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
