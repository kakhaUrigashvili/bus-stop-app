<template>
  <div class="uk-container" id="app">
    <vk-grid gutter="large" >
      <MostStopsByRoute/>
      <MostRoutesByStop/>
    </vk-grid>
  </div>
</template>

<script>
import MostStopsByRoute from './components/MostStopsByRoute.vue'
import MostRoutesByStop from './components/MostRoutesByStop.vue'

export default {
  name: 'app',
  components: {
    MostStopsByRoute,
    MostRoutesByStop
  }
}
</script>

<style>
</style>
