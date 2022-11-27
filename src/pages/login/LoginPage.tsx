import "./LoginPage.scss";

import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import FormOverlay from "../../components/formOverlay/FormOverlay";
import { useStore } from "../../hooks/useStore";

type Inputs = {
  email: string
  password: string
}

const schema = yup
  .object({
    email: yup
      .string()
      .typeError("Is should be string")
      .required("E-mail is a required field")
      .email("Invalid e-mail"),
    password: yup
      .string()
      .typeError("Is should be string")
      .required("Password is a required field")
      .min(6, "Password must be at least 6 characters"),
  })
  .required()

const LoginPage: FC = () => {
  const { authStore } = useStore()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<Inputs>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    reValidateMode: "onBlur",
  })

  useEffect(() => {
    return () => {
      toast.dismiss()
      authStore.reset()
    }
  }, [authStore])

  useEffect(() => {
    if (!authStore.error) return

    toast.error(authStore.error, {
      closeButton: false,
      autoClose: 2500,
    })
  }, [authStore.error])

  const onSubmit: SubmitHandler<Inputs> = async (userData) => {
    const isAccess = await authStore.login(userData)
    isAccess && navigate("/")
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
        <form onSubmit={handleSubmit(onSubmit)} className="form-reg">
          <label>
            {errors.email && <div className="form__error">{errors.email.message}</div>}
            <input
              {...register("email", {
                onChange: () => {
                  clearErrors("email")
                },
              })}
              placeholder="Email"
            />
          </label>
          <label>
            {errors.password && <div className="form__error">{errors.password.message}</div>}
            <input
              {...register("password", {
                onChange: () => {
                  clearErrors("password")
                },
              })}
              placeholder="Password"
              type="password"
            />
          </label>
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
