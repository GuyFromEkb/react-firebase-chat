import "./Avatar.scss";

import cn from "classnames";
import { FC } from "react";

import { handleImgError } from "../../utils/avatar/handleError";

interface IProps {
  photoUrl?: null | string
  className?: string
  height?: string
}

const Avatar: FC<IProps> = ({ className, photoUrl, height }) => {
  return (
    <img
      className={cn("avatar-el", className)}
      src={photoUrl ?? ""}
      alt="avatar"
      onError={handleImgError}
      style={{ height }}
    />
  )
}

export default Avatar
