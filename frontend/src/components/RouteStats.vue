<template>
<div v-if="chartData">
  <div class="tile is-ancestor" style="margin-bottom:10px">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <p class="title is-size-6">{{chartData.numberOfStops | formatNumber}}</p>
        <p class="subtitle is-size-6"># of Stops</p>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <p class="title is-size-6">{{chartData.averageMonthlyNumberOfBoardingsPerStop | formatNumber}}</p>
        <p class="subtitle is-size-6">Avg Boardings per Stop</p>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <p class="title is-size-6">{{chartData.monthlyNumberOfBoardings | formatNumber}}</p>
        <p class="subtitle is-size-6"># of Monthly Boardings</p>
      </article>
    </div>
  </div>
</div>
</template>

<script>
import {HTTP} from '../http-common'

export default {
  name: "RouteStats",
  props: {
    route: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      chartData: null
    }
  },
  methods: {
    async loadData() {
      const queryParameters = this.route.map(i => `route[]=${i}`).join('&')
      const {data} = await HTTP.get(`stats/total?${queryParameters}`)
      this.chartData = data
    }
  }
}
</script>