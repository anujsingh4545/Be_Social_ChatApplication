import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { chatSet } from '../atom/chatSet'
import { setHeaderData } from '../atom/setHeaderData'
import { useSession } from 'next-auth/react'
import Getfriendsdata from './Getfriendsdata'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { sendID } from '../atom/sendID'
import moment from 'moment'
import { setMessages } from '../atom/setMessages'

function Chat({ id, users, timestamp, latestMessage = '' }) {
  const [chat, setChat] = useRecoilState(chatSet)
  const [message, setMessage] = useRecoilState(setMessages)
  const [header, setHeader] = useRecoilState(setHeaderData)
  const [ids, setIDs] = useRecoilState(sendID)
  const { data: session } = useSession()
  const currentUser = session?.user?.uid
  const [friend, setFreind] = useState({})

  useEffect(() => {
    if (users.length > 0) {
      Getfriendsdata(users, currentUser).then((data) => {
        setFreind(data)
      })
    }
  }, [])

  async function setCommunication() {
    setChat(true)

    await onSnapshot(
      doc(db, 'chats', id),
      (snapshot) => setHeader(snapshot.data()),
      setIDs(id)
    )
  }
  return (
    <div
      className="mb-2 flex w-[100%] cursor-pointer items-center  px-3 hover:bg-gray-900 "
      onClick={setCommunication}
    >
      <div className="h-[100%] w-[15%]  py-3">
        <img src={friend.image} className="h-14  rounded-full " alt="" />
      </div>

      <main className="flex  w-[85%] justify-between border-b border-gray-800 py-3 ">
        <section className="ml-4 mr-2 flex w-[70%] flex-col ">
          <p className="flex-1 truncate text-left text-[1.3rem] font-semibold text-slate-200">
            {friend.username}
          </p>
          <p className=" truncate text-[1rem] font-semibold italic text-slate-500">
            {latestMessage}
          </p>
        </section>

        <p className="mx-1  text-[1rem] font-semibold text-slate-500">
          {timestamp ? moment(timestamp?.toDate()).format('LT') : ''}
        </p>
      </main>
    </div>
  )
}

export default Chat
