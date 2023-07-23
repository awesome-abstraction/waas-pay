'use client'

import dynamic from 'next/dynamic'
import { useQuery } from "@apollo/client";
import CreateWallet from "../assets/CreateWallet"
import "../employer/styles.css"
import "../components/Signup.css"
import { GET_META_DATA_QUERY } from "../forDan/page"
import { useState, } from "react";


export const Employee = ({ nextButtonClicked, setZkAddy, employeeId, setEmployeeId }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const cid = urlParams.get('cid');
  
  const { data, loading, error } = useQuery(GET_META_DATA_QUERY, {
    variables: { cid },
    skip: !cid,
  });

  const dataParsed = data?.getUserWalletsMeta?.data
  if (dataParsed){
    setZkAddy(dataParsed.minaSmartContractAddress)
  }

  const changeHandler = (e) => {
    setEmployeeId(e.target.value)
  }

  const startVerify = () => {
    nextButtonClicked()
  }

  return (
    <div className="slide-padding signup-container slide-scrollable">
      <CreateWallet className={"options-fixed-background"}/>
      <div className="slide-text-container slide-text-container-scrollable" style={{"marginTop": "40px"}}>
        <h1>
          Hey! <span style={{"color": "var(--primary"}}>{dataParsed?.companyName}</span> wants to create you a wallet
        </h1>
        <h3>
          They've set everything for you, just verify your identity below!
        </h3>
        <br />
        <h3 style={{"marginTop": "6px"}}>
          Enter your identifier below
        </h3>
        <input value={employeeId} onChange={changeHandler} className="name-signup" placeholder="Type your name here"/>
        <div className="primary-button" onClick={startVerify} style={{"marginTop": "32px"}}>
          Verify Account
        </div>
      </div>
    </div>
  )
}


export default dynamic(() => Promise.resolve(Employee), {
  ssr: false
})