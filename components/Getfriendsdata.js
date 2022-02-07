import React from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

async function Getfriendsdata(users, currentUser) {
  const friendId = users?.filter((user) => user !== currentUser)
  const docRef = doc(db, 'user', friendId[0])
  const docSnap = await getDoc(docRef)
  return docSnap.data()
}

export default Getfriendsdata
