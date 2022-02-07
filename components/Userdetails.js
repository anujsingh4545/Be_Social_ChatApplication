import React from 'react'
import { XIcon } from '@heroicons/react/outline'
import { modalView } from '../atom/modalState'
import { useRecoilState } from 'recoil'
import { modalData } from '../atom/modalData'

function Userdetails() {
  const [modal, setModal] = useRecoilState(modalView)
  const [mdata, setMdata] = useRecoilState(modalData)

  function execute() {
    setModal(false)
    setMdata({})
  }
  return (
    <>
      {modal && (
        <div>
          <div className="absolute top-0 z-10 h-[110vh] w-[100vw]  min-w-[100vw] bg-[#777777b6] blur-md  md:h-[100vh] md:w-[100vw] "></div>
          <div className="  fixed top-[50%] left-[50%] z-20 flex h-[55rem] w-[85%] max-w-7xl translate-x-[-50%] translate-y-[-50%] transform flex-col rounded-3xl bg-transparent shadow-md shadow-black md:h-[38rem] md:w-[90%] md:flex-row xl:w-[60%]   ">
            {''}
            <XIcon
              onClick={execute}
              className="absolute right-4 top-4 h-12 animate-pulse cursor-pointer  rounded-full  p-1 font-bold text-white hover:bg-white hover:text-black "
            />
            <section className="flex h-[45%] w-[100%] flex-col items-center rounded-tl-3xl rounded-tr-3xl bg-gradient-to-r  from-sky-600 to-indigo-800 bg-cover md:h-[100%] md:w-[45%] md:rounded-tr-none md:rounded-bl-3xl ">
              <div className=" mt-8 w-fit rounded-full  border-2 border-[#a8a6a6] shadow-sm  shadow-black md:mt-10 ">
                <img
                  src={mdata.image}
                  className=" h-44 rounded-full p-2 md:h-72"
                  alt=""
                />
              </div>

              <div className="mt-3 flex h-[40%] w-[100%]  flex-col items-center justify-center bg-[#0007] md:mt-7 ">
                <p className="mb-2 w-[100%] truncate text-center text-[2.5rem] font-bold text-[#fffffff3]  md:text-[3rem] ">
                  {mdata.username}
                </p>
                <p className="my-2 w-[100%] truncate text-center  text-[1.5rem] font-semibold italic text-[#ffffffd0] md:text-[1.8rem]">
                  {mdata.email}
                </p>
              </div>
            </section>

            <section className="flex h-[55%] w-[100%] flex-col items-center rounded-bl-3xl rounded-br-3xl bg-[#000000f8] md:h-[100%]  md:w-[55%] md:rounded-bl-none md:rounded-tr-3xl ">
              <h1 className=" my-3 w-[100%] text-center text-[3.5rem] font-extrabold italic text-[#800b49] md:my-7 md:text-[5rem] ">
                User Details
              </h1>

              <p className=" mt-2 h-[6rem] w-[100%] overflow-hidden px-10 text-[1.5rem]  font-semibold  italic text-[#ffffffda] md:w-[90%] md:px-0 md:text-[2rem] ">
                {mdata.about}
              </p>
              <p className=" my-1 w-[100%]  text-[1.5rem] font-semibold italic text-[#ffffffda] md:text-[2rem]  ">
                <span className=" mx-10 text-[1.7rem] italic text-[#800b49] md:text-[2.2rem]">
                  Occupation :
                </span>
                {mdata.occupation}
              </p>
              <p className=" my-2 w-[100%] text-[1.5rem]  font-semibold italic text-[#ffffffda] md:text-[2rem] ">
                <span className=" mx-10 w-[20%] text-[1.7rem] italic text-[#800b49] md:text-[2.2rem]">
                  Phone number :
                </span>
                {mdata.phone}
              </p>

              <div className="mt-16 flex w-[100%]  justify-center   text-center md:mt-24">
                <p className="mt-4 text-center text-[2rem]  font-bold italic text-blue-500">
                  Made with 💙 <span className="text-white ">~ Anuj Singh</span>
                </p>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  )
}

export default Userdetails
