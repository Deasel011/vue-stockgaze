<template>
  <div class="breakdownPage">

    <div v-if="!ticker">
      <h1>Stock Breakdown</h1>
      <form>
        <input placeholder="Ticker here" name="ticker"/>
        <button type="submit">Obtain</button>
      </form>
    </div>
    <div class="container">

      <div v-if="ticker&&company">
        <div class="row">
          <b-nav vertical class="w-25" fill="true">
            <img class="logo" :src="logo_url" style="max-width: 128px; margin:.5em auto "/>
            <b-nav-item active>Dashboard</b-nav-item>
            <b-nav-item disabled>Due Diligence</b-nav-item>
            <b-nav-item disabled>News</b-nav-item>
          </b-nav>
          <div class="w-75">
            <h3>{{company.companyName}}</h3>
            <p>{{company.description}}</p>
            <Highstock :options="options"/>
          </div>
        </div>


      </div>


      <div v-if="company">
        <table v-if="financials" class="financialTab">
          <tr>
            <td colspan="2">Date of Financials</td>
            <td colspan="2">{{financials[0].reportDate}}</td>
          </tr>
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
  import Formatter from '../utils/formatter'

  export default {
    name: "StockBreakdown",
    data: function () {
      return {
        formatter: Formatter,
        ticker: new URLSearchParams(window.location.search).get('ticker'),
        quote: null,
        bids: null,
        asks: null,
        historical: null,
        company: null,
        financials: null,
        logo_url: "",
        options: null
      }
    },
    mounted() {
      if (this.ticker != null) {
        this.getBookData();
        this.getTickerLogoUrl();
        this.getCompanyData();
        this.getFinancialsData();
        this.getHistoricalData("1y");
      }
    },
    methods: {
      getBookData() {
        this.$jsonp('https://api.iextrading.com/1.0/stock/' + this.ticker + '/book', {}).then(json => {
          this.quote = json.quote;
          this.bids = json.bids;
          this.asks = json.asks;
          console.log(json);
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
      },
      getHistoricalData(range = "1m") {
        this.$jsonp('https://api.iextrading.com/1.0/stock/' + this.ticker + '/chart/' + range, {}).then(json => {
          this.historical = json;

          let ohlc = [],
            volume = [],
            dataLength = json.length,
            i = 0;

          for (i; i < dataLength; i += 1) {
            ohlc.push([
              Date.parse(json[i]["date"]), // the date
              json[i]["open"], // open
              json[i]["high"], // high
              json[i]["low"], // low
              json[i]["close"] // close
            ]);

            volume.push([
              Date.parse(json[i]["date"]), // the date
              json[i]["volume"] // the volume
            ]);
          }

          let options = {
            yAxis: [{
              labels: {
                align: 'left'
              },
              height: '80%',
              resize: {
                enabled: true
              }
            }, {
              labels: {
                align: 'left'
              },
              top: '80%',
              height: '20%',
              offset: 0
            }],
            tooltip: {
              shape: 'square',
              headerShape: 'callout',
              borderWidth: 0,
              shadow: false,
              positioner: function (width, height, point) {
                let chart = this.chart,
                  position;

                if (point.isHeader) {
                  position = {
                    x: Math.max(
                      // Left side limit
                      chart.plotLeft,
                      Math.min(
                        point.plotX + chart.plotLeft - width / 2,
                        // Right side limit
                        chart.chartWidth - width - chart.marginRight
                      )
                    ),
                    y: point.plotY
                  };
                } else {
                  position = {
                    x: point.series.chart.plotLeft,
                    y: point.series.yAxis.top - chart.plotTop
                  };
                }

                return position;
              }
            },
            series: [{
              type: 'ohlc',
              id: this.ticker+'-ohlc',
              name: this.ticker.toLocaleUpperCase()+' Stock Price',
              data: ohlc
            }, {
              type: 'column',
              id: this.ticker+'-volume',
              name: this.ticker.toLocaleUpperCase()+' Volume',
              data: volume,
              yAxis: 1
            }],
            responsive: {
              rules: [{
                condition: {
                  maxWidth: 800
                },
                chartOptions: {
                  rangeSelector: {
                    inputEnabled: false
                  }
                }
              }]
            }
          };

          this.options = options;
        }).catch(err => {
          alert("Could not get data " + err.toString())
        })
      }
    }
  }
</script>

<style scoped>
  /* Set height of the grid so .sidenav can be 100% (adjust as needed) */
  .row.content {
    height: 550px
  }

  /* Set gray background color and 100% height */
  .sidenav {
    background-color: #f1f1f1;
    height: 100%;
  }

  /* On small screens, set height to 'auto' for the grid */
  @media screen and (max-width: 767px) {
    .row.content {
      height: auto;
    }
  }


    .breakdownPage {
      width: 100%;
      display: inline-block;
    }

    footer {
      border-top: 1px black solid;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 60px;
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
