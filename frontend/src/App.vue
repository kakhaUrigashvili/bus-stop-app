<template>
  
      <GeoJSON2/>

</template>

<script>

import GeoJSON2 from "./components/GeoJSON2";

export default {
  name: 'app',
  components: {
    GeoJSON2
  }
}
</script>

<style>
@import "../node_modules/leaflet/dist/leaflet.css";
.leaflet-fake-icon-image-2x {
  background-image: url(../node_modules/leaflet/dist/images/marker-icon-2x.png);
}
.leaflet-fake-icon-shadow {
  background-image: url(../node_modules/leaflet/dist/images/marker-shadow.png);
}
body {
  margin: 0px;
  font-family: Helvetica, Verdana, sans-serif;
}
</style>
