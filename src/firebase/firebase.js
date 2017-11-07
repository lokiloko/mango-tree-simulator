import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBuXe3fPMJlLl-9VyAYKa8_ep761qZMOTA',
  authDomain: 'pohon-manggaku.firebaseapp.com',
  databaseURL: 'https://pohon-manggaku.firebaseio.com',
  projectId: 'pohon-manggaku',
  storageBucket: '',
  messagingSenderId: '1010282883652'
})

const db = firebaseApp.database()

export default db
