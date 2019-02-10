<template>
    <div class="container">

      <b-table striped :items="tableData" :fields="fields"></b-table>
    </div>
</template>

<script>
    export default {
        name: "IPOTable",
      data:function(){
          return {
            fields: [ 'symbol', 'companyName', 'expectedDate', 'priceHigh','priceLow','netIncome','totalAssets','totalLiabilities','stockholderEquity','percentOffered','market','sharesOffered','sharesOutstanding','address','city','ceo','employes','url']
          }
      },
      props:['tableData']
    }
</script>

<style scoped>

</style>
