import { useState } from "react"
import { useSwiper } from 'swiper/react';
import SignupSvg from "../assets/SignupSvg"
import SelectableOption from "./SelectableOption";
import "./Options1.css"

export default ({ name }) => {
  const swiper = useSwiper();

  const getStartedHandler = (e) => {
    swiper.slideNext()
  }

  const options = [
    {
      id: 1,
      title: "This is some fumby text",
      description: "This is some more dumby text describing what the title means and what this does"
    },
    {
      id: 2,
      title: "This is some fumby text",
      description: "This is some more dumby text describing what the title means and what this does"
    },
    {
      id: 3,
      title: "This is some fumby text",
      description: "This is some more dumby text describing what the title means and what this does"
    },
  ]

  return(
    <div className="slide-padding signup-container slide-scrollable">
      <SignupSvg className={"options-fixed-background"}/>
      <div className="slide-text-container slide-text-container-scrollable" style={{"marginTop": "40px"}}>
        <h1>
          {`Hey ${name}, lets get started with Account Recovery`}
        </h1>
        <h3>
          You can select as many or little options to help recover your account in the event you lose it.
        </h3>
        {options.map((option) => <SelectableOption key={option.id} {...option}/>)}
      </div>
    </div>
  )
}