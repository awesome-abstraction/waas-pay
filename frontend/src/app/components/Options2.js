import { useState, useEffect } from "react"
import Form from "../assets/Form"
import Input from "./Input"
import Add from "../assets/Add"
import "./Options1.css"
import { useSwiper } from "swiper/react"

let Mina;
let Poseidon;

export default ({ fill, formValues, setFormValues }) => {
  const handleChange = (e, index) => {
    const values = [...formValues];
    values[index].value = e.target.value;
    setFormValues(values);
  };

  const handleAddField = async (e) => {
    e.preventDefault();
    const values = [...formValues];
    values.push({
      label: "Name",
      type: "text",
      value: "",
      placeholder: "Enter a unique identifier for this user that only they will know. Note: this will be protected by zero-knowledge proofs!"
    });
    setFormValues(values);
  };
  
  const handleRemoveField = (index) => {
    let copyFormValues = [...formValues]
    copyFormValues.splice(index, 1)
    setFormValues(copyFormValues)
  }

  return (<div className="slide-padding signup-container slide-scrollable">
    <Form className={"options-fixed-background"} fill={fill}/>
    <div className="slide-text-container slide-text-container-scrollable" style={{"marginTop": "40px"}}>
        <h1>
          {`Lets get some information about your users:`}
        </h1>
        <h3>
          We'll need a way to verify users identity when they create these <b>{formValues.length}</b> smart contract accounts
        </h3>

      <div style={{"display": "flex", "flexDirection": "column", "alignItems": "center"}}>
        {formValues.map((obj, index) => (
          <Input
            key={index}
            objValue={obj}
            onChange={handleChange}
            index={index}
            onRemove={handleRemoveField}
          />
        ))}
        <div onClick={handleAddField} className={"add-input-button"}>
          <Add className={"add-svg"}/> 
        </div>
      </div>
    </div>
  </div>)
}
