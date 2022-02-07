import React from 'react'
import { useSession } from 'next-auth/react'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase'

function Friends({ photoURL, friendsName, mail, id }) {
  const { data: session } = useSession()
  const createChat = async (id) => {
    const chatRef = collection(db, 'chats')
    const q = query(
      chatRef,
      where('users', 'array-contains', session?.user.uid)
    )
    const querysnapshot = await getDocs(q)
    const chatAlreadyExist = (friend_id) =>
      !!querysnapshot?.docs.find(
        (chat) =>
          chat.data().users.find((user) => user === friend_id)?.length > 0
      )
    if (!chatAlreadyExist(id)) {
      addDoc(chatRef, { users: [session?.user?.uid, id] })
    } else {
      console.log('chat already exists')
    }
  }
  return (
    <div
      className="mb-2 flex w-[100%] cursor-pointer items-center  px-3 hover:bg-gray-900 "
      onClick={() => createChat(id)}
    >
      <div className="h-[100%] w-[15%]  py-3">
        <img src={photoURL} className="h-14  rounded-full " alt="" />
      </div>

      <main className="flex  w-[85%] justify-between border-b border-gray-800 py-3 ">
        <section className="ml-4 mr-2 flex w-[98%] flex-col ">
          <p className="flex-1 truncate  text-left text-[1.2rem] font-semibold text-slate-200">
            {mail}
          </p>
          <p className=" truncate text-[1rem] font-semibold italic text-slate-500">
            {friendsName}
          </p>
        </section>
      </main>
    </div>
  )
}

export default Friends
