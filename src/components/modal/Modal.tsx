import { FC } from "react"

import Portal from "components/portal/Portal"

interface IProps {
  isShow: boolean
  onClose: () => void
}

const ModalProfileSetting: FC<IProps> = ({ isShow, onClose }) => {
  return (
    <Portal handleClose={onClose} isShow={isShow}>
      <h1>Privet!</h1>
      <button onClick={onClose}>Close</button>
    </Portal>
  )
}

export default ModalProfileSetting
