import React, { useState } from 'react'
import Userdetails from './Userdetails'
import { modalView } from '../atom/modalState'
import { useRecoilState } from 'recoil'
import { modalData } from '../atom/modalData'

function SmallDetails({
  id,
  email,
  username,
  image,
  about,
  occupation,
  phone,
}) {
  const [on, setOn] = useState(false)
  const [modal, setModal] = useRecoilState(modalView)
  const [mdata, setMdata] = useRecoilState(modalData)

  function DoneOn() {
    setOn(true)
    setMdata({
      email: email,
      username: username,
      image: image,
      about: about,
      occupation: occupation,
      phone: phone,
    })
    setModal(true)
  }

  return (
    <div
      className=" my-2 flex h-[5rem] w-[100%] cursor-pointer items-center border-b border-gray-700  bg-[#000000e5] px-2 md:px-3"
      onClick={DoneOn}
    >
      <img src={image} alt="" className="h-11 rounded-full " />
      <section className=" mx-3 flex flex-1 flex-col items-center  truncate md:mx-5">
        <p className=" flex w-[100%]  truncate  text-[1.1rem] font-semibold italic text-blue-500 md:text-[1.3rem] ">
          {email}
        </p>
        <p className=" w-[100%]  truncate  text-left text-[1rem] font-semibold italic text-[#ffffffd5] md:text-[1.2rem]">
          {username}
        </p>
      </section>
      {on && <Userdetails />}
    </div>
  )
}

export default SmallDetails
