import { SyntheticEvent } from "react";

import errorImgSrc from "../../assets/img/avatar404.png";

/**
 * Если при загрузки изображения происходит ошибка, подменяет изображения и обнуляет ошибку
 * @param {event} e event Img Tag
 * @returns void => reset error and change src
 */
export const handleImgError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = errorImgSrc
  e.currentTarget.onerror = null
}
