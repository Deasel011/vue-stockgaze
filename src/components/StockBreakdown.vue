<template>
  <div class="breakdownPage">
    <div v-if="!ticker">
      <h1>Stock Breakdown</h1>
      <form>
        <input placeholder="Ticker here" name="ticker"/>
        <button type="submit">Obtain</button>
      </form>
    </div>

    <div v-if="company">
      <div class="companyTab">
        <table class="companyTable">
          <tr>
            <td><img class="logo" :src="logo_url"/></td>
            <td>
              <h1 class="cName">{{company.companyName}}</h1>
            </td>
          </tr>
        </table>
        <h3>Description</h3>
        <p>{{company.description}}</p>

      </div>
      <table v-if="financials" class="financialTab">
        <tr><td colspan="2">Date of Financials</td><td colspan="2">{{financials[0].reportDate}}</td></tr>
        <tr>
          <td>Cash Change</td>
          <td>{{formatter.money(financials[0].cashChange)}}</td>
          <td>Cash Flow</td>
          <td>{{formatter.money(financials[0].cashFlow)}}</td>
        </tr>
        <tr>
          <td>Gross Profit</td>
          <td>{{formatter.money(financials[0].grossProfit)}}</td>
          <td>Net Income</td>
          <td>{{formatter.money(financials[0].netIncome)}}</td>
        </tr>
        <tr>
          <td>Total Assets</td>
          <td>{{formatter.money(financials[0].totalAssets)}}</td>
          <td>Total Cash</td>
          <td>{{formatter.money(financials[0].totalCash)}}</td>
        </tr>
        <tr>
          <td>Total Debt</td>
          <td>{{formatter.money(financials[0].totalDebt)}}</td>
          <td></td>
          <td></td>
        </tr>
      </table>

    </div>
    <footer>
      <p>Data provided for free by <a href="https://iextrading.com/developer/">IEX</a>. View <a
        href="https://iextrading.com/api-exhibit-a/">IEX’s Terms of Use</a>.</p>
    </footer>
  </div>
</template>

<script>
  import Formatter from '../utils/formatter'
  export default {
    name: "StockBreakdown",
    data: function () {
      return {
        formatter:Formatter,
        ticker: new URLSearchParams(window.location.search).get('ticker'),
        quote: null,
        bids: null,
        asks: null,
        company: null,
        financials:null,
        logo_url: ""
      }
    },
    mounted() {
      if (this.ticker != null) {
        this.getBookData();
        this.getTickerLogoUrl();
        this.getCompanyData();
        this.getFinancialsData();
      }
    },
    methods: {
      getBookData() {
        this.$jsonp('https://api.iextrading.com/1.0/stock/' + this.ticker + '/book', {}).then(json => {
          this.quote = json.quote;
          this.bids = json.bids;
          this.asks = json.asks;
        }).catch(err => {
          alert("Could not get data " + err.toString())
        })
      },
      getTickerLogoUrl() {
        this.$jsonp('https://api.iextrading.com/1.0/stock/' + this.ticker + '/logo', {}).then(json => {
          this.logo_url = json.url;
        }).catch(err => {
          return ""
        })
      },
      getCompanyData() {
        this.$jsonp('https://api.iextrading.com/1.0/stock/' + this.ticker + '/company', {}).then(json => {
          this.company = json;
        }).catch(err => {
          alert("Could not get data " + err.toString())
        })
      },
      getFinancialsData() {
        this.$jsonp('https://api.iextrading.com/1.0/stock/' + this.ticker + '/financials', {}).then(json => {
          this.financials = json.financials;
          console.log(this.financials);
        }).catch(err => {
          alert("Could not get data " + err.toString())
        })
      }
    }
  }
</script>

<style scoped>
  .breakdownPage {
    width: 100%;
    display: inline-block;
  }

  footer {
    border-top: 1px black solid;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px; /* Height of the footer */
  }

  .companyTab {
    display: inline-block;
    text-align: center;
  }

  .companyTab .logo {
    display: inline-block;
    max-width: 120px;
    border: #3f007f 2px solid;
    margin: 5px;
  }

  .companyTab .companyTable {
    margin: auto;
  }

  .companyTab h3 {
    text-align: left;
    text-decoration: underline;
  }

  .companyTab p {
    text-align: left;
  }

  table.financialTab {
    border: 1px solid #1C6EA4;
    background-color: #EEEEEE;
    width: 100%;
    text-align: left;
    border-collapse: collapse;
    margin-bottom:1em;
  }

  table.financialTab td, table.financialTab th {
    border: 1px solid #AAAAAA;
    padding: 3px 2px;
  }

  table.financialTab tbody td {
    font-size: 13px;
  }

  table.financialTab tr:nth-child(even) {
    background: #D0E4F5;
  }

  table.financialTab tfoot td {
    font-size: 14px;
  }

  table.financialTab tfoot .links {
    text-align: right;
  }

  table.financialTab tfoot .links a {
    display: inline-block;
    background: #1C6EA4;
    color: #FFFFFF;
    padding: 2px 8px;
    border-radius: 5px;
  }
</style>
