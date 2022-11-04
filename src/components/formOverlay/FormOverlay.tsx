import { FC } from "react"
import Loader from "../loader/Loader"
import "./FormOverlay.scss"

const FormOverlay: FC = () => {
  return (
    <div className="form-overlay">
      <Loader />
    </div>
  )
}

export default FormOverlay
