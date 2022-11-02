import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { setDoc, doc, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { FC, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import loadAvatar from "../../assets/img/addAvatar.png";
import { auth, db, storage } from "../../firebase";
import "./RegisterPage.scss";

interface CustomElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  avatar: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

interface IFormState {
  name: "";
  email: "";
  password: "";
  avatar: File | undefined;
}
const RegisterPage: FC = () => {
  const [formState, setFormState] = useState<IFormState>({
    name: "",
    email: "",
    password: "",
    avatar: undefined,
  });
  const [prevAvatar, setPrevAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleChange = (prop: keyof IFormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (prop === "avatar") {
      setFormState({ ...formState, [prop]: event.target.files?.[0] });
      handleChangeAvatar(event);
      return;
    }

    setFormState({ ...formState, [prop]: event.target.value });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      name: formState.name,
      email: formState.email,
      password: formState.password,
      avatar: formState.avatar,
    };
    setIsLoading(true);

    await registerUser(data);

    setIsLoading(false);
  };

  const registerUser = async ({ email, password, name: displayName, avatar }: IFormState) => {
    if (!avatar) return;

    const res = await createUserWithEmailAndPassword(auth, email, password);

    const date = new Date().getTime();
    const storageRef = ref(storage, `${displayName + date}`);

    await uploadBytesResumable(storageRef, avatar);
    const downloadURL = await getDownloadURL(storageRef);

    await updateProfile(res.user, {
      displayName,
      photoURL: downloadURL,
    });

    await setDoc(doc(db, "users", res.user.uid), {
      uid: res.user.uid,
      displayName,
      email,
      photoURL: downloadURL,
    });

    await setDoc(doc(db, "userChats", res.user.uid), {});
  };

  const avatarImg = prevAvatar ? prevAvatar : loadAvatar;
  return (
    <div className="form">
      <div className="form__wrap">
        <div className="form__title">React Chat</div>
        <div className="form__subtitle">Register</div>
        <form onSubmit={onSubmit} className="form-reg">
          <input onChange={handleChange("name")} name="name" type="text" placeholder="Display Name" />
          <input onChange={handleChange("email")} name="email" type="text" placeholder="Email" />
          <input onChange={handleChange("password")} name="password" type="Password" placeholder="Password" />
          <label className="form-reg__input-file">
            <img style={{ borderRadius: prevAvatar && "50%" }} src={avatarImg} alt="load-avatar" />
            <span>Add an avatar</span>
            <input name="avatar" onChange={handleChange("avatar")} accept="image/*" type="file" />
          </label>
          <button>Sign Up</button>
          <div className="form-reg__footer">
            You do have an account? <Link to="/login">Login</Link>
          </div>
        </form>
        <h4>{isLoading && "Loading"}</h4>
      </div>
    </div>
  );
};

export default RegisterPage;
