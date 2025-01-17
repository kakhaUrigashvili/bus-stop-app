import Vue from 'vue'
import App from './App.vue'
import { Icon } from "leaflet"
import ECharts from 'vue-echarts'
import VueLogger from 'vuejs-logger'
import "leaflet.icon.glyph"
import numeral from 'numeral'
import Multiselect from 'vue-multiselect'
import RouteStats from './components/RouteStats.vue'

Vue.config.productionTip = false

Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

const options = {
  isEnabled: true,
  showConsoleColors: true
};

Vue.use(VueLogger, options);
Vue.component('v-chart', ECharts)
Vue.component('multiselect', Multiselect)
Vue.component('route-stats', RouteStats)

Vue.filter('formatNumber', function (value) {
  return numeral(value).format("0,0");
});

new Vue({
  render: h => h(App),
}).$mount('#app')
