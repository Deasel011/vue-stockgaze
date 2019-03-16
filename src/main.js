// The Vue buildconfig version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import authentication from './authentication'
import VueJsonp from 'vue-jsonp'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueHighcharts from 'vue-highcharts';
import Highcharts from 'highcharts';

import loadStock from 'highcharts/modules/stock.js';
import loadMap from 'highcharts/modules/map.js';
import loadGantt from 'highcharts/modules/gantt.js';
import loadDrilldown from 'highcharts/modules/drilldown.js';
import loadDragPanes from 'highcharts/modules/drag-panes';
import loadIndicators from 'highcharts/indicators/indicators-all';


loadStock(Highcharts);
loadMap(Highcharts);
loadGantt(Highcharts);
loadDrilldown(Highcharts);
loadDragPanes(Highcharts);
loadIndicators(Highcharts);

Vue.config.productionTip = false

Vue.use(VueJsonp, 5000);
Vue.use(BootstrapVue);
Vue.use(VueHighcharts, { Highcharts });

authentication.initialize().then(_ => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
})
