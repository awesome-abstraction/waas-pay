'use client'

import { useState } from "react"
import { WithApolloClient } from "../../lib/apollo";
import { Pagination } from 'swiper/modules';
import Employee from "./Employee"
import Verifying from "./Verifying"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';

export default () => {
  const [swiper, setSwiper] = useState(null);
  const [pageNum, setPageNum] = useState(1)
  const [zkAddy, setZkAddy] = useState();
  const [employeeId, setEmployeeId] = useState();

  const nextButtonClicked = () => {
    swiper.slideNext()
    setPageNum(pageNum + 1)
  }

  return(
    <WithApolloClient>
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
          <Employee nextButtonClicked={nextButtonClicked} setZkAddy={setZkAddy} employeeId={employeeId} setEmployeeId={setEmployeeId}/>
        </SwiperSlide>
        <SwiperSlide>
          <Verifying pageNum={pageNum} zkAppAddress={zkAddy} id={employeeId}/>
        </SwiperSlide>
      </Swiper>
     
    </WithApolloClient>
)}