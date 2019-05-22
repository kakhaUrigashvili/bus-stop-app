<template>
<div>
  <h4 class="title"><span>Top {{limit}} Routes by # of Stops</span></h4>
  <div class="control is-inline-block">
    <div># item(s): </div>
    <input class="input" type="number" min="3" max="15" v-model="limit" v-on:change="loadData">
  </div>
  
  <v-chart :options="chartData"/>
</div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import {HTTP} from '../http-common'
import {getBarChartOptions} from '../chart-common'

export default {
  data () {
    return {
      chartData: null,
      limit: 10
    }
  },
  methods: {
    loadData: async function () {
      let {data} = await HTTP.get(`stats/route?limit=${this.limit}`)
    
      // sort asc for chart
      data = data.sort((a,b) => a.numberOfStops - b.numberOfStops)

      const values = data.map(i => i.numberOfStops)
      const keys = data.map(i => `Route # : ${i.route}`)

      this.chartData = getBarChartOptions('Routes', keys, values)
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>