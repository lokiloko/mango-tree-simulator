<template lang="html">
<div id="home">
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="indigo" dark>
          <v-toolbar-title>List Pohon</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="formNew">
            <v-icon>add</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list>
          <v-list-tile avatar v-for="item in items" v-bind:key="item.key" @click="">
            <v-list-tile-action>
              <v-icon color="pink" @click="removeTree(item.key)">delete_forever</v-icon>
            </v-list-tile-action>
            <v-list-tile-content @click="redirectTo(item.key)">
              <v-list-tile-title v-text="item.name"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-avatar @click="redirectTo(item.key)">
              <img src="/static/mango.jpg"/>
            </v-list-tile-avatar>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
import db from '@/firebase/firebase'

export default {
  data () {
    return {
      items: []
    }
  },
  methods: {
    getAllData () {
      var self = this
      self.items = []
      db.ref('/').once('value', function (snapshot) {
        for (var props in snapshot.val()) {
          var tree = {
            key: props,
            name: snapshot.val()[props].name
          }
          self.items.push(tree)
        }
      })
    },
    formNew () {
      var self = this
      self.$swal({
        title: 'What is your tree name?',
        input: 'text',
        inputPlaceholder: 'Enter your tree name',
        showCancelButton: true,
        inputValidator: function (value) {
          return new Promise(function (resolve, reject) {
            if (value) {
              resolve()
            } else {
              self.$swal({
                type: 'error',
                title: 'You need to write the tree name!'
              })
            }
          })
        }
      }).then(function (name) {
        db.ref('/').push({
          name: name,
          age: 0,
          fruits: 0,
          height: 0,
          status: 'baby'
        }).then(() => {
          self.getAllData()
          self.$swal({
            type: 'success',
            title: 'Your tree has been created'
          })
        })
      })
    },
    redirectTo (key) {
      this.$router.push('/' + key)
    },
    removeTree (key) {
      db.ref('/' + key).remove().then((data) => {
        this.$swal({
          type: 'success',
          title: 'Your tree has been deleted'
        })
        this.getAllData()
      })
    }
  },
  created () {
    this.getAllData()
  }
}
</script>

<style lang="css">
#home {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('/static/backgroundHome.gif') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
