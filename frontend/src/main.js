import Vue from 'vue'
import App from './App.vue'
import { Icon } from "leaflet";
import ECharts from 'vue-echarts'
import VueLogger from 'vuejs-logger'
import Vuikit from 'vuikit'
import VuikitIcons from '@vuikit/icons'
import "leaflet.icon.glyph";
import '@vuikit/theme'

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
Vue.use(Vuikit)
Vue.use(VuikitIcons)
Vue.component('v-chart', ECharts)
new Vue({
  render: h => h(App),
}).$mount('#app')
