import "./LoginPage.scss";
import "react-toastify/dist/ReactToastify.css";

import { observer } from "mobx-react-lite";
import { FC, FormEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import FormOverlay from "../../components/formOverlay/FormOverlay";
import { useStore } from "../../hooks/useStore";

export interface IFormDataLogin {
  email: ""
  password: ""
}

type Inputs = {
  Email: string
  password: string
}

const LoginPage: FC = () => {
  const { authStore } = useStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmitt: SubmitHandler<Inputs> = (data) => console.log(data)

  const navigate = useNavigate()
  const [formState, setFormState] = useState<IFormDataLogin>({
    email: "",
    password: "",
  })
  const handleChangeForm =
    (prop: keyof IFormDataLogin) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormState({ ...formState, [prop]: event.target.value })
    }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const loginData = {
      email: formState.email,
      password: formState.password,
    }

    await authStore.login(loginData)
    navigate("/")
  }

  const onLoginWithGoogleAcc = async () => {
    await authStore.loginWithGoogleAcc()
    navigate("/")
  }

  const notify = () =>
    toast.error(
      "Wow so easy!Wow so easy!Wow so easy!Wow so easy!Wow so easy!Wow so easy!Wow so easy!Wow so easy!Wow so easy!Wow so easy!",
      {
        closeButton: false,
        autoClose: 4000,
      }
    )

  return (
    <div className="form">
      <div className="form__wrap">
        <div className="form__title">React Chat</div>
        <div className="form__subtitle">Login</div>
        <form onSubmit={onSubmit} className="form-reg">
          <input
            onChange={handleChangeForm("email")}
            value={formState.email}
            type="text"
            placeholder="Email"
          />
          <input
            onChange={handleChangeForm("password")}
            value={formState.password}
            type="Password"
            placeholder="Password"
          />
          <button>Login</button>

          <div className="form-reg__footer">
            <div>
              You do not have an account? <Link to="/register">Register</Link>
            </div>
            <div>
              Sign in with <span onClick={onLoginWithGoogleAcc}>google account</span>
            </div>
          </div>
          {authStore.isLoading && <FormOverlay />}
        </form>
      </div>
      <button onClick={notify}>Toast</button>
    </div>
  )
}

export default observer(LoginPage)
