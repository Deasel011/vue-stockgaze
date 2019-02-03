import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'
import StockBreakdown from '@/components/StockBreakdown'
import authentication from '../authentication'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        requiresAuthentication: true
      }
    }, {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuthentication: true
      }
    }, {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuthentication: true
      }
    },{
    path:'/breakdown',
      name:'Breakdown',
      component:StockBreakdown,
      meta:{requiresAuthentication:true}
    }
  ]
})

// Global route guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuthentication)) {
    // this route requires auth, check if logged in
    if (authentication.isAuthenticated()) {
      // only proceed if authenticated.
      next()
    } else {
      authentication.signIn()
    }
  } else {
    next()
  }
})

export default router
