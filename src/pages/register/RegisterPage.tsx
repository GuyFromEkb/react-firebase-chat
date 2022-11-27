import "./RegisterPage.scss";

import { observer } from "mobx-react-lite";
import { FC, FormEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import schema from "yup/lib/schema";

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

type Inputs = {
  displayName: string
  email: string
  password: string
  avatar: FileList
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
  } = useForm<Inputs>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    // resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<Inputs> = async (userData) => {
    console.log("userData", userData)
    // const isAccess = await authStore.login(userData)
    // isAccess && navigate("/")
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
          <input {...register("displayName")} placeholder="Display Name" />
          <input {...register("email")} placeholder="Email" />
          <input {...register("password")} type="Password" placeholder="Password" />
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
