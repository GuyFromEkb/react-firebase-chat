import { FC, ReactNode, useState } from "react"
import cn from "classnames"
import { CSSTransition } from "react-transition-group"
import { ReactComponent as Arrow } from "../../assets/img/expand_more.svg"
import { observer } from "mobx-react-lite"
import "./Accordion.scss"

interface IAccordion {
  children: ReactNode
  title: string
  isOpenTitle?: string
  isAlreadyOpen?: boolean
}

const Accordion: FC<IAccordion> = ({ children, isAlreadyOpen = false, title, isOpenTitle }) => {
  const [isOpen, setIsOpen] = useState(isAlreadyOpen)

  const onToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="accordion-wrapper">
      <div onClick={onToggle} className="accordion-wrapper__header">
        <div className="accordion-wrapper__title">
          {isOpenTitle && isOpen ? isOpenTitle : title}
        </div>
        <span
          className={cn(
            "accordion-wrapper__header-toggle-icon",
            isOpen && "accordion-wrapper__header-toggle-icon--isOpen"
          )}
        >
          <Arrow />
        </span>
      </div>
      <div className="accordion-wrapper__content-wrapper">
        <CSSTransition
          in={isOpen}
          timeout={300}
          classNames="accordion-wrapper__content"
          unmountOnExit
        >
          <div>
            <div className="accordion-wrapper__content-body">{children}</div>
          </div>
        </CSSTransition>
      </div>
    </div>
  )
}
export default observer(Accordion)
