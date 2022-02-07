import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { setHeaderData } from '../atom/setHeaderData'
import { useSession } from 'next-auth/react'
import Getfriendsdata from './Getfriendsdata'
import moment from 'moment'
import { chatSet } from '../atom/chatSet'
import {
  DotsVerticalIcon,
  PaperAirplaneIcon,
  PhotographIcon,
  ArrowLeftIcon,
} from '@heroicons/react/solid'
import { EmojiHappyIcon } from '@heroicons/react/outline'

import Message from './Message'
import { db } from '../firebase'

import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore'
import { sendID } from '../atom/sendID'

function Secondsection({ id = '' }) {
  const { data: session } = useSession()
  const currentUser = session?.user?.uid
  const [header, setHeader] = useRecoilState(setHeaderData)
  const [ids, setIDs] = useRecoilState(sendID)
  const [message, setMessage] = useState([])
  const [input, setInput] = useState('')
  const [chat, setChat] = useRecoilState(chatSet)

  const [emoji, setEmoji] = useState(true)

  const [friend, setFriend] = useState({})

  useEffect(async () => {
    const unsubscribe = await onSnapshot(
      query(
        collection(db, 'chats', id, 'messages'),
        orderBy('timestamp', 'asc')
      ),
      (snapshot) => {
        setMessage(snapshot.docs)
      }
    )

    return unsubscribe
  }, [setMessage, db, header])

  useEffect(() => {
    if (header?.users?.length > 0) {
      Getfriendsdata(header.users, currentUser).then((data) => {
        setFriend(data)
      })
    }
  }, [db, header])

  const [style, setStyle] = useState({
    backgroundImage: `url(/bg${Math.floor(Math.random() * 5) + 1}.jpg)`,
  })

  function changeBg() {
    setStyle({
      backgroundImage: `url(/bg${Math.floor(Math.random() * 5) + 1}.jpg)`,
    })
  }

  function changes(e) {
    if ((e.key === 'Enter') & (input.length > 0)) {
      setInput('')
      sendMessage(e)
    }
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    const userRef = doc(db, 'user', session?.user?.uid)
    setDoc(userRef, { lastseen: serverTimestamp() }, { merge: true })

    const messageRef = collection(db, 'chats', ids, 'messages')
    await addDoc(messageRef, {
      timestamp: serverTimestamp(),
      message: input,
      user: session?.user?.email,
      photoURL: session?.user?.image,
    })

    if (input.length > 0) {
      const chatRef = doc(db, 'chats', ids)
      setDoc(
        chatRef,
        {
          latestMessage: input,
          timestamp: serverTimestamp(),
        },
        { merge: true }
      )
    }

    setInput('')
  }

  function setCommunication() {
    setChat(false)
  }

  return (
    <div className="absolute z-0 m-auto flex h-[85vh] w-[95%] flex-col rounded-3xl border-l  border-gray-800 bg-black ease-in-out  md:relative md:h-[100%] md:w-[65%] md:rounded-tr-3xl md:rounded-br-3xl md:rounded-bl-none md:rounded-tl-none  ">
      {''}
      {''}
      {/* Header section */}
      {''}

      <section className="flex h-[10%] w-[100%] items-center rounded-t-3xl bg-[#7c7c7c2b]  px-4 md:rounded-tl-none ">
        <ArrowLeftIcon
          className="mr-3 w-9 text-white md:hidden"
          onClick={setCommunication}
        />
        <div className="flex h-[100%] w-fit items-center ">
          <img src={friend.image} className="h-12  rounded-full " alt="error" />
        </div>

        <main className="flex flex-1 flex-row items-center justify-between  py-3 ">
          <section className="ml-4 mr-2 flex w-[80%] flex-col ">
            <p className="flex-1 truncate text-left text-[1.3rem] font-semibold text-slate-200">
              {friend.username}
            </p>
            <p className=" mt-[0.1rem] truncate text-[1rem] font-semibold italic text-slate-500">
              Last Active: {moment(friend.lastseen?.toDate()).fromNow()}
            </p>
          </section>
          <PhotographIcon
            onClick={changeBg}
            className=" mr-2 h-7 cursor-pointer text-right text-slate-300 "
          />
          <DotsVerticalIcon className=" mr-2 h-7 cursor-pointer text-right text-slate-300 " />
        </main>
      </section>

      {/* Chat section */}
      {''}

      <section
        style={style}
        className=" h-[80%] w-[100%] overflow-auto border-none bg-white  bg-cover bg-center scrollbar-hide "
      >
        {message.length === 0 ? (
          <div className="flex w-[100%] items-center pt-10">
            <img src="/begin.svg" alt="" className="m-auto w-[45%] " />
          </div>
        ) : (
          message.map((message) => (
            <Message
              key={message.id}
              user={message.data().user}
              message={message.data().message}
              timestamp={message.timestamp}
            />
          ))
        )}
      </section>

      {/* Send message section */}
      {''}

      <section className="relative flex h-[10%] w-[100%] items-center rounded-br-3xl bg-[#7c7c7c2b] px-4 ">
        <EmojiHappyIcon className=" relative h-9 cursor-pointer font-extralight text-slate-300 " />

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={changes}
          type="text"
          placeholder="Enter text here"
          className="mx-3 flex-1  rounded-lg bg-[#7c7c7c2b] py-2 px-3 text-[1.2rem] text-slate-100 outline-none "
        />

        <button type="submit" onClick={sendMessage}>
          <PaperAirplaneIcon className="ml-2 h-9 rotate-90 cursor-pointer font-extralight text-slate-300 " />
        </button>
      </section>
    </div>
  )
}

export default Secondsection
