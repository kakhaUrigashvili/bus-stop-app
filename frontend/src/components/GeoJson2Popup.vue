
<template>
  <div>
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "GeoJsonPopup",
  props: {
    type: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    }
  }
};
</script>