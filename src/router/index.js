import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MangoTreeMain from '@/components/MangoTreeMain'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/:id',
      name: 'MangoTree',
      component: MangoTreeMain,
      props: true
    },
    {
      path: '/',
      name: 'Main',
      component: Home
    }
  ]
})
