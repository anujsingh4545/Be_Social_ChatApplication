import React, { useRef, useState, useEffect } from 'react'
import Header from './Header'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useSession } from 'next-auth/react'
import { TailSpin } from 'react-loader-spinner'
import { useRouter } from 'next/router'

function Userform({ user }) {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [load, setLoad] = useState(true)
  const router = useRouter()

  const userName = useRef(null)
  const aboutYou = useRef(null)
  const phoneNumber = useRef(null)
  const userOccupation = useRef(null)
  let data = []

  useEffect(() => {
    user.map((post) => data.push(post.data().email))

    for (let i = 0; i < data.length; i++) {
      if (session?.user?.email === data[i]) {
        router.push('/chats')
      }
    }

    setLoad(false)

    return
  })

  const CheckData = (e) => {
    e.preventDefault()
    if (
      userName.current.value === '' ||
      aboutYou.current.value === '' ||
      phoneNumber.current.value == '' ||
      userOccupation.current.value === ''
    ) {
      alert('Please fill the form carefully ...!')
    } else if (
      phoneNumber.current.value.length < 10 ||
      phoneNumber.current.value.length > 10
    ) {
      alert('Phone number is not valid ...!')
    } else {
      SubmitData()
    }
  }

  function ClearData() {
    userName.current.value = ''
    aboutYou.current.value = ''
    phoneNumber.current.value = ''
    userOccupation.current.value = ''
  }

  function myFunction() {
    setLoading(false)
    router.push('/chats')
  }

  const SubmitData = async () => {
    if (loading) return
    setLoading(true)

    const userData = {
      username: userName.current.value,
      email: session.user.email,
      about: aboutYou.current.value,
      occupation: userOccupation.current.value,
      phone: phoneNumber.current.value,
      image: session.user.image,
      lastseen: serverTimestamp(),
    }

    await setDoc(doc(db, 'user', session?.user?.uid), userData)
  }

  if (load) {
    return (
      <div className="h-[110vh] w-[100%] bg-black sm:h-[100vh] ">
        <Header />

        <section className="m-auto mt-60 w-fit">
          <TailSpin color="#00BFFF" height={100} width={100} />
        </section>
      </div>
    )
  }

  return (
    <main className="small h-[110vh] w-[100%] bg-black  sm:h-[100vh]  ">
      <Header users={user} run="false" />
      <div className=" larges  m-auto mt-12 w-[90%] max-w-7xl rounded-3xl  bg-[#f1f0f00c]  bg-cover  shadow-md shadow-[#f1efef9f]  sm:mt-8   sm:w-[70%] md:w-[95%] xl:w-[70%] ">
        <h1 className="w-[100%] p-0  text-center text-[3.5rem] font-extrabold italic text-[#800b49]  md:text-[6rem]">
          User Form
        </h1>
        <section className="flex h-[80%] w-[100%] flex-col items-center md:flex-row">
          <main className="ml-4 flex h-[20rem] w-[95%] flex-col justify-center    md:h-[40rem]  md:w-[50%] md:items-center  lg:w-[40%]  ">
            <div className=" w-fit rounded-full border border-blue-700 bg-black sm:mt-2">
              <img
                src={session?.user?.image}
                alt=""
                className="h-[11rem] rounded-full p-2 md:h-[25rem]"
              />
            </div>
            <h2 className=" my-4 w-[100%] truncate pl-5  text-[1.6rem] font-extrabold italic text-blue-700 md:my-16 md:text-center lg:text-[1.7rem]">
              {session?.user?.email}
            </h2>
          </main>
          <main className="mb-9 flex w-[100%] flex-col md:mb-0 md:h-[40rem] md:w-[60%] ">
            <input
              type="text"
              placeholder="Username"
              className="details "
              ref={userName}
            />
            <input
              type="text"
              placeholder="About you"
              className="details "
              ref={aboutYou}
            />
            <input
              type="text"
              placeholder="Occupation"
              className="details "
              ref={userOccupation}
            />
            <input
              type="number"
              placeholder="Phone number"
              className="details"
              ref={phoneNumber}
            />

            <div className="m-auto mt-8 flex w-[80%]  sm:w-[60%]">
              <button
                disabled={loading}
                className="group relative m-auto inline-flex w-[45%] items-center justify-center overflow-hidden rounded-full border-0 p-4 px-5 py-3 text-[1.2rem] font-medium text-indigo-600 shadow-xl outline-none transition duration-300 ease-out  hover:ring-1 hover:ring-purple-500 disabled:cursor-not-allowed sm:w-[40%] "
                onClick={ClearData}
              >
                <span className="absolute inset-0 h-full w-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                <span className="ease absolute bottom-0 right-0 mb-32 mr-4 block h-64 w-64 origin-bottom-left translate-x-24 rotate-45 transform rounded-full bg-pink-500 opacity-30 transition duration-500 group-hover:rotate-90"></span>
                <span className="relative text-white">Clear</span>
              </button>

              {/*  */}

              <button
                disabled={loading}
                className="group relative m-auto inline-flex w-[45%] items-center justify-center overflow-hidden rounded-full p-4 px-5 py-3 text-[1.2rem] font-medium text-indigo-600 shadow-xl transition duration-300 ease-out hover:ring-1 hover:ring-purple-500 disabled:cursor-not-allowed  sm:w-[40%] "
                onClick={CheckData}
              >
                <span className="absolute inset-0 h-full w-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
                <span className="ease absolute bottom-0 right-0 mb-32 mr-4 block h-64 w-64 origin-bottom-left translate-x-24 rotate-45 transform rounded-full bg-pink-500 opacity-30 transition duration-500 group-hover:rotate-90"></span>
                <span className="relative text-white">
                  {loading ? 'Submitting...' : 'Submit'}
                </span>
              </button>
            </div>
          </main>
        </section>
      </div>
    </main>
  )
}

export default Userform
