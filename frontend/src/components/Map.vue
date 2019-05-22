<template>
  <div>
    <h4 class="title"><span>Stops for route # {{route}}</span></h4>
    <div class="control is-inline-block">
      <div>Route: </div>
      <div class="select">
        <select v-model="route" v-on:change="loadData">
          <option v-for="option in routes" :key="option" v-bind:value="option">
            {{ option }}
          </option>
        </select>
      </div>
    </div>
    <l-map :zoom="zoom" :center="center" style="height: 900px; margin-top: 5px">
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
import {MAP_URL} from '../chart-common'

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
      route: '151',
      routes: [],
      zoom: 11,
      center: [41.8781, -87.6298],
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
  methods: {
    loadData: async function () {
      const {data} = await HTTP.get(`geo?route=${this.route}`);
      this.busStops.geojson = [data];
    }
  },
  async mounted() {
    this.loadData();

    const {data} = await HTTP.get('routes');
    this.routes = data;
  }
};
</script>
