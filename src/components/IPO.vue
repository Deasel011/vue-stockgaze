<template>
  <div class="ipoPage">

    <div class="container">
      <h4>Today's IPOs</h4>
      <IPOTable v-bind:table-data="today"></IPOTable>
      <h4>Upcoming IPOs</h4>
      <div class="row">
        <IPOTable v-bind:table-data="upcoming"></IPOTable>
      </div>
    </div>
    <footer>
      <p>Data provided for free by <a href="https://iextrading.com/developer/">IEX</a>. View <a
        href="https://iextrading.com/api-exhibit-a/">IEX’s Terms of Use</a>.</p>
    </footer>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import IPOTable from './IPOTable'
  import Formatter from '../utils/formatter'

  export default {
    name: "IPO",
    components: {IPOTable},
    data: function () {
      return {
        upcoming: [],
        today: []
      }
    },
    created() {
      const self = this;
      this.getUpcomingIPOData();

    },
    methods: {
      getTodayIPOData() {
        this.$jsonp('https://api.iextrading.com/1.0/stock/market/today-ipos', {}).then(json => {
          this.today = json.rawData;
        }).catch(err => {
          alert("Could not get data " + err.toString())
        })
      },
      getUpcomingIPOData() {
        this.$jsonp('https://api.iextrading.com/1.0/stock/market/upcoming-ipos', {}).then(json => {
          this.upcoming = json.rawData;
        }).catch(err => {
          alert("Could not get data " + err.toString())
        })
      },
    }
  }
</script>

<style scoped>

  footer {
    border-top: 1px black solid;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
  }
</style>
