<template>
  <b-navbar toggleable="md" type="dark" variant="dark">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#">StockGaze</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav class="ml-auto">
        <b-nav-item href="/ipo">IPOs</b-nav-item>

        <b-nav-form inline action="/breakdown">
          <div class="autocomplete" style="width: 190px">
            <b-form-input id="autocomplete_input" autocomplete="off" size="sm" class="mr-sm-2" type="text" name="ticker" placeholder="Search..."/>
          </div>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Get Quote Breakdown</b-button>
        </b-nav-form>

        <Autocomplete></Autocomplete>

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
  import Autocomplete from './Autocomplete'

  export default {
    name: 'TopBar',
    components: {Autocomplete},
    props: ['profile'],
    data:function () {
      return {
        autocomplete_list:["hello","nice"]
      }
    }
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

  .autocomplete {
    /*the container must be positioned relative:*/
    position: relative;
    display: inline-block;
  }

  .autocomplete-items {
    position: absolute;
    border: 1px solid #d4d4d4;
    border-bottom: none;
    border-top: none;
    z-index: 99;
    /*position the autocomplete items to be the same width as the container:*/
    top: 100%;
    left: 0;
    right: 0;
  }
  .autocomplete-items div {
    padding: 10px;
    cursor: pointer;
    background-color: #fff;
    border-bottom: 1px solid #d4d4d4;
  }
  .autocomplete-items div:hover {
    /*when hovering an item:*/
    background-color: #e9e9e9;
  }
  .autocomplete-active {
    /*when navigating through the items using the arrow keys:*/
    background-color: DodgerBlue !important;
    color: #ffffff;
  }

</style>
