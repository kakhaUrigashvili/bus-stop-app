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
                <a class="navbar-item" href="#topn">Top N</a>
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
          <Map/>
        </div>
      </div>
      <div class="section" id="topn">
        <div class="container">
          <TopN/>
        </div>
      </div>
  </div>
</template>

<script>
import 'vue-echarts'
import TotalStats from './components/TotalStats';
import Map from './components/Map';
import TopN from './components/TopN';

export default {
  name: 'app',
  components: {
    TotalStats,
    Map,
    TopN
  }
}
</script>

<style>
@import "../node_modules/leaflet/dist/leaflet.css";
@import "../node_modules/bulma/css/bulma.min.css";
@import "../node_modules/vue-multiselect/dist/vue-multiselect.min.css";

body {
  background: #f5f5f5;
}

.echarts {
  width: 100%;
  height: 600px;
  margin-top: 5px;
}

.echarts > div {
  border-radius: 6px;
  box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
}

.multiselect--active {
    z-index: 5000;
}

div.is-flex > label {
  align-self: center;
  margin-right: 0.7em;
}

#map .vue2leaflet-map {
  height: 600px; 
  margin-top: 5px; 
  border-radius: 6px;
}
</style>
