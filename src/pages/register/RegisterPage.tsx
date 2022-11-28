import "./RegisterPage.scss";

import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import loadAvatar from "../../assets/img/addAvatar.png";
import FormOverlay from "../../components/formOverlay/FormOverlay";
import { useStore } from "../../hooks/useStore";

export interface IFormData {
  displayName: ""
  email: ""
  password: ""
  avatar: File | undefined
}

const schema = yup
  .object({
    displayName: yup
      .string()
      .typeError("Is should be string")
      .required("Display name is a required field")
      .min(3, "Display name must be at least 3 characters"),
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

export interface IRegisterInputs {
  displayName: string
  email: string
  password: string
  avatar?: FileList
}

const RegisterPage: FC = () => {
  const { authStore } = useStore()
  const navigate = useNavigate()
  const [prevAvatar, setPrevAvatar] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<IRegisterInputs>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<IRegisterInputs> = async (userData) => {
    await authStore.registerUser(userData)
    const isRegistered = await authStore.login(userData)
    isRegistered && navigate("/")
  }

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files?.[0]
    if (!imgFile) return

    const reader = new FileReader()
    reader.readAsDataURL(imgFile)

    reader.onload = () => {
      if (reader.readyState === 2 && typeof reader.result === "string") {
        setPrevAvatar(reader.result)
      }
    }
  }

  // const onSubmitOLD = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()

  //   // const registerData = {
  //   //   displayName: formState.displayName,
  //   //   email: formState.email,
  //   //   password: formState.password,
  //   //   avatar: formState.avatar,
  //   // }

  //   // await authStore.registerUser(registerData)
  //   // navigate("/")
  // }

  return (
    <div className="form">
      <div className="form__wrap">
        <div className="form__title">React Chat</div>
        <div className="form__subtitle">Register</div>

        <form onSubmit={handleSubmit(onSubmit)} className="form-reg">
          <label>
            {errors.displayName && <div className="form__error">{errors.displayName.message}</div>}
            <input
              {...register("displayName")}
              onChange={() => clearErrors("displayName")}
              placeholder="Display Name"
            />
          </label>
          <label>
            {errors.email && <div className="form__error">{errors.email.message}</div>}
            <input
              {...register("email")}
              onChange={() => clearErrors("email")}
              placeholder="Email"
            />
          </label>
          <label>
            {errors.password && <div className="form__error">{errors.password.message}</div>}
            <input
              {...register("password")}
              onChange={() => clearErrors("password")}
              type="Password"
              placeholder="Password"
            />
          </label>
          <label className="form-reg__input-file">
            <img
              style={{ borderRadius: prevAvatar && "50%" }}
              src={prevAvatar ? prevAvatar : loadAvatar}
              alt="load-avatar"
            />
            <span>Add an avatar</span>
            <input
              {...register("avatar")}
              onChange={(e) => {
                register("avatar").onChange(e)
                handleChangeAvatar(e)
              }}
              accept="image/*"
              type="file"
            />
          </label>
          <button className="btn">Sign Up</button>
          <div className="form-reg__footer">
            You do have an account? <Link to="/login">Login</Link>
          </div>

          {authStore.isLoading && <FormOverlay />}
        </form>
      </div>
    </div>
  )
}

export default observer(RegisterPage)
