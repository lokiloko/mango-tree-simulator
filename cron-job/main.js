var CronJob = require('cron').CronJob;
var firebase = require('firebase')
var firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBuXe3fPMJlLl-9VyAYKa8_ep761qZMOTA',
  authDomain: 'pohon-manggaku.firebaseapp.com',
  databaseURL: 'https://pohon-manggaku.firebaseio.com',
  projectId: 'pohon-manggaku',
  storageBucket: '',
  messagingSenderId: '1010282883652'
})
var db = firebaseApp.database()
new CronJob('*/5 * * * * *', function() {
  db.ref('/').once('value', function (snapshot) {
    if (snapshot.val().status === 'dead'){
      
    } else {
      db.ref('/age').set(parseInt(snapshot.val().age) + 1)
      db.ref('/height').set(parseInt(snapshot.val().height) + randomHeightGrow())
      if (parseInt(snapshot.val().age)+1 > 14) {
        db.ref('/status').set('dead')
      }
      else if (parseInt(snapshot.val().age)+1 > 7) {
        db.ref('/status').set('mature')
      }
      else if (parseInt(snapshot.val().age)+1 > 3) {
        db.ref('/status').set('teen')
      } else {
        db.ref('/status').set('baby')
      }
      if (snapshot.val().status === 'mature') {
        db.ref('/fruits').set(parseInt(snapshot.val().age) + randomFruit())
      }
    }
  })
}, null, true, 'Asia/Jakarta');

function randomHeightGrow () {
  return Math.round(Math.random() * 2) + 1

}

function randomFruit () {
  return Math.round(Math.random() * 10) + 1
}
