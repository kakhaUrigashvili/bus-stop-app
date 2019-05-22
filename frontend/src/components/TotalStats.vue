<template>
<div v-if="chartData">
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <p class="title">{{chartData.numberOfStops | formatNumber}}</p>
        <p class="subtitle"># Stops</p>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <p class="title">{{chartData.numberOfRoutes | formatNumber}}</p>
        <p class="subtitle"># Routes</p>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <p class="title">{{chartData.monthlyNumberOfBoardings | formatNumber}}</p>
        <p class="subtitle"># Monthly Boardings</p>
      </article>
    </div>
  </div>
</div>
</template>

<script>
import {HTTP} from '../http-common'

export default {
  data () {
    return {
      chartData: null
    }
  },
  async mounted() {
    const {data} = await HTTP.get('stats/total');
    this.chartData = data;
  }
}
</script>