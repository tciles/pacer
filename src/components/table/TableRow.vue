<script lang="ts" setup>
import type ITableRow from "@/dto/ITableRow";
import type {PropType} from "vue";
import {computed} from "vue";

const props = defineProps({
  data: {
    type: Object as PropType<ITableRow>,
    required: true
  },
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
  <tr>
    <td>{{ data.distance }}</td>
    <td v-if="isDistance">{{ data.splitTime }}</td>
    <td>{{ data.pace }}</td>
    <td>{{ data.speed }}</td>
  </tr>
</template>

<style scoped>
tr {
  text-align: center;
  height: 50px;
  background: var(--dark-2);
}

tr:nth-child(odd) {
  background: var(--dark-3);
}
</style>