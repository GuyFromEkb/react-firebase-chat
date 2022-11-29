import "./Portal.scss"

import React, { FC, useCallback, useEffect } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"

const portalRoot = document.getElementById("modals-root")!

interface IProps {
  children: React.ReactNode
  isShow: boolean
  handleClose: () => void
}

const Portal: FC<IProps> = ({ children, isShow, handleClose }) => {
  const closeOnEspBtn = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        handleClose()
      }
    },
    [handleClose]
  )

  useEffect(() => {
    if (isShow) {
      window.addEventListener("keydown", closeOnEspBtn)

      return () => window.removeEventListener("keydown", closeOnEspBtn)
    }
  }, [isShow, closeOnEspBtn])

  return createPortal(
    <CSSTransition timeout={300} unmountOnExit classNames={"portal"} in={isShow}>
      <div onClick={handleClose} className="portal__layout">
        <div onClick={(e) => e.stopPropagation()} className="portal__content">
          {children}
        </div>
      </div>
    </CSSTransition>,
    portalRoot
  )
}

export default Portal
