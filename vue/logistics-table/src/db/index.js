import firebase from 'firebase/app'
import 'firebase/firestore'
// Get the firebase config credential and place it in a file @/config.js
import firebaseConfig from '@/config'

export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore()
