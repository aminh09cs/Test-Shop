<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const { id } = route.params;
</script>

<template>
  <div
    class="flex gap-x-6 gap-y-10 justify-between max-w-[1080px] m-auto items-end font-bold"
  >
    <img src="https://via.placeholder.com/600/24f355" alt="logo1" />
    <div class="flex flex-col gap-y-5">
      <div>
        <p>Song {{ id }}</p>
        <p class="text-[30px] ssm:text-[70px]">LONG TIME</p>
        <p>Artist: Maroon 5</p>
      </div>
      <div
        class="flex flex-col ssm:flex-row items-start ssm:items-center gap-x-4 gap-y-2"
      >
        <img
          src="https://via.placeholder.com/150/24f355"
          alt="logo2"
          class="rounded-[50%] w-[40px] h-[40px]"
        />
        <p class="italic">Views: 11.000.000</p>
        <p class="italic">Time: 3:05</p>
      </div>
    </div>
  </div>
</template>
