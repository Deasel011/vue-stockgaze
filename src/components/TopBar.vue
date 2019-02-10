<template>
  <b-navbar toggleable="md" type="dark" variant="dark">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#">StockGaze</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav class="ml-auto">
        <b-nav-item href="/ipo">IPOs</b-nav-item>


        <b-nav-form inline action="/breakdown">
          <b-form-input size="sm" class="mr-sm-2" type="text" name="ticker" placeholder="Ticker here"/>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Get Quote Breakdown</b-button>
        </b-nav-form>


        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em>{{this.profile.given_name}}</em>
          </template>
          <b-dropdown-item href="#" disabled>Profile</b-dropdown-item>
          <b-dropdown-item href="#" disabled>Signout</b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>

    </b-collapse>
  </b-navbar>

    <!--<div class="topnav">
      <form id="tickerSearch" action="/breakdown">
        <input placeholder="Ticker here" name="ticker"/>
        <button type="submit">Get Quote Breakdown</button>
      </form>

      <p id="profileName">{{this.profile.given_name}}</p>

    </div>-->

</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'

  export default {
    name: 'TopBar',
    props: ['profile']
  }
</script>

<style scoped>
  .topnav {
    position: absolute;
    top: 0;
    left: 0;
    height: 60px;
    width: 100%;

    background-image:linear-gradient(#3f007f,black);
  }

  .topnav #profileName {
    display: inline-flex;
    float: right;
    font-weight: bold;
    margin: 19px;
    color: #fff;
  }

  @media (min-width: 600px) {
    .topnav #tickerSearch {
      display: inline-flex;
      float: left;
      margin: 19px;
    }
  }

  @media (max-width: 599px) {
    .topnav #tickerSearch {
      display: none;
    }
  }


</style>
