import { useEffect, useState } from "react"
import Clip from "../assets/Clip"
import Done from "../assets/Done"
import { CSSTransition } from 'react-transition-group';

export default ({ formValues, name, selectedWallet, fill, cid }) => {
  const [linkCopied, setLinkCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(`localhost:3000/employee?cid=${cid}`)
    setLinkCopied(true)
  }

  return (<div className="slide-padding signup-container slide-scrollable">
    <Done className={"options-fixed-background"} fill={fill}/>
    <div className="slide-text-container slide-text-container-scrollable" style={{"marginTop": "40px"}}>
      <h1>
        All done! 
      </h1>
      <h3>
        You can copy the following link and share it with your users.
      </h3>

      <p className="link-copy">
        {`localhost:3000/employee?cid=${cid}`}
      </p>
      <Clip className={"clip"} onClick={copy}/>
      <CSSTransition in={linkCopied} timeout={300} classNames="link-copied-alert">
        <h3 className="link-copied-alert hidden-link">
          Link copied!
        </h3>
      </CSSTransition>
    </div>
  </div>
  )
}