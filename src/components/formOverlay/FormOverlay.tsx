import "./FormOverlay.scss";

import { FC } from "react";

import Loader from "../loader/Loader";

const FormOverlay: FC = () => {
  return (
    <div className="form-overlay">
      <Loader />
    </div>
  )
}

export default FormOverlay
