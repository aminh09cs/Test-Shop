<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { LocalStorage } from 'quasar';

gsap.registerPlugin(ScrollTrigger);

const router = useRouter();

const essentialLinks = [
  { title: 'Posts', link: '/posts' },
  { title: 'Albums', link: '/albums' },
];

const handleLogout = () => {
  LocalStorage.remove('token_ne');
  window.location.href = 'login';
};
onMounted(() => {
  ScrollTrigger.create({
    trigger: '.header-shop',
    start: 'top -100',
    end: 9999,
    onToggle: (self) => {
      if (self.isActive) {
        gsap.to('.header-shop', { height: '70px' });
      } else {
        gsap.to('.header-shop', { height: '100px' });
      }
    },
  });
});
</script>

<template>
  <div
    class="fixed flex justify-between w-full h-[100px] bg-[#ffffff] z-[2] transition-all duration-300 ease-in-out header-shop"
    style="
      box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
        rgba(17, 17, 26, 0.05) 0px 8px 32px;
    "
  >
    <div
      class="flex items-center justify-center w-[100px] cursor-pointer"
      @click="router.push('/posts')"
    >
      <img src="/src/images/logo.svg" alt="logo" />
    </div>

    <div class="flex items-center gap-x-4">
      <router-link
        v-for="(item, idx) in essentialLinks"
        :key="idx"
        :to="item.link"
        class="hidden ssm:!block text-[16px] hover:scale-110 font-bold h-fit transition-all duration-300 ease-in-out essential-link"
      >
        <p class="p-2">{{ item.title }}</p>
      </router-link>
      <div
        class="flex justify-center w-[100px] cursor-pointer"
        @click="handleLogout"
      >
        <q-icon name="fa-solid fa-sign-out" class="text-[24px]" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.essential-link {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    width: 0%;
    z-index: -1;
    height: 100%;
    background: #000000;

    transition: width 0.3s;
  }
  transition: background, color 0.25s;
  &:hover {
    color: #ffffff;
  }
  &:hover::before {
    width: 100%;
  }
}
</style>
