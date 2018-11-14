<template>
    <div class="dashboard">
      <button v-on:click="toggleGrowth" id="growthbutton">Best Growths</button>
      <button v-on:click="toggleHMse" id="hmsebutton">Highest Mse Squared</button>
      <button v-on:click="toggleLever" id="leverbutton">Leveraged ETFs</button>
      <growth-stock v-if="growthShown"/>
      <mse-sqrd-stock v-if="hMseShown"/>
      <leveraged v-if="leveragedShown"/>
      <footer><h3>Stockgaze</h3>
      <p>Created by: Deasel011</p></footer>
    </div>
</template>

<script>
import GrowthStock from './GrowthStock'
import MseSqrdStock from './MseSqrdStock'
import Leveraged from './Leveraged'

export default {
  name: 'dashboard',
  components: {GrowthStock,MseSqrdStock,Leveraged},
  data: function () {
    return {growthShown: false,hMseShown:false,leveragedShown:false}
  },
  methods:{
    toggleGrowth:function(event){
      this.hideAllTabs();
      this.growthShown = !this.growthShown;
      if(this.growthShown){
        document.getElementById("growthbutton").classList.add("toggled")
      }else{
        document.getElementById("growthbutton").classList.remove("toggled")
      }
    },
    toggleHMse:function(event){
      this.hideAllTabs();
      this.hMseShown = !this.hMseShown;
      if(this.hMseShown){
        document.getElementById("hmsebutton").classList.add("toggled")
      }else{
        document.getElementById("hmsebutton").classList.remove("toggled")
      }
    },
    toggleLever:function(event){
      this.hideAllTabs();
      this.leveragedShown = !this.leveragedShown;
      if(this.leveragedShown){
        document.getElementById("leverbutton").classList.add("toggled")
      }else{
        document.getElementById("leverbutton").classList.remove("toggled")
      }
    },
    hideAllTabs:function(){
      this.growthShown = false;
      this.hMseShown = false;
      this.leveragedShown = false;
      document.getElementById("hmsebutton").classList.remove("toggled");
      document.getElementById("growthbutton").classList.remove("toggled");
      document.getElementById("leverbutton").classList.remove("toggled");
    }
  }
}
</script>

<style scoped>
.dashboard{
  max-width:1080px;
  box-shadow: 1px 2px 5px 0px rgba(0,0,0,0.75);
}
button {
  background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #44c767), color-stop(1, #5cbf2a));
  background:-moz-linear-gradient(top, #44c767 5%, #5cbf2a 100%);
  background:-webkit-linear-gradient(top, #44c767 5%, #5cbf2a 100%);
  background:-o-linear-gradient(top, #44c767 5%, #5cbf2a 100%);
  background:-ms-linear-gradient(top, #44c767 5%, #5cbf2a 100%);
  background:linear-gradient(to bottom, #44c767 5%, #5cbf2a 100%);
  filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#44c767', endColorstr='#5cbf2a',GradientType=0);
  background-color:#44c767;
  border:1px solid #18ab29;
  display:inline-block;
  cursor:pointer;
  color:#ffffff;
  font-family:Arial;
  font-size:17px;
  padding:16px 31px;
  text-decoration:none;
  text-shadow:0px 1px 17px #2f6627;
}
button:hover {
  background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #5cbf2a), color-stop(1, #44c767));
  background:-moz-linear-gradient(top, #5cbf2a 5%, #44c767 100%);
  background:-webkit-linear-gradient(top, #5cbf2a 5%, #44c767 100%);
  background:-o-linear-gradient(top, #5cbf2a 5%, #44c767 100%);
  background:-ms-linear-gradient(top, #5cbf2a 5%, #44c767 100%);
  background:linear-gradient(to bottom, #5cbf2a 5%, #44c767 100%);
  filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#5cbf2a', endColorstr='#44c767',GradientType=0);
  background-color:#5cbf2a;
}
button:active {
  position:relative;
  top:1px;
}

button.toggled{
  background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #768d87), color-stop(1, #6c7c7c));
  background:-moz-linear-gradient(top, #768d87 5%, #6c7c7c 100%);
  background:-webkit-linear-gradient(top, #768d87 5%, #6c7c7c 100%);
  background:-o-linear-gradient(top, #768d87 5%, #6c7c7c 100%);
  background:-ms-linear-gradient(top, #768d87 5%, #6c7c7c 100%);
  background:linear-gradient(to bottom, #768d87 5%, #6c7c7c 100%);
}
</style>
