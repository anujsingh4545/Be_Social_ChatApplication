import React, { useState } from 'react'
import { SearchIcon, LogoutIcon, LoginIcon } from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'
import Smalldetails from './Smalldetails'
import { useRecoilState } from 'recoil'
import { userData } from '../atom/userData'

function Header({ users, run }) {
  const { data: session } = useSession()
  const [input, setInput] = useState('')
  const [datas, setDatas] = useRecoilState(userData)

  const setdocumnets = async () => {
    await users.map((post) =>
      setDatas((oldArray) => [
        ...oldArray,
        {
          id: post.id,
          email: post.data().email,
          username: post.data().username,
          image: post.data().image,
          about: post.data().about,
          occupation: post.data().occupation,
          phone: post.data().phone,
        },
      ])
    )
  }

  const FilterExpenses = datas.filter((data) => {
    let check = data.email
    return check.startsWith(`${input}`)
  })

  let expenseContent = (
    <p className="my-11 text-center text-[1.8rem] font-semibold italic text-[#ffffffd2] ">
      No result found 🙄
    </p>
  )

  if (FilterExpenses.length > 0) {
    expenseContent = FilterExpenses.map((expense) => {
      return (
        <Smalldetails
          key={expense.id}
          id={expense.id}
          email={expense.email}
          username={expense.username}
          image={expense.image}
          about={expense.about}
          occupation={expense.occupation}
          phone={expense.phone}
        />
      )
    })
  }

  function setChange(e) {
    setDatas([])
    setdocumnets()
    setInput(e.target.value)
  }

  return (
    <div className=" w-[100%]  bg-white shadow-md shadow-[#0000008f]  sm:shadow-sm sm:shadow-white">
      <header className="m-auto flex w-[100%]  items-center justify-between bg-white px-4 py-1 md:max-w-7xl ">
        <section className="relative flex items-center ">
          <img
            src="/light-besocail.jpg"
            className=" my-3 h-14 md:my-0 md:h-16"
            alt=""
          />
          <img
            src="/black-besocial.jpg"
            className=" my-4 hidden h-14 md:inline"
            alt=""
          />
        </section>

        <main className="relative md:w-[40%] ">
          <section className="flex h-fit   items-center rounded-full border-2 border-gray-300 px-3 py-2 ">
            <input
              disabled={run === 'false'}
              type="text"
              value={input}
              onChange={setChange}
              className=" dis mx-3 flex-1 text-[1.4rem] font-semibold outline-none disabled:cursor-not-allowed "
              placeholder="Start your search "
            />
            <div className="relative  rounded-full bg-[#800b49] p-2 md:p-3">
              <SearchIcon className="h-6 font-extrabold  text-white md:h-7" />
            </div>
          </section>
          {input.length > 0 && (
            <div className="absolute z-20 mt-4 h-[20rem] w-[100%] cursor-grabbing overflow-auto rounded-2xl bg-gray-900 shadow-sm  shadow-white scrollbar-hide ">
              {expenseContent}
            </div>
          )}
        </main>

        <section className="flex items-center">
          {session ? (
            <>
              <LogoutIcon
                className="mr-2 h-9 cursor-pointer font-extrabold"
                onClick={signOut}
              />
              <p
                className="hidden cursor-pointer text-[1.5rem] font-semibold italic text-[#800b49]  md:inline"
                onClick={signOut}
              >
                Sign out
              </p>
            </>
          ) : (
            <>
              <LoginIcon className="mr-2 h-9 cursor-pointer font-extrabold" />
              <p className="hidden cursor-pointer text-[1.5rem] font-semibold italic text-[#800b49]  md:inline">
                Sign in
              </p>
            </>
          )}
        </section>
      </header>
    </div>
  )
}

export default Header
