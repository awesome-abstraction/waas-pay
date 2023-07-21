import React, { useState, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group';

import "./SelectableOption.css"

export default ({ id, title, description, requiresAdditionalInfo }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSelected, setIsSelected] = useState(false)
  const nodeRef = useRef(null);

  const clickHandler = (e) => {
    if (requiresAdditionalInfo) {
      setIsExpanded(true)
    } else {
      if (isSelected) {
        setIsSelected(false)
      } else {
        setIsSelected(true)
      } 
    }
  }

  return (
    <div className={"selectable-option-container"}>
      <div className={"selectable-option-radio-outline"}>
        <CSSTransition nodeRef={nodeRef} in={isSelected} timeout={300} classNames="radio-button-fill">
          <div ref={nodeRef} />
        </CSSTransition>
      </div>
      <div className={"selectable-option-text-container"} onClick={clickHandler}>
        <h3 className={"selectable-option-title"}>
          {title}
        </h3>
        <p className={"selectable-option-description"}>
          {description}
        </p>
      </div>
      {isExpanded && (
        <div className="selectable-modal-background">
          <div className='selectable-modal'>
          <div className={"selectable-option-text-container"} onClick={clickHandler}>
              <h3 className={"selectable-option-title title-modal"}>
                {title}
              </h3>
              <p className={"selectable-option-description title-description"}>
                {description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>

  )
}