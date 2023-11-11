<script setup lang="ts">
import { QInput } from 'quasar';
import { ref } from 'vue';
interface Props {
  inputType?: 'text' | 'password' | undefined;
  modelValue: QInput['modelValue'];
}
withDefaults(defineProps<Props>(), { inputType: 'text' });

const isPassword = ref(true);
</script>

<template>
  <div>
    <q-input
      v-bind="$attrs"
      :type="
        inputType !== 'password' ? inputType : isPassword ? 'password' : 'text'
      "
      :model-value="modelValue"
      outlined
      dense
      no-error-icon
      class="min-w-[150px] mt-1"
    >
      <template v-slot:prepend>
        <slot name="prepend" />
      </template>
      <template v-slot:append>
        <div
          @click="isPassword = !isPassword"
          class="cursor-pointer"
          v-if="inputType === 'password'"
        >
          <q-icon
            v-if="isPassword"
            name="fa-solid fa-eye"
            class="text-[#000000]"
          />
          <q-icon v-else name="fa-solid fa-eye-slash" />
        </div>
      </template>
    </q-input>
  </div>
</template>
<style>
.q-input {
  .q-field__control:hover:before {
    border-color: #000000;
  }
}
</style>
