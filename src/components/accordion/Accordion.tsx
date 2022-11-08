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
    <section className="accordion-wrapper">
      <div onClick={onToggle} className="accordion-wrapper__header">
        <h4 className="accordion-wrapper__title">{isOpenTitle && isOpen ? isOpenTitle : title}</h4>
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
          <section>
            <section className="accordion-wrapper__content-body">{children}</section>
          </section>
        </CSSTransition>
      </div>
    </section>
  )
}
export default observer(Accordion)
