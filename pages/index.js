import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import Userdetails from '../components/Userdetails'
import Userform from '../components/Userform'
import { useSession } from 'next-auth/react'
import Signin from '../components/Signin'
import { getProviders } from 'next-auth/react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

export default function Home({ providers }) {
  const { data: session } = useSession()
  const [users, setUsers] = useState([])

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'user'), (snapshot) => {
      setUsers(snapshot.docs)
    })

    return unsubscribe
  }, [db])

  if (!session) return <Signin providers={providers} />

  //

  //

  //
  return (
    <div className="">
      <Head>
        <title>Be Social</title>
        <link rel="icon" href="/logo.jpg" />
      </Head>

      <Userform user={users} />

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
