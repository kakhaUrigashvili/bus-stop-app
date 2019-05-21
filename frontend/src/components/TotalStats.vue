<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <p class="title">{{chartData.numberOfStops}}</p>
        <p class="subtitle"># Stops</p>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <p class="title">{{chartData.numberOfRoutes}}</p>
        <p class="subtitle"># Routes</p>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <p class="title">{{chartData.monthlyNumberOfBoardings}}</p>
        <p class="subtitle"># Monthly Boardings</p>
      </article>
    </div>
  </div>
</template>

<style>

</style>

<script>
import {HTTP} from '../http-common'

export default {

  data () {
    return {
      chartData: null
    }
  },
  async mounted() {
    const {data} = await HTTP.get('total-stats');
    this.chartData = data;
  }
}
</script>