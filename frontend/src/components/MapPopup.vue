
<template>
  <div>
    <p>On Street: {{ onStreet }}</p>
    <p>Cross Street: {{ crossStreet }}</p>
    <p>Boardings: {{ boardings }}</p>
    <p>Alightings: {{ alightings }}</p>
    
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
    boardings: {
      type: Number,
      default: ""
    },
    alightings: {
      type: Number,
      default: ""
    }
  }
};
</script>