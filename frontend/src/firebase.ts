import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCJAXHIKZyD8M7CjsBay1aNurBKdSVFFXE',
  authDomain: 'react-myapp-7d6e7.firebaseapp.com',
  projectId: 'https://react-myapp-7d6e7.firebaseio.com',
  databaseURL: 'react-myapp-7d6e7',
  storageBucket: 'react-myapp-7d6e7.appspot.com',
  messagingSenderId: '306369017008',
  appId: '1:306369017008:web:9ac2e5d238f02828b3b775',
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)

export const db = firebaseApp.firestore()
export const auth = firebaseApp.auth()
export const storage = firebaseApp.storage()
export const provider = new firebase.auth.GoogleAuthProvider()
