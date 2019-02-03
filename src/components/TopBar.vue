<template>
  <div class="topnav">
    <form id="tickerSearch" action="/breakdown">
      <input placeholder="Ticker here" name="ticker"/>
      <button type="submit">Get Quote Breakdown</button>
    </form>

    <p id="profileName">{{this.profile.given_name}}</p>

  </div>
</template>

<script>
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
