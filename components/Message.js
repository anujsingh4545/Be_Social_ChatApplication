import React from 'react'
import moment from 'moment'
import { useSession } from 'next-auth/react'

function Message({ user, message, timestamp }) {
  const { data: session } = useSession()
  const mail = session?.user?.email

  return (
    <>
      {mail === user ? (
        <section className="flex h-fit w-[100%] justify-end">
          <div className=" mx-3 mb-2 mt-2 flex w-fit  max-w-[60%] rounded-b-xl rounded-tl-xl bg-[#9b2f6ad5] px-3  text-right ">
            <p className="my-3 flex-1 text-left text-[1.2rem] font-semibold italic text-gray-200 ">
              {message}
            </p>
            <p className=" flex items-end py-1 pl-4 text-base font-semibold  text-gray-400 ">
              {moment(timestamp).format('LT')}{' '}
            </p>
          </div>
        </section>
      ) : (
        <section className="flex h-fit w-[100%]  ">
          <div className="mx-3 mb-3 mt-1 flex w-fit max-w-[60%] rounded-b-xl rounded-tr-xl bg-[#383838d3]  px-3 ">
            <p className="my-3 flex-1 text-[1.2rem] font-semibold italic text-gray-200 ">
              {message}
            </p>
            <p className=" flex items-end py-1 pl-4 text-base font-semibold  text-gray-400 ">
              {moment(timestamp).format('LT')}{' '}
            </p>
          </div>
        </section>
      )}
    </>
  )
}

export default Message
