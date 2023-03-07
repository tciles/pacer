<script lang="ts" setup>
import {computed} from "vue";

const props = defineProps({
  type: {
    type: String,
    required: true
  },
});

const isDistance = computed(() => {
  return props.type === "distance";
});

</script>

<template>
  <thead>
  <tr>
    <th>Distance (m)</th>
    <th v-if="isDistance">Temps cumulé (h:m:s)</th>
    <th>Allure (min/km)</th>
    <th>Vitesse (km/h)</th>
  </tr>
  </thead>
</template>


<style scoped>
thead {
  color: #adb5bd;
  height: 40px;
}

th {
  font-weight: normal;
}
</style>