import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyApRWxgENF6e1WxHclMLT-GJGTXyJe0HMg',
  authDomain: 'besocial-e3934.firebaseapp.com',
  projectId: 'besocial-e3934',
  storageBucket: 'besocial-e3934.appspot.com',
  messagingSenderId: '332593493916',
  appId: '1:332593493916:web:250b7e1173a6734d633a59',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()

export { app, db, storage }
