import "./LoginPage.scss";
import "react-toastify/dist/ReactToastify.css";

import { observer } from "mobx-react-lite";
import { FC, FormEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import FormOverlay from "../../components/formOverlay/FormOverlay";
import { useStore } from "../../hooks/useStore";

export interface IFormDataLogin {
  email: ""
  password: ""
}

type Inputs = {
  email: string
  password: string
}

const schema = yup
  .object({
    email: yup.string().typeError("is should be string").required().email(),
    password: yup.string().typeError("is should be string").required().min(6),
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

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  const onSubmitOLD = async (event: FormEvent<HTMLFormElement>) => {
    // event.preventDefault()
    // const loginData = {
    //   email: formState.email,
    //   password: formState.password,
    // }
    // await authStore.login(loginData)
    // navigate("/")
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
      <button onClick={notify}>Toast</button>
    </div>
  )
}

export default observer(LoginPage)
