<template>
<div>
  <h4 class="title"><span>{{selectMetricName()}}</span></h4>
   <div class="columns">
      <div class="column is-4">
        <div class="is-flex">
         <label>Metric </label>
          <multiselect v-model="selectedMetric" @input="loadData" :options="metrics"  track-by="key" label="name"
          :searchable="false" :close-on-select="true" :show-labels="false"></multiselect>
        </div>
      </div>
      <div class="column is-2">
       <div class="is-flex">
          <label>Item(s) </label>
          <input class="input" type="number" min="3" max="15" v-model="limit" v-on:change="loadData">
        </div>
      </div>
  </div>  
  <v-chart :options="chartData"/>
</div>
</template>

<script>
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import {HTTP} from '../http-common'
import {getBarChartOptions} from '../chart-common'

export default {
  data () {
    return {
      chartData: null,
      limit: 10,
      selectedMetric: null,
      metrics: [ {
        name: 'Top N Routes by # of Stops',
        template: 'Top {limit} Routes by # of Stops',
        key: 'route',
        valueProperty: 'numberOfStops',
        keyProperty: 'route',
        keyPrefix: 'Route # : '
      },
      {
        name: 'Top N Stops by # of Routes',
        template: 'Top {limit} Stops by # of Routes',
        key: 'stop',
        valueProperty: 'numberOfRoutes',
        keyProperty: 'stop',
        keyPrefix: ''
      },
      {
        name: 'Top N Routes by # of Boardings',
        template: 'Top {limit} Routes by # of Boardings',
        key: 'boarding-routes',
        valueProperty: 'numberOfBoardings',
        keyProperty: 'route',
        keyPrefix: 'Route # : '
      },
      {
        name: 'Top N Stops by # of Boardings',
        template: 'Top {limit} Stops by # of Boardings',
        key: 'boarding-stops',
        valueProperty: 'numberOfBoardings',
        keyProperty: 'stop',
        keyPrefix: ''
      }]
    }
  },
  methods: {
    loadData: async function () {
      const {name, key, valueProperty, keyProperty, keyPrefix} = this.selectedMetric
      let {data} = await HTTP.get(`stats/${key}?limit=${this.limit}`)
    
      // sort asc for chart
      data = data.sort((a,b) => a[valueProperty] - b[valueProperty])

      const values = data.map(i => i[valueProperty])
      const keys = data.map(i => `${keyPrefix}${i[keyProperty]}`)

      this.chartData = getBarChartOptions(name, keys, values)
    },
    selectMetricName () {
      if(this.selectedMetric) {
        return this.selectedMetric.template.replace('{limit}', this.limit);
      }
      return '';
    }
  },
  mounted () {
    this.selectedMetric = this.metrics[0];
    this.loadData()
  }
}
</script>