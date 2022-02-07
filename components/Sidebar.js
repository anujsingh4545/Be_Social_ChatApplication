import React, { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { AnnotationIcon, DotsVerticalIcon } from '@heroicons/react/solid'
import { SearchIcon } from '@heroicons/react/outline'
import Chat from './Chat'
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { db } from '../firebase'
import Friends from './Friends'

function Sidebar() {
  const { data: session } = useSession()
  const inputAreaRef = useRef(null)
  const [friends, setFriends] = useState([])
  const [chat, setChat] = useState([])
  const [searchFriends, setSearchFriends] = useState(false)

  useEffect(() => {
    async function fetchFriends() {
      const userRef = collection(db, 'user')
      const q = query(userRef, where('email', '!=', session?.user?.email))
      const querysnapshot = await getDocs(q)

      setFriends(
        querysnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )
    }
    fetchFriends()
  }, [db])

  useEffect(() => {
    const chatRef = collection(db, 'chats')
    const q = query(
      chatRef,
      where('users', 'array-contains', session?.user?.uid)
    )
    const unsubscribe = onSnapshot(q, (querysnapshot) => {
      setChat(querysnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })

    return unsubscribe
  }, [db])

  useEffect(() => {
    const checkIfClickOutside = (e) => {
      if (!inputAreaRef.current.contains(e.target)) {
        setTimeout(() => {
          setSearchFriends(false)
        }, 100)
      } else {
        setSearchFriends(true)
      }
    }
    document.addEventListener('mousedown', checkIfClickOutside)
    return () => {
      document.removeEventListener('mousedown', checkIfClickOutside)
    }
  }, [])

  return (
    <div className="h-[100%] w-[100%] rounded-3xl bg-black md:w-[35%] md:rounded-tl-3xl md:rounded-bl-3xl ">
      <header className="h-[18%]">
        <section className=" flex h-[55%] w-[100%] items-center justify-between rounded-t-3xl bg-[#7c7c7c2b]  px-3 md:rounded-tr-none  ">
          <img
            src={session?.user?.image}
            className="ml-2 h-12 rounded-full "
            alt=""
          />
          <div className="flex  items-center">
            <AnnotationIcon className="mr-3 w-9 cursor-pointer  text-slate-300 " />
            <DotsVerticalIcon className="ml-3 mr-2 w-7 cursor-pointer text-slate-300 " />
          </div>
        </section>

        <section className=" flex h-[45%] w-[100%] items-center justify-between rounded-tl-3xl  border-b border-gray-800  bg-transparent px-3 ">
          <div className=" m-auto flex w-[95%] items-center rounded-xl bg-[#7c7c7c2b] p-2">
            <SearchIcon className="mr-4 ml-1 h-6 text-slate-300 " />
            <input
              ref={inputAreaRef}
              type="text"
              placeholder="Search or start new chat"
              className="flex flex-1 bg-transparent text-[1.1rem]  italic text-slate-300 outline-none "
            />
          </div>
        </section>
      </header>

      <main className=" h-[82%] w-[100%] overflow-auto  bg-transparent  scrollbar-hide ">
        {searchFriends ? (
          <>
            {friends.map((friend) => (
              <Friends
                key={friend.id}
                photoURL={friend.image}
                mail={friend.email}
                friendsName={friend.username}
                id={friend.id}
              />
            ))}
          </>
        ) : (
          <>
            {' '}
            {chat.map((chat) => (
              <Chat
                key={chat.id}
                id={chat.id}
                latestMessage={chat.latestMessage}
                users={chat.users}
                timestamp={chat.timestamp}
              />
            ))}
          </>
        )}
      </main>
    </div>
  )
}

export default Sidebar
