import { useState, useRef } from "react"
import { useSwiper } from 'swiper/react';
import SignupSvg from "../assets/SignupSvg"
import SelectableOption from "./SelectableOption";
import { CSSTransition } from 'react-transition-group';
import KaratDown from "../assets/KaratDown"
import safeLogo from "../assets/safe-logo.png"
import biconomyLogo from "../assets/biconomy-logo.png"
import "./Options1.css"

const SAFE_WALLET_DATA = {
  logo: safeLogo,
  points: ["Allow your employees to authenticate their new wallet with socials",
  "Enable purchasing of funds directly from credit cards",
  "Manage and pay gas fees on behalf of users"],
  textColor: "#0FFF80"
}

const BICONOMY_WALLET_DATA = {
  logo: biconomyLogo,
  points: ["More biconomy stuff so",
  "Wow other cool neat features so cool",
  "Blah blah some other cool feature"],
  textColor: "#FF4F17"
}

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
  const [loginFillColor, setLoginFillColor] = useState("#E84393");
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
      if (loginFillColor !== SAFE_WALLET_DATA.textColor){
        setLoginFillColor(SAFE_WALLET_DATA.textColor)
      }
    }
    if (selectedWallet.id === "biconomy") {
      logo = <img src={BICONOMY_WALLET_DATA.logo.src} style={{"width": "240px", "marginTop": "5px"}}/>
      point1 = BICONOMY_WALLET_DATA.points[0]
      point2 = BICONOMY_WALLET_DATA.points[1]
      point3 = BICONOMY_WALLET_DATA.points[2]
      color = BICONOMY_WALLET_DATA.textColor
      if (loginFillColor !== BICONOMY_WALLET_DATA.textColor){
        setLoginFillColor(BICONOMY_WALLET_DATA.textColor)
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
      <SignupSvg className={"options-fixed-background"} loginFill={loginFillColor}/>
      <div className="slide-text-container slide-text-container-scrollable" style={{"marginTop": "40px"}}>
        <h1>
          {`What sort of wallet do you want to create for ${name}`}
        </h1>
        <h3>
          Different wallets come with different features, pick the ones that fit best for your needs.
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