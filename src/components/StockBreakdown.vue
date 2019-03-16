<template>
  <div class="breakdownPage">
    <!-- If the ticker is not set, Page sets itself to a ticker entry form -->
    <div v-if="!ticker">
      <h1>Stock Breakdown</h1>
      <form>
        <input placeholder="Ticker here" name="ticker"/>
        <button type="submit">Obtain</button>
      </form>
    </div>

    <div class="container" v-if="ticker">
      <div class="row">
        <div class="col-3 text-right">
          <img class="logo pull-right" :src="logo_url" style="max-width: 128px; margin:.5em auto "/>
        </div>

        <div class="col-9 text-left" v-if="company">
          <h3>{{company.companyName}}</h3>
          <p>{{company.description}}</p>
        </div>
      </div>
      <b-tabs>
        <b-tab title="Charts" active>
          <div class="row">

            <div class="col-12">
              <Highstock v-if="chart_options" :options="chart_options"></Highstock>
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
        </b-tab>
        <b-tab title="Daily">
          <div class="w-100">

            <div class="row" v-if="real_time_data">
              <div class="col-3">Last Sale Price:<br><b>{{real_time_data.lastSalePrice||0}}</b></div>
              <div class="col-3">Last Sale Size:<br>{{real_time_data.lastSaleSize}}</div>
              <div class="col-3">Volume:<br>{{real_time_data.volume}}</div>
              <div class="col-3">Market %:<br>{{real_time_data.marketPercent}}</div>
            </div>
            <div class="row">
              <div class="col-12">
                <Highstock v-if="candlestick_options" :options="candlestick_options"></Highstock>
              </div>
            </div>
            <div class="row">
              <div class="col-12 text-center">
                <b-button id="dynamicSyncButton" :pressed.sync="dynamic_sync" variant="primary" v-on:click="toggleDataSync">Data Sync</b-button>
              </div>
            </div>
          </div>
        </b-tab>
      </b-tabs>
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
        candleSticksTimer: null,
        realTimeTimer:null,
        display: null,
        formatter: Formatter,
        ticker: new URLSearchParams(window.location.search).get('ticker'),
        quote: null,
        bids: null,
        asks: null,
        historical: null,
        dynamic: null,
        company: null,
        financials: null,
        logo_url: "",
        chart_options: null,
        candlestick_options : null,
        dynamic_sync:true,
        real_time_data:null
      }
    },
    created() {
      const self = this;
      if (this.ticker) {
        this.getDashboardTab();
        this.getDynamicData();
        this.getBookData();
        this.getTickerLogoUrl();
        this.getCompanyData();
        this.getFinancialsData();
        this.getHistoricalData("1y");
        this.getNearRealTimeQuote();


        this.realTimeTimer = setInterval(function(){self.getNearRealTimeQuote()},5000)
        this.candleSticksTimer = setInterval(function(){self.getDynamicData()}, 60000)
      }
    },
    methods: {
      getDashboardTab() {
        let date = new Date();
        let hour = date.getHours();
        let minute = date.getMinutes();

        if (hour < 16 && (hour >= 9 && minute >= 30)) {
          this.openDailyTab();
        } else {
          this.openChartTab();
        }
      },
      openDailyTab() {
        this.display = "daily";
        if (document.getElementById("dailyTabButton") === null) return;
        this.clearActiveTabs();
        document.getElementById("dailyTabButton").firstChild.classList.add("active")
      },
      openChartTab() {
        this.display = "chart";
        if (document.getElementById("chartTabButton") === null) return;
        this.clearActiveTabs();
        document.getElementById("chartTabButton").firstChild.classList.add("active")
      },
      clearActiveTabs() {
        Array.from(document.getElementsByClassName("tabButton")).forEach(function (x) {
          x.firstChild.classList.remove("active")
        })
      },
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
            rangeSelector: {
              selected: 2
            },

            yAxis: [{
              height: '55%',
              resize: {
                enabled: true
              },
              labels: {
                align: 'right',
                x: -3
              },
              title: {
                text: this.ticker.toLocaleUpperCase()
              }
            }, {
              top: '55%',
              height: '25%',
              labels: {
                align: 'right',
                x: -3
              },
              offset: 0,
              title: {
                text: 'MACD'
              }
            },{
              top: '80%',
              height: '20%',
              labels: {
                align: 'right',
                x: -3
              },
              offset: 0,
              title: {
                text: 'STOC'
              }
            }],

            title: {
              text: this.ticker.toLocaleUpperCase() +' Stock Chart'
            },

            series: [{
              type: 'ohlc',
              id: this.ticker + '-ohlc',
              name: this.ticker.toLocaleUpperCase() +' Stock Price',
              data: ohlc,
              zIndex: 1
            // }, {
            //   type: 'pivotpoints',
            //   linkedTo: this.ticker + '-ohlc',
            //   zIndex: 0,
            //   lineWidth: 1,
            //   dataLabels: {
            //     overflow: 'none',
            //     crop: false,
            //     y: 4,
            //     style: {
            //       fontSize: 9
            //     }
            //   }
            }, {
              type: 'macd',
              yAxis: 1,
              linkedTo: this.ticker + '-ohlc',
            },{
              type: 'stochastic',
              yAxis: 2,
              linkedTo: this.ticker + '-ohlc',
            }]
          };

          this.chart_options = options;
        }).catch(err => {
          alert("Could not get data " + err.toString())
        })
      },
      getDynamicData() {
        this.$jsonp('https://api.iextrading.com/1.0/stock/' + this.ticker + '/chart/dynamic', {}).then(json => {
          this.dynamic = json.data;

          let candles = [],
            volume = [],
            dataLength = this.dynamic.length,
            i = 0;

          for (i; i < dataLength; i += 1) {
            if(this.dynamic[i]["minute"]){
              this.dynamic[i]["date"] =
                this.dynamic[i]["date"].substring(0,4)
                +"-"+this.dynamic[i]["date"].substring(4,6)
                +"-"+this.dynamic[i]["date"].substring(6,8)
                +"T"+this.dynamic[i]["minute"]
            }

            if(parseInt(this.dynamic[i]["low"])<0){
              this.dynamic[i]["low"] = Math.min(parseInt(this.dynamic[i]["open"]),parseInt(this.dynamic[i]["close"]));
              if(this.dynamic[i]["low"] === null){
                continue;
              }
            }

            candles.push([
              Date.parse(this.dynamic[i]["date"])-18000000, // the date
              this.dynamic[i]["open"], // open
              this.dynamic[i]["high"], // high
              this.dynamic[i]["low"], // low
              this.dynamic[i]["close"] // close
            ]);

          }

          let options = {
            rangeSelector: {
              buttons: [{
                type: 'hour',
                count: 1,
                text: '1h'
              }, {
                type: 'day',
                count: 1,
                text: '1D'
              }, {
                type: 'all',
                count: 1,
                text: 'All'
              }],
              selected: 1,
              inputEnabled: false
            },

            title: {
              text: this.ticker.toLocaleUpperCase()+' Candlesticks'
            },

            series: [{
              type: 'candlestick',
              name: this.ticker.toLocaleUpperCase() + ' Stock Price',
              data: candles,
              tooltip: {
                valueDecimals: 2
              }
            }]
          };

          this.candlestick_options = options;
        }).catch(err => {
          alert("Could not get data " + err.toString())
        })
      },
      toggleDataSync() {
        const self = this;
        if(this.candleSticksTimer){
          clearInterval(this.candleSticksTimer);
          clearInterval(this.realTimeTimer);
          this.candleSticksTimer = null;
          this.realTimeTimer=null;
        }else{
          this.candleSticksTimer = setInterval(function(){self.getDynamicData()}, 60000);
          this.realTimeTimer = setInterval(function(){self.getNearRealTimeQuote()}, 5000);
        }
        this.syncActivated();
      },
      syncActivated(){
        this.dynamic_sync = !!this.candleSticksTimer;
      },
      getNearRealTimeQuote(){
        this.$jsonp('https://api.iextrading.com/1.0/tops?symbols=' + this.ticker, {}).then(json => {
          this.real_time_data = json[0];
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

  f67ooter {
    border-top: 1px black solid;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
  }

  table.financialTab {
    border: 1px solid #1C6EA4;
    background-color: #EEEEEE;
    width: 100%;
    text-align: left;
    border-collapse: collapse;
    margin-bottom: 1em;
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

  .nav-pills .active {
    background-color: #3f007f;
    color: white;
  }

  .sidebar {
    max-width: 250px;
  }

  #dynamicSyncButton.active{
    background-color: #3f007f;
    border-color: #5400ee;
  }

  #dynamicSyncButton:not(.active){
    background-color: #cf0000;
    border-color: #ff7f7d;
  }
</style>
