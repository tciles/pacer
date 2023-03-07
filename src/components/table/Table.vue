<script lang="ts" setup>
import TableHeader from "@/components/table/TableHeader.vue";
import TableRow from "@/components/table/TableRow.vue";
import {computed} from "vue";
import type ITableRow from "@/dto/ITableRow";
import {kmhToPace, round2} from "@/common/Pace";

const props = defineProps({
  vma: {
    type: Number,
    required: true
  },
  totalDistance: {
    type: Number,
    required: true
  },
  stepDistance: {
    type: Number,
    required: true
  },
  effort: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
});

const computedSteps = computed(() => {
  const numberOfSteps = props.totalDistance / props.stepDistance;
  const steps = [];

  for (let i = 0; i < numberOfSteps; i++) {
    const idx = i + 1;

    let distance = (props.stepDistance * idx);

    if (distance >= props.totalDistance) {
      distance = distance = props.totalDistance;
    }

    const step = <ITableRow>{
      id: idx,
      distance: distance,
      splitTime: kmhToPace(props.vma, props.effort, distance),
      speed: i === 0 ? round2(props.vma * (props.effort / 100)) : null,
      pace: i === 0 ? kmhToPace(props.vma, props.effort) : null,
    };

    steps.push(step);
  }

  return steps;
});
</script>

<template>
  <table>
    <TableHeader :type="type"/>
    <tbody>
    <TableRow v-for="step in computedSteps" :key="step.id" :data="step" :type="type"/>
    </tbody>
  </table>
</template>

<style scoped>
table {
  margin-top: 20px;
  width: 100%;
  background: var(--dark);
  border-spacing: 0;
}
</style>
