import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { useSession } from 'next-auth/react'
import Signin from '../components/Signin'
import { getProviders } from 'next-auth/react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import Userdetails from '../components/Userdetails'
import Sidebar from '../components/Sidebar'
import { useRecoilState } from 'recoil'
import Section from '../components/Section'
import { chatSet } from '../atom/chatSet'
import Secondsection from '../components/Secondsection'
import { sendID } from '../atom/sendID'

function chats({ providers }) {
  const { data: session } = useSession()
  const [users, setUsers] = useState([])
  const [chat, setChat] = useRecoilState(chatSet)
  const [ids, setIDs] = useRecoilState(sendID)

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'user'), (snapshot) => {
      setUsers(snapshot.docs)
    })

    return unsubscribe
  }, [])

  if (!session) return <Signin providers={providers} />
  return (
    <div className="relative h-[110vh] w-[100%] bg-black sm:h-[100vh]  ">
      <Header users={users} run="true" />

      {/* Chat section */}

      <section className="m-auto mt-14  flex h-[85vh]  w-[95%] max-w-7xl rounded-3xl shadow-md shadow-white md:mt-10 md:h-[80vh] ">
        <Sidebar />
        {chat ? <Secondsection id={ids} /> : <Section />}
      </section>
      <Userdetails />
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}

export default chats
