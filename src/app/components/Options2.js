import { useState } from "react"
import Form from "../assets/Form"
import Input from "./Input"
import "./Options1.css"

export default () => {
  const [formValues, setFormValues] = useState([]);
  const handleChange = (e, index) => {
    const values = [...formValues];
    values[index].value = e.target.value;
    setFormValues(values);
  };

  const handleAddField = (e) => {
    e.preventDefault();
    const values = [...formValues];
    values.push({
      label: "label",
      value: "",
    });
    setFormValues(values);
  };

  const dynamicInput = () => {
    
    
  }

  return (<div className="slide-padding signup-container slide-scrollable">
    <Form className={"options-fixed-background"}/>
    <div className="slide-text-container slide-text-container-scrollable" style={{"marginTop": "40px"}}>
        <h1>
          {`Lets get some information about your users`}
        </h1>
        <h3>
          We'll need a way to verify users identity when they create these wallets
        </h3>

      <div>
        {formValues.map((obj, index) => (
          <Input
            key={index}
            objValue={obj}
            onChange={handleChange}
            index={index}
          />
        ))}
      </div>
    </div>
  </div>)
}