<template>
  <div class="growth">

  </div>
</template>

<script>
export default {
  name: 'GrowthStock',
  data: function () {
    return {growths: [
      {symbol: 'WEED', exchange: 'TSX', yearSlope: 0.6},
      {symbol: 'RY', exchange: 'TSX', yearSlope: 0.3},
      {symbol: 'APH', exchange: 'TSX', yearSlope: 0.4}
    ]}
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
