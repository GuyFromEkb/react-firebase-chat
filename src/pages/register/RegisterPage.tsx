import { observer } from "mobx-react-lite";
import { FC, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loadAvatar from "../../assets/img/addAvatar.png";
import FormOverlay from "../../components/formOverlay/FormOverlay";
import { authStore } from "../../stores/authStore";
import "./RegisterPage.scss";

export interface IFormData {
  displayName: "";
  email: "";
  password: "";
  avatar: File | undefined;
}
const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<IFormData>({
    displayName: "",
    email: "",
    password: "",
    avatar: undefined,
  });
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

  const handleChangeForm = (prop: keyof IFormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (prop === "avatar") {
      setFormState({ ...formState, [prop]: event.target.files?.[0] });
      handleChangeAvatar(event);
      return;
    }

    setFormState({ ...formState, [prop]: event.target.value });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const registerData = {
      displayName: formState.displayName,
      email: formState.email,
      password: formState.password,
      avatar: formState.avatar,
    };

    await authStore.registerUser(registerData);
    navigate("/");
  };

  return (
    <div className="form">
      <div className="form__wrap">
        <div className="form__title">React Chat</div>
        <div className="form__subtitle">Register</div>
        <form onSubmit={onSubmit} className="form-reg">
          <input onChange={handleChangeForm("displayName")} name="displayName" type="text" placeholder="Display Name" />
          <input onChange={handleChangeForm("email")} name="email" type="text" placeholder="Email" />
          <input onChange={handleChangeForm("password")} name="password" type="Password" placeholder="Password" />
          <label className="form-reg__input-file">
            <img
              style={{ borderRadius: prevAvatar && "50%" }}
              src={prevAvatar ? prevAvatar : loadAvatar}
              alt="load-avatar"
            />
            <span>Add an avatar</span>
            <input name="avatar" onChange={handleChangeForm("avatar")} accept="image/*" type="file" />
          </label>
          <button className="btn">Sign Up</button>
          <div className="form-reg__footer">
            You do have an account? <Link to="/login">Login</Link>
          </div>

          {authStore.isLoading && <FormOverlay />}
        </form>
      </div>
    </div>
  );
};

export default observer(RegisterPage);
