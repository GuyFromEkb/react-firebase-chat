import "./Loader.scss";

import { FC } from "react";

const Loader: FC = () => {
  return (
    <div className="loader">
      <svg viewBox="0 0 100 100">
        <defs>
          <filter id="loader-shadow">
            <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#ffffff7d" />
          </filter>
        </defs>
        <circle className="loader__spinner" cx="50" cy="50" r="45" />
      </svg>
    </div>
  )
}

export default Loader
