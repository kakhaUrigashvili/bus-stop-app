<template>
  <div>
    <l-map :zoom="zoom" :center="center" style="height: 900px">
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-geo-json :geojson="busStops.geojson" :options="busStops.options"/>
    </l-map>
  </div>
</template>

<script>
import Vue from "vue";
import { circleMarker } from "leaflet";
import { LMap, LTileLayer, LGeoJson } from "vue2-leaflet";
import PopupContent from "./GeoJson2Popup";
import {HTTP} from '../http-common'

function onEachFeature(feature, layer) {
  let PopupCont = Vue.extend(PopupContent);
  let popup = new PopupCont({
    propsData: {
      text: feature.properties.popupContent
    }
  });
  layer.bindPopup(popup.$mount().$el);
}

export default {
  components: {
    LMap,
    LTileLayer,
    LGeoJson
  },
  data() {
    return {
      zoom: 11,
      center: [41.8781, -87.6298],
      url:
        "https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWJvdWNoYXVkIiwiYSI6ImNpdTA5bWw1azAyZDIyeXBqOWkxOGJ1dnkifQ.qha33VjEDTqcHQbibgHw3w",
      attribution: '',
      busStops: {
        geojson: [],
        options: {
          style: function(feature) {
            return feature.properties && feature.properties.style;
          },
          onEachFeature: onEachFeature,
          pointToLayer: function(feature, latlng) {
            return circleMarker(latlng, {
              radius: 8,
              fillColor: "#f9b729",
              color: "#000",
              weight: 1,
              opacity: 1,
              fillOpacity: 0.8
            });
          }
        }
      }
    };
  },
  async mounted() {
    const {data} = await HTTP.get('geo-points');
    this.busStops.geojson = [data];
  }
};
</script>
