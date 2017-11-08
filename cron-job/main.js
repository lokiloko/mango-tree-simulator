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
    console.log(snapshot.val())
    for(props in snapshot.val()) {
      if (snapshot.val()[props].status === 'dead'){

      } else {
        db.ref('/'+props+'/age').set(parseInt(snapshot.val()[props].age) + 1)
        db.ref('/'+props+'/height').set(parseInt(snapshot.val()[props].height) + randomHeightGrow())
        if (parseInt(snapshot.val()[props].age)+1 > 14) {
          db.ref('/'+props+'/status').set('dead')
        }
        else if (parseInt(snapshot.val()[props].age)+1 > 7) {
          db.ref('/'+props+'/status').set('mature')
        }
        else if (parseInt(snapshot.val()[props].age)+1 > 3) {
          db.ref('/'+props+'/status').set('teen')
        } else {
          db.ref('/'+props+'/status').set('baby')
        }
        if (snapshot.val()[props].status === 'mature') {
          db.ref('/'+props+'/fruits').set(parseInt(snapshot.val()[props].fruits) + randomFruit())
        }
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
