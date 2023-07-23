import { useState, useRef, useEffect } from "react"
import { useSwiper } from 'swiper/react';
import SignupSvg from "../assets/SignupSvg"
import SelectableOption from "./SelectableOption";
import { CSSTransition } from 'react-transition-group';
import KaratDown from "../assets/KaratDown"
import safeLogo from "../assets/safe-logo.png"
import biconomyLogo from "../assets/biconomy-logo.png"
import "./Options1.css"

export const SAFE_WALLET_DATA = {
  logo: safeLogo,
  points: ["Allow your recipients to authenticate with social login methods",
  "Enable popular fiat on/off ramps",
  "Sponsor your user's gas fees",
  "Add policies like blocklists for your users"],
  textColor: "#0FFF80"
}

export const BICONOMY_WALLET_DATA = {
  logo: biconomyLogo,
  points: ["Explore the power of Biconomy!",
  "Orange wallets are cool",
  "More wallets, the better!"],
  textColor: "#FF4F17"
}

export default ({ name, fill, setupFillColor, selectedWallet, setSelectedWallet }) => {
  const selectOptions = [{
    id: "safe",
    name: "Safe"
  }, {
    id: "biconomy",
    name: "Biconomy"
  }]

  const [isDropdownClicked, setIsDropdownClicked] = useState(false);
  const nodeRef = useRef(null);

  const dropdownHandler = () => {
    setIsDropdownClicked(!isDropdownClicked);
  }

  const optionHandler = (option) => {
    setSelectedWallet(option)
    setIsDropdownClicked(false)
  }

  const renderSelectedWalletMetadata = () => {
    if (!selectedWallet) {
      return null
    }
    let logo;
    let point1;
    let point2;
    let point3;
    let color;
    if (selectedWallet.id === "safe"){
      logo = <img src={SAFE_WALLET_DATA.logo.src} style={{"width": "180px", "marginTop": "15px", "marginBottom": "5px"}}/>
      point1 = SAFE_WALLET_DATA.points[0]
      point2 = SAFE_WALLET_DATA.points[1]
      point3 = SAFE_WALLET_DATA.points[2]
      if (fill !== SAFE_WALLET_DATA.textColor){
        setupFillColor(SAFE_WALLET_DATA.textColor)
      }
    }
    if (selectedWallet.id === "biconomy") {
      logo = <img src={BICONOMY_WALLET_DATA.logo.src} style={{"width": "240px", "marginTop": "5px"}}/>
      point1 = BICONOMY_WALLET_DATA.points[0]
      point2 = BICONOMY_WALLET_DATA.points[1]
      point3 = BICONOMY_WALLET_DATA.points[2]
      color = BICONOMY_WALLET_DATA.textColor
      if (fill !== BICONOMY_WALLET_DATA.textColor){
        setupFillColor(BICONOMY_WALLET_DATA.textColor)
      }
    }
    return (
      <div style={{"display": "flex", "alignItems": "center", "justifyContent": "center", "flexDirection": "column", "position": "absolute", "top": "0", "zIndex": "-1"}}>
        {logo}
        <ul>
          <li>
            {point1}
          </li>
          <li>
            {point2}
          </li>
          <li>
            {point3}
          </li>
        </ul>
      </div>
    )
  }

  return(
    <div className="slide-padding signup-container slide-scrollable">
      <SignupSvg className={"options-fixed-background"} loginFill={fill}/>
      <div className="slide-text-container slide-text-container-scrollable" style={{"marginTop": "40px"}}>
        <h1>
          {`What brand of wallet do you want to create for ${name}`}
        </h1>
        <h3>
          Different wallets come with different features, pick the ones that fit best the needs of your recipients.
        </h3>
        <div style={{ "display": "flex", "justifyContent": "center", "alignItems": "center"}}>
          <div onClick={dropdownHandler} className="selected-wallet-container">
              {selectedWallet ? <span className="selected-wallet-name">{selectedWallet.name}</span> : <span className="selected-wallet-placeholder">Select a wallet</span>}
              <KaratDown className={`${isDropdownClicked && "rotated"} karat`}/>
          </div>
        </div>
        <div style={{"position": "relative"}}>
          <CSSTransition unmountOnExit nodeRef={nodeRef} in={isDropdownClicked} timeout={300} classNames="dropdown-option-container">
            <div ref={nodeRef} className={"dropdown-option-container"}>
              {selectOptions.map(option => <div key={option.id} value={option} className={"option-item"} onClick={() => optionHandler(option)}> 
                {option.id === selectedWallet?.id ? <b>{option.name}</b> : option.name}
              </div>)}
            </div>
          </CSSTransition>
          {renderSelectedWalletMetadata()}
        </div>
       


        {/* {options.map((option) => <SelectableOption key={option.id} {...option}/>)} */}
      </div>
    </div>
  )
}