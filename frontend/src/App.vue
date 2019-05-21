<template>
  <div class="uk-container" id="app">
    <vk-grid gutter="large" >
      <MostStopsByRoute/>
      <MostRoutesByStop/>
      <ChicagoMap/>
    </vk-grid>
  </div>
</template>

<script>
import MostStopsByRoute from './components/MostStopsByRoute.vue'
import MostRoutesByStop from './components/MostRoutesByStop.vue'
import ChicagoMap from './components/ChicagoMap.vue'

export default {
  name: 'app',
  components: {
    MostStopsByRoute,
    MostRoutesByStop,
    ChicagoMap
  }
}
</script>

<style>
</style>
