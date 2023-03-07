<script lang="ts" setup>
import MenuHorizontal from "@/components/menu/MenuHorizontal.vue";
import BlocCard from "@/components/BlocCard.vue";
import BlocFilter from "@/components/BlocFilter.vue";
import Table from "@/components/table/Table.vue";
import {computed, onMounted, reactive} from "vue";
import {distanceByTime} from "@/common/Pace";
import Saver from "@/common/Saver";

const DEFAULT_TYPE = 'distance';

const saver = new Saver(DEFAULT_TYPE);

const state = reactive({
  vma: 20,
  totalTime: 60,
  totalDistance: 400,
  totalDistanceForTime: 400,
  stepDistance: 100,
  stepDistanceForTime: 100,
  effort: 100,
  type: DEFAULT_TYPE
});

const loadState = () => {
  const type = saver.getType();
  const vma = saver.getVma();
  const totalTime = saver.getTotalTime();
  const totalDistance = saver.getTotalDistance();
  const stepDistance = saver.getStepDistance();
  const effort = saver.getEffort();

  if (type) {
    state.type = type;
  }

  if (totalTime) {
    state.totalTime = parseFloat(totalTime);
  }

  if (vma) {
    state.vma = parseFloat(vma);
  }

  if (totalDistance) {
    state.totalDistance = parseFloat(totalDistance);
  }

  if (stepDistance) {
    state.stepDistance = parseFloat(stepDistance);
  }

  if (effort) {
    state.effort = parseFloat(effort);
  }

  refreshState();
}

onMounted(() => {
  loadState();
})


const updateVma = (value: number) => {
  state.vma = value;
  saver.saveVma(value);
};

const updateTotalDistance = (value: number) => {
  state.totalDistance = value;
  saver.saveTotalDistance(value);
};

const updateStepDistance = (value: number) => {
  state.stepDistance = value;
  saver.saveStepDistance(value);
};

const refreshState = () => {
  if (state.type === 'time') {
    state.totalDistanceForTime = distanceByTime(state.vma, state.totalTime, state.effort);
    state.stepDistanceForTime = distanceByTime(state.vma, state.totalTime, state.effort);
  }
}

const updateEffort = (value: number) => {
  state.effort = value;
  saver.saveEffort(value);

  refreshState();
};

const updateType = (value: string) => {
  state.type = value;
  saver.saveType(value);
  refreshState();
}

const updateTotalTime = (value: number) => {
  state.totalTime = value * 60;
  saver.saveTotalTime(value);
  refreshState();
};

const vma = computed(() => {
  return state.vma;
});

const totalDistance = computed(() => {
  if(state.type === 'time') {
    return state.totalDistanceForTime;
  }

  return state.totalDistance;
});

const stepDistance = computed(() => {
  if (state.type === 'time') {
    return state.stepDistanceForTime;
  }

  return state.stepDistance;
});

const effort = computed(() => {
  return state.effort;
});

const totalTime = computed(() => {
  return state.totalTime;
});

const type = computed(() => {
  return state.type;
});

</script>

<template>
  <MenuHorizontal/>
  <main class="d-flex justify-content-center">
    <div class="container flex-grow-1">
      <BlocCard
          :vma="vma"
          @update:vma="updateVma"
      />
      <BlocFilter
          :effort="effort"
          :step-distance="stepDistance"
          :total-distance="totalDistance"
          :total-time="totalTime"
          :type="type"
          @update:total-time="updateTotalTime"
          @update:total-distance="updateTotalDistance"
          @update:step-distance="updateStepDistance"
          @update:effort="updateEffort"
          @update:type="updateType"
      />
      <Table
          :effort="effort"
          :step-distance="stepDistance"
          :total-distance="totalDistance"
          :vma="vma"
          :type="type"
      />
    </div>
  </main>
</template>

<style scoped>
main {
  padding-top: 20px;
  padding-bottom: 40px;
}
</style>