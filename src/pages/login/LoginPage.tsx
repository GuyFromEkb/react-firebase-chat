import { observer } from "mobx-react-lite"
import { FC, FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import FormOverlay from "../../components/formOverlay/FormOverlay"
import { useStore } from "../../hooks/useStore"
import "./LoginPage.scss"

export interface IFormDataLogin {
  email: ""
  password: ""
}

const LoginPage: FC = () => {
  const { authStore } = useStore()
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
    </div>
  )
}

export default observer(LoginPage)
