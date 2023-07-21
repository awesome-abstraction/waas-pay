import { useState } from "react"
import { useSwiper } from 'swiper/react';
import DesignSvg from "../assets/DesignSvg"
import "./Signup.css"

export default ({ name, setName }) => {
  const swiper = useSwiper();
  const changeHandler = (e) => {
    setName(e.target.value)
  }

  const getStartedHandler = (e) => {
    swiper.slideNext()
  }

  return(
    <div className="slide-padding signup-container">
      <DesignSvg />
      <div className="slide-text-container" style={{"marginTop": "40px"}}>
        <h1>
          Welcome to Wallet
        </h1>
        <h3>
          Create and customize wallets for the masses.
        </h3>
        <br/>
        <h3 style={{"marginTop": "6px"}}>
          What is your company name?
        </h3>
        <input value={name} onChange={changeHandler} className="name-signup" placeholder="Type your name here"/>
        <br />
        <br />
        <div className="primary-button" onClick={getStartedHandler}>
          Get Started
        </div>
        <p className="signup-already-have-acc">
          Already have an account? <span className="signin">Sign in</span>
        </p>
      </div>
    </div>
  )
}