import { useState } from "react"
import { useSwiper } from 'swiper/react';
import SignupSvg from "../assets/SignupSvg"
import SelectableOption from "./SelectableOption";
import { CSSTransition } from 'react-transition-group';
import KaratDown from "../assets/KaratDown"
import "./Options1.css"

export default ({ name }) => {
  const options = [
    {
      id: 1,
      title: "This is some fumby text",
      description: "This is some more dumby text describing what the title means and what this does",
      requiresAdditionalInfo: false
    },
    {
      id: 2,
      title: "This is some fumby text",
      description: "This is some more dumby text describing what the title means and what this does",
      requiresAdditionalInfo: true
    },
    {
      id: 3,
      title: "This is some fumby text",
      description: "This is some more dumby text describing what the title means and what this does",
      requiresAdditionalInfo: true
    },
  ]
  const selectOptions = [{
    id: "safe",
    name: "Safe"
  }, {
    id: "biconomy",
    name: "Biconomy"
  }]

  const [isDropdownClicked, setIsDropdownClicked] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState();

  const optionHandler = (option) => {
    setSelectedWallet(option)
    setIsDropdownClicked(false)
  }

  return(
    <div className="slide-padding signup-container slide-scrollable">
      <SignupSvg className={"options-fixed-background"}/>
      <div className="slide-text-container slide-text-container-scrollable" style={{"marginTop": "40px"}}>
        <h1>
          {`What sort of wallet do you want to create for ${name}`}
        </h1>
        <h3>
          Different wallets come with different features, pick the ones that fit best for your needs.
        </h3>
        <div style={{ "display": "flex", "justifyContent": "center", "alignItems": "center"}}>
          <div onClick={() => {
              setIsDropdownClicked(!isDropdownClicked)
          }} className="selected-wallet-container">
              {selectedWallet ? <span className="selected-wallet-name">{selectedWallet.name}</span> : <span className="selected-wallet-placeholder">Select a wallet</span>}
              <KaratDown className={`${isDropdownClicked && "rotated"} karat`}/>
          </div>
            
        </div>
        <div>
          <CSSTransition in={isDropdownClicked} timeout={300} classNames="dropdown-option-container">
            <div style={{ "display": "flex", "justifyContent": "center", "flexDirection": "column", "alignItems": "center"}}>
              {selectOptions.map(option => <div key={option.id} className={"option-item"} onClick={() => optionHandler(option)}> 
                {option.name}
              </div>)}
            </div>
          </CSSTransition>
        </div>


        {/* {options.map((option) => <SelectableOption key={option.id} {...option}/>)} */}
      </div>
    </div>
  )
}