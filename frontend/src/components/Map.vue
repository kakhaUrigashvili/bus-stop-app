<template>
  <div>
    <h4 class="title"><span>Stops for Route(s) # {{selectedRoutes.join()}}</span></h4>
    <div class="columns">
      <div class="column is-4">
        <div class="is-flex">
         <label>Route</label>
          <multiselect @input="loadData" v-model="selectedRoutes" :options="routes" :multiple="true"
          :searchable="true" :close-on-select="true" :show-labels="false"></multiselect>
        </div>
      </div>
      <div class="column">
        <button class="button is-info" v-on:click="resetMap">Reset Map</button>
      </div>
    </div>
    
    <l-map ref="map" :zoom="zoom" :center="center" style="height: 900px; margin-top: 5px">
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-geo-json :geojson="busStops.geojson" :options="busStops.options"/>
    </l-map>
  </div>
</template>

<script>
import Vue from 'vue';
import { circleMarker } from 'leaflet'
import { LMap, LTileLayer, LGeoJson } from 'vue2-leaflet'
import PopupContent from './MapPopup'
import {HTTP} from '../http-common'
import {MAP_URL, MAP_COORDINATES, MAP_ZOOM} from '../chart-common'

function onEachFeature(feature, layer) {
  let PopupCont = Vue.extend(PopupContent);
  let popup = new PopupCont({
    propsData: feature.properties
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
      selectedRoutes: ['151'],
      routes: [],
      zoom: MAP_ZOOM,
      center: MAP_COORDINATES,
      url: MAP_URL,
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
              color: "#209cee",
              weight: 0.5,
              opacity: 0.5,
              fillOpacity: 0.8
            });
          }
        }
      }
    };
  },
  methods: {
    loadData: async function () {
      const queryParameters = this.selectedRoutes.map(i => `route[]=${i}`).join('&')
      const {data} = await HTTP.get(`geo?${queryParameters}`)
      this.busStops.geojson = [data]
    },
    resetMap () {
      this.$nextTick(() => {
        this.$refs.map.mapObject.setView(MAP_COORDINATES, MAP_ZOOM)
      })
    }
  },
  async mounted() {
    this.loadData()

    const {data} = await HTTP.get('routes')
    this.routes = data
  }
};
</script>
