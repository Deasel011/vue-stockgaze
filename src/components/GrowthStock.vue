<template>
  <div class="growth">

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
    ApiHelper.GetBestGrowth().then(res => (this.growths = res))
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
