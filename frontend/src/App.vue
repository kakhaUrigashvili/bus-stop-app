<template>
  <div>
      <nav class="navbar is-info">
        <div class="navbar-brand">
          <a class="navbar-item" href="#">
              Chicago - Bus Stops
          </a>
        </div>
        <div class="navbar-menu">
          <div class="navbar-start">
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link" href="#">
                Menu
              </a>
              <div class="navbar-dropdown">
                <a class="navbar-item" href="#map">Map</a>
                <a class="navbar-item" href="#toproutes">Top 10 Routes by # of Stops</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div class="section">
        <div class="container">
          <TotalStats/>
        </div>
      </div>
      <div class="section" id="map">
        <div class="container">
          <h4 class="title"><span>Map</span></h4>
          <GeoJSON2/>
        </div>
      </div>
      <div class="section" id="toproutes">
        <div class="container">
          <h4 class="title"><span>Top 10 Routes by # of Stops</span></h4>
          <MostRoutesByStop/>
        </div>
      </div>
    
  </div>
      

</template>

<script>

import TotalStats from "./components/TotalStats";
import GeoJSON2 from "./components/GeoJSON2";
import MostRoutesByStop from "./components/MostRoutesByStop";

export default {
  name: 'app',
  components: {
    TotalStats,
    GeoJSON2,
    MostRoutesByStop
  }
}
</script>

<style>
@import "../node_modules/leaflet/dist/leaflet.css";
@import "../node_modules/bulma/css/bulma.min.css";

body {
  background: #f5f5f5;
}


</style>
