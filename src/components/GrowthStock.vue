<template>
  <div class="growth" v-if="growths!=null">
    <ul>
      <li v-for="g in growths">
        {{g.symbol}}
      </li>
    </ul>
  </div>
</template>

<script>
import ApiHelper from '../utils/ApiHelper'

export default {
  name: 'GrowthStock',
  data: function () {
    return {growths: null}
  },
  mounted () {
    ApiHelper.GetBestGrowth().then(res => (this.growths = res.data))
    console.log(this.growths)
  }
}
</script>

<style scoped>
.growth{
  display:inline;
  border: blueviolet 0.3em solid;
  max-width: 14em;
}
</style>
