<template lang="html">
<div>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-card-media
          :src="imgSrc"
          height="350px"
        >
        </v-card-media>
        <v-card-title primary-title>
          <div>
            <div class="headline">Mango Tree Simulator</div>
            <span class="grey--text">1,000 miles of wonder</span>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="error" dark @click="restartTree">ReStart</v-btn>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="show = !show">
            <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="show">
            Tree Status : {{status}}
            <v-form v-model="valid">
              <v-text-field
                disabled
                label="Name"
                v-model="name"
                :rules="nameRules"
                :counter="20"
                required
              ></v-text-field>
              <v-text-field
                disabled
                label="Tree Age"
                v-model="age"
                required
              ></v-text-field>
              <v-text-field
                disabled
                label="Tree Height"
                v-model="height"
                required
              ></v-text-field>
              <v-text-field
                disabled
                label="Tree Fruits"
                v-model="fruits"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
        </v-slide-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
import db from '@/firebase/firebase'

export default {
  data: () => ({
    show: true,
    valid: false,
    name: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => v.length <= 20 || 'Name must be less than 20 characters'
    ],
    age: '',
    height: '',
    fruits: '',
    status: '',
    imgSrc: '/static/pohon1.png'
  }),
  methods: {
    getTreeData () {
      var self = this
      db.ref('/').on('value', function (snapshot) {
        self.age = snapshot.val().age
        self.name = snapshot.val().name
        self.status = snapshot.val().status
        self.fruits = snapshot.val().fruits
        self.height = snapshot.val().height
      })
    },
    restartTree () {
      db.ref('/').set({
        age: '0',
        name: 'Pohon Mangga Q',
        status: 'baby',
        fruits: '0',
        height: '0'
      })
    }
  },
  created () {
    this.getTreeData()
  },
  watch: {
    status (val) {
      if (val === 'baby') {
        this.imgSrc = '/static/pohon2.png'
      } else if (val === 'mature') {
        this.imgSrc = '/static/pohon4.png'
      } else if (val === 'teen') {
        this.imgSrc = '/static/pohon3.png'
      } else {
        this.imgSrc = '/static/pohon1.png'
      }
    }
  }
}
</script>

<style lang="css">
</style>
