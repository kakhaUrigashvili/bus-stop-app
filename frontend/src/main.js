import Vue from 'vue'
import App from './App.vue'
import ECharts from 'vue-echarts'
import VueLogger from 'vuejs-logger'
import Vuikit from 'vuikit'
import VuikitIcons from '@vuikit/icons'
import '@vuikit/theme'

Vue.config.productionTip = false

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
