<template>
  <div id="app" v-if="isAuthenticated" >
    <authentication :profile="getUserProfile"/>
      <router-view>
      </router-view>
  </div>
</template>

<script>
import authentication from './authentication'
import Authentication from './components/Authentication'
export default {
  name: 'StockGaze',
  components: {Authentication},
  computed: {
    isAuthenticated () {
      return authentication.isAuthenticated()
    },
    getUserProfile () {
      console.log(authentication.getUserProfile())
      return authentication.getUserProfile()
    }
  },
  methods: {
    logOut () {
      authentication.signOut()
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
