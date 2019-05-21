<template>
<v-chart :options="chartData"/>
</template>

<style>
.echarts {
  width: 800px;
  height: 600px;
}
</style>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/map'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import getMap from './../data/chicagoMap' 
import getData from './../data/boardingsPerLocation'

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
    getMap().then(chicagoJson => {
      ECharts.registerMap('chicago', chicagoJson);
      getData().then(data => {
        // eslint-disable-next-line
        
        this.chartData = {
          backgroundColor: '#404a59',
          series: [{
            type: 'map',
            map: 'chicago',
            coordinateSystem: 'geo',
            data: [
                {name: 'BRONZEVILLE',value: Math.round(Math.random()*1000)}],
            symbolSize: val => val[2] / 10,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#ddb926'
              }
            }
          }],
         
        }
      })
      
    })
  }
}
</script>