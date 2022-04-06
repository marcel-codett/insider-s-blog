// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyD9WO-neFsAFm-QBPo7n5qRVr5rc6DsB4Q',
  authDomain: 'insider-98473.firebaseapp.com',
  projectId: 'insider-98473',
  storageBucket: 'insider-98473.appspot.com',
  messagingSenderId: '306949973323',
  appId: '1:306949973323:web:71a8a30d862cf7e40f74ce',
  measurementId: 'G-8HCK3XWXQ2',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const auth = firebaseApp.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
