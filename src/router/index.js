import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})
