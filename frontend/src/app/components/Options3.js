import { useEffect } from "react"
import Review from "../assets/Review"
import { SAFE_WALLET_DATA, BICONOMY_WALLET_DATA } from "../components/Options1"


export default ({ formValues, name, selectedWallet, fill }) => {
  return (<div className="slide-padding signup-container slide-scrollable">
  <Review className={"options-fixed-background"} fill={fill}/>
  <div className="slide-text-container slide-text-container-scrollable" style={{"marginTop": "40px"}}>
    <h1>
      Almost there! Lets do a final review of what you want to do
    </h1>
    <h3>
      These wallets won't be created until your users finalize the process.
    </h3>
    <h3 style={{"marginTop": "32px", "color": "var(--primary)", "fontSize": "16px"}}>
      Company Name: 
    </h3>
    <h1 style={{'fontFamily': "Roboto"}}>
      {name}
    </h1>

    <h3 style={{"marginTop": "16px", "color": "var(--primary)", "fontSize": "16px"}}>
      Wallet Type: 
    </h3>
    {
      selectedWallet?.id === "safe" ? 
        <img src={SAFE_WALLET_DATA.logo.src} className={"option-3-safe-img-container"}/> :
        <img src={BICONOMY_WALLET_DATA.logo.src} className={"option-3-biconomy-img-container"}/>
    }

    <h3 style={{"marginTop": "6px", "color": "var(--primary)", "fontSize": "16px"}}>
      {`Wallet Verifications (${formValues.length} Wallets):`} 
    </h3>
    {
      formValues.map((formValue, index) => <h3 key={index} className="identifiers-preview">*********{formValue?.value?.substr(formValue?.value?.length - 4)}</h3>)
    }
    </div>
  </div>
  )
}