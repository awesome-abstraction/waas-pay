'use client'

import React, { useState } from 'react';
import { Controller } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Signup from '../components/Signup';
import Options1 from '../components/Options1'
import Options2 from "../components/Options2"
import ChevronForward from "../assets/ChevronForward";

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';

export default function App() {
  const [name, setName] = useState("")
  const [selectedWallet, setSelectedWallet] = useState()
  const [formValues, setFormValues] = useState([{
    label: "Name",
    type: "text",
    value: "",
    placeholder: "Enter an identifier for this user"
  }])
  const [swiper, setSwiper] = useState(null);
  const [renderButton, setRenderButton] = useState(false)
  const [loginFillColor, setLoginFillColor] = useState("#E84393");

  return (
    <>
      <Swiper
        direction={'horizontal'}
        pagination={{
          clickable: true,
        }}
        allowTouchMove={false}
        modules={[Pagination]}
        className="mySwiper"     
        onSwiper={setSwiper}   
      >
        <SwiperSlide>
          <Signup name={name} setName={setName} setRenderButton={setRenderButton}/>
        </SwiperSlide>
        <SwiperSlide>
          <Options1 selectedWallet={selectedWallet} 
            setSelectedWallet={setSelectedWallet} 
            name={name} 
            fill={loginFillColor} 
            setupFillColor={setLoginFillColor}/>
        </SwiperSlide>
        <SwiperSlide>
          <Options2 fill={loginFillColor}
            formValues={formValues}
            setFormValues={setFormValues}
          />
        </SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>
      {renderButton && <div className='next-button' onClick={() => swiper.slideNext()}>
        <ChevronForward className={"chevron-forward"} />
      </div>}
    </>
  );
}
