import React, { useState, useEffect, useRef } from 'react'

import "./SelectableOption.css"

export default ({ id, title, description }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const clickHandler = (e) => {
    setIsExpanded(true)
  }

  return (
    <div>
      <div className={'selectable-option'} onClick={clickHandler}>
        <h3 className={"selectable-option-title"}>
          {title}
        </h3>
        <p className={"selectable-option-description"}>
          {description}
        </p>
      </div>
      {isExpanded && <div className="selectable-modal-background">modal</div>}
    </div>

  )
}