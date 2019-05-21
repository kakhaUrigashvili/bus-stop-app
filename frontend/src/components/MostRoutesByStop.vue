<template>
<v-chart :options="chartData"/>
</template>

<style>
</style>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import getData from './../data/mostRoutesByStop' 

export default {
  components: {
    'v-chart': ECharts
  },
  data () {
    return {
      chartData: null
    }
  },
  mounted () {
    getData().then(data => this.chartData = data)
  }
}
</script>