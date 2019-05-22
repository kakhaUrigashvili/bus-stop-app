
<template>
  <div>
    <p>On Street: {{ onStreet }} | Cross Street: {{ crossStreet }}</p>
    <p>Boardings: {{ boardings }} | Alightings: {{ alightings }}</p>
    <p>Routes: {{ routes.join() }}</p>
    
  </div>
</template>

<script>
export default {
  name: "MapPopup",
  props: {
    onStreet: {
      type: String,
      default: ""
    },
    crossStreet: {
      type: String,
      default: ""
    },
    routes: {
      type: Array
    },
    boardings: {
      type: Number
    },
    alightings: {
      type: Number
    }
  }
};
</script>