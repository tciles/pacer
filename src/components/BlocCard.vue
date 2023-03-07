<script lang="ts" setup>
import {computed, reactive, ref} from "vue";
import {kmhToPace, round2} from "@/common/Pace";
import EditIcon from "@/components/icons/EditIcon.vue";
import CheckIcon from "@/components/icons/CheckIcon.vue";

const input = ref<HTMLInputElement | null>(null);

const props = defineProps({
  vma: {
    type: Number,
    required: true
  },
});

const state = reactive({
  mode: "read"
});

const isReadMode = computed(() => {
  return state.mode === "read";
});

const isEditMode = computed(() => {
  return state.mode === "edit";
});

const vma = computed(() => {
  return props.vma;
});

const ef = computed(() => {
  return round2(props.vma * 0.65);
});

const paceVma = computed(() => kmhToPace(props.vma, 100));
const paceEf = computed(() => kmhToPace(props.vma, 65));

const emit = defineEmits(["update:vma"]);

const updateVma = (evt: Event) => {
  const target = evt.target as HTMLInputElement;
  const value = parseFloat(target.value);

  if (!isNaN(value)) {
    emit("update:vma", value);
  }
};


const updateMode = (evt: Event) => {
  evt.cancelBubble = true;

  state.mode = state.mode === "edit" ? "read" : "edit";

  if (state.mode === "edit") {
    setTimeout(() => {
      input.value?.focus();
    }, 0);
  }
};

const forceUpdate = (evt: Event) => {
  state.mode = "read";
};

</script>

<template>
  <div class="card" @keyup.enter="forceUpdate">
    <div class="card-body">

      <div class="bloc">
        <p class="text-blue">Allure VMA</p>

        <p v-if="isReadMode" @click="updateMode">
          <span class="text-big">{{ paceVma }}</span> <span>min/km</span>
          <EditIcon class="icon"/>
        </p>
        <div v-if="isEditMode" class="form-group">
          <input ref="input" :value="vma" class="input-light" type="text" @change="updateVma">
          <span class="input-unit input-light">km/h</span>
          <CheckIcon class="icon icon-success cursor-pointer icon-big" @click="forceUpdate"/>
        </div>
        <p v-if="isReadMode" class="text-small text-light">({{ vma }}km/h)</p>
      </div>

      <div class="bloc">
        <p class="text-green">Allure d'endurance fondamentale</p>
        <p><span class="text-big">{{ paceEf }}</span> <span>min/km</span></p>
        <p class="text-small text-light">({{ ef }}km/h)</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.icon {
  margin-left: 10px;
}

.card-body {
  display: flex;
  flex-wrap: wrap;
}

.bloc {
  flex-grow: 1;
  min-height: 110px;
  background: var(--dark-2);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.33%;
  padding: 10px;
  flex-direction: column;
  margin-right: 10px;
  margin-left: 10px;
}

@media screen and (max-width: 700px) {
  .bloc {
    width: 100%;
    margin-right: 0;
    margin-left: 0;
    margin-top: 20px;
  }
}

.bloc:first-child {
  margin-left: 0;
}

.bloc:last-child {
  margin-right: 0;
}

.bloc p:first-child {
  margin-bottom: 10px;
}

.bloc p:last-child {
  margin-top: 10px;
}
</style>
