<script lang="ts" setup>
import {computed} from "vue";
import {round2} from "@/common/Pace";

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  totalTime: {
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
});

const isTime = computed(() => {
  return props.type === "time";
});

const isDistance = computed(() => {
  return props.type === "distance";
});

const totalTime = computed(() => {
  return round2(props.totalTime / 60);
});

const totalDistance = computed(() => {
  return props.totalDistance;
});

const stepDistance = computed(() => {
  return props.stepDistance;
});

const effort = computed(() => {
  return props.effort;
});

const emit = defineEmits(["update:type", "update:totalTime", "update:totalDistance", "update:stepDistance", "update:effort"]);

const updateType = (evt: Event) => {
  evt.stopPropagation();

  emit("update:type", props.type === "time" ? "distance" : "time")
};

const updateTotalTime = (evt: Event) => {
  const target = evt.target as HTMLInputElement;
  const value = parseFloat(target.value);

  if (!isNaN(value) && value > 0) {
    emit("update:totalTime", value);
  }
};

const updateTotalDistance = (evt: Event) => {
  const target = evt.target as HTMLInputElement;
  const value = parseFloat(target.value);

  if (!isNaN(value) && value > 0) {
    if (value < props.stepDistance) {
      emit("update:stepDistance", value);
    }

    emit("update:totalDistance", value);
  }
};

const updateStepDistance = (evt: Event) => {
  const target = evt.target as HTMLInputElement;
  let value = parseFloat(target.value);

  if (!isNaN(value) && value > 0) {
    if (value > props.totalDistance) {
      value = props.totalDistance;
    }

    emit("update:stepDistance", value);
  }
};

const updateEffort = (evt: Event) => {
  const target = evt.target as HTMLInputElement;
  let value = parseFloat(target.value);

  if (!isNaN(value) && value > 0) {
    emit("update:effort", value);
  } else {
    emit("update:effort", 0);
  }
};

const isTypeChecked = computed(() => {
  return props.type === "time" ? false : true;
});

</script>

<template>
  <div class="card d-flex">
    <div class="fw">
      <div class="toggle">
        <input id="toggle_airplane" :checked="isTypeChecked" type="checkbox" @change="updateType">
        <label class="toggle__bar" for="toggle_airplane">
          <span class="toggle__handle"></span>
        </label>
      </div>
      <span class="type" @click="updateType">
        Temps / Distance
      </span>

    </div>

    <div v-if="isTime" class="col">
      <label>Durée</label>
      <div class="form-group">
        <input :value="totalTime" type="text" @change="updateTotalTime">
        <span class="input-unit">min</span>
      </div>
    </div>
    <div v-if="isDistance" class="col">
      <label>Distance totale</label>
      <div class="form-group">
        <input :value="totalDistance" type="text" @change="updateTotalDistance">
        <span class="input-unit">m</span>
      </div>
    </div>
    <div v-if="isDistance" class="col">
      <label>Distance par intermédiaire</label>
      <div class="form-group">
        <input :value="stepDistance" type="text" @change="updateStepDistance">
        <span class="input-unit">m</span>
      </div>
    </div>
    <div class="col">
      <label>Pourcentage d'effort</label>
      <div class="form-group">
        <input :value="effort" type="text" @change="updateEffort">
        <span class="input-unit">%</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

.fw {
  display: flex;
  flex-grow: 1;
  width: 100%;
  padding-bottom: 10px;
  padding-left: 10px;
}

.type {
  margin-left: 10px;
}

.card {
  margin-top: 20px;
  padding: 20px;
  background: var(--dark-2);
  justify-content: space-between;
  flex-wrap: wrap;
}

.form-group {
  display: flex;
  align-items: center;
}

label {
  display: inline-block;
  margin-bottom: 10px;
}

.col {
  padding-left: 10px;
  padding-right: 10px;
}

.col:first-child {
  padding-left: 0;
}

.col:last-child {
  padding-right: 0;
}

.col, input {
  flex-grow: 1;
}

@media screen and (max-width: 720px) {
  .card {
    flex-direction: column;
  }

  .col {
    margin-top: 20px;
    padding-left: 0px;
    padding-right: 0px;
  }

  .col:first-child {
    margin-top: 0;
  }
}

</style>
