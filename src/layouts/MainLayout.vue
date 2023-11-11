<script setup lang="ts">
import HeaderTemplate from 'src/components/template/HeaderTemplate.vue';
</script>

<template>
  <div>
    <HeaderTemplate />
    <div class="pt-[100px] !h-screen">
      <div
        class="px-[20px] sm:px-[50px] 3xl:px-[80px] py-[30px] 3xl:py-[60px] h-full"
      >
        <router-view />
      </div>
    </div>
  </div>
</template>
