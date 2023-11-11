<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { gsap } from 'gsap';
import { useQuasar } from 'quasar';
import { required } from '../helpers/validate';
import { useAuthStore } from 'src/stores/auth';

import CustomInput from '../components/CustomInput.vue';
import CustomButton from '../components/CustomButton.vue';

const router = useRouter();
const $q = useQuasar();

const authStore = useAuthStore();

let timeline: gsap.core.Timeline;
const loginPayload = ref({ username: '', password: '' });

const handleLogin = () => {
  authStore.setToken('token_codeee');
  router.push('/post');
};

onMounted(() => {
  timeline = gsap
    .timeline()
    .from('.login-form', { opacity: 0, duration: 0.25 })
    .from('.login-img', { opacity: 0, x: 30, duration: 0.25 })
    .from('.login-title', { opacity: 0, y: -15 })
    .from('.login-input', { opacity: 0, stagger: 0.15, duration: 0.25 })
    .from('.login-submit', { opacity: 0, y: 15 });
});
onBeforeUnmount(() => {
  timeline.kill();
});
</script>
<template>
  <div class="flex justify-center items-center h-screen login-bg">
    <q-form
      class="!w-[90%] sm:max-w-[600px] rounded-2xl bg-[#ffffff] p-6 login-form"
      style="
        box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
          rgba(17, 17, 26, 0.05) 0px 8px 32px;
      "
      @submit="handleLogin"
    >
      <div>
        <div>
          <img src="src/images/logo.svg" alt="logo" class="mb-4 login-img" />
          <p class="text-[40px] font-bold mb-4 login-title">Sign in</p>
        </div>

        <div class="flex items-center w-full">
          <custom-input
            v-model="loginPayload.username"
            input-type="text"
            label="Username"
            class="w-full login-input"
            :rules="[required]"
          />
          <custom-input
            v-model="loginPayload.password"
            input-type="password"
            label="Password"
            class="w-full login-input"
            :rules="[required]"
          />
          <custom-button
            type="submit"
            label="Sign in"
            style="background: #2a85ff"
            class="!w-full !sm:w-auto !mt-5 login-submit"
          />
        </div>
      </div>
    </q-form>
  </div>
</template>
