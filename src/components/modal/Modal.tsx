import "./Modal.scss"

import { yupResolver } from "@hookform/resolvers/yup"
import emptyAvatar from "assets/img/avatarEmpty.png"
import { ReactComponent as IconClose } from "assets/img/iconClose.svg"
import { useStore } from "hooks/useStore"
import { observer } from "mobx-react-lite"
import { FC, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup"

import Portal from "components/portal/Portal"

const schema = yup
  .object({
    displayName: yup
      .string()
      .typeError("Is should be string")
      .required("Display name is a required field")
      .min(3, "Display name must be at least 3 characters"),
  })
  .required()

export interface IProfileInputs {
  displayName: string
  avatar?: FileList
}

const ModalProfileSetting: FC = () => {
  const {
    profileStore: {
      displayName,
      photoUrl,
      modal: { isOpen, close },
    },
  } = useStore()

  const [prevAvatar, setPrevAvatar] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<IProfileInputs>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(schema),
  })

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

  const onSubmit: SubmitHandler<IProfileInputs> = async (userData) => {
    console.log("userData", userData)
  }

  return (
    <Portal handleClose={close} isShow={isOpen}>
      <div className="profile">
        <IconClose onClick={close} className="profile__close" />
        <h4 className="profile__title">Settings12</h4>

        <form onSubmit={handleSubmit(onSubmit)} className="form-reg">
          <label>
            {errors.displayName && <div className="form__error">{errors.displayName.message}</div>}
            <input
              {...register("displayName")}
              onChange={() => clearErrors("displayName")}
              placeholder="Display Name"
              defaultValue={displayName}
            />
          </label>

          <label className="form-reg__input-file">
            <img
              style={{ borderRadius: "50%" }}
              src={prevAvatar || photoUrl || emptyAvatar}
              alt="load-avatar"
            />
            <span>Change Avatar</span>
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
          <button className="btn">Update Profile</button>
        </form>
      </div>
    </Portal>
  )
}

export default observer(ModalProfileSetting)
