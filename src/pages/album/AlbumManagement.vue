<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { albumRepo } from 'src/repositories/album';
import { getRandomImage } from 'src/helpers/utils';
import CustomInput from '../../components/CustomInput.vue';

const router = useRouter();

const search = ref();
const dataAlbums = ref<Album[]>();
const cloneAlbums = ref<Album[]>();

const fakeImages = [
  '/src/images/cat.jpeg',
  '/src/images/cat2.jpeg',
  '/src/images/cheems.webp',
];
const fetchData = async () => {
  const { data } = await albumRepo.getAll();

  dataAlbums.value = data;
  cloneAlbums.value = data;
};

watch(search, (val) => {
  dataAlbums.value = cloneAlbums.value?.filter(
    (item) =>
      String(item.title.slice(0, val.trim().length)).toLowerCase() ===
      String(val.trim()).toLowerCase()
  );
});

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div
    class="overflow-x-auto sm:overflow-x-hidden !w-[500px] sm:!w-[95%] m-auto"
  >
    <div class="flex justify-between items-center gap-x-12 col-span-2 mb-5">
      <h1 class="text-blue text-[40px] italic font-bold">Albums</h1>
      <custom-input
        v-model="search"
        input-type="text"
        label="Search..."
        class="w-[250px]"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </custom-input>
    </div>
    <div
      class="col-span-2 grid grid-cols-2 gap-x-12 gap-y-4"
      v-if="dataAlbums?.length"
    >
      <div
        v-for="item in dataAlbums"
        :key="item.id"
        class="flex justify-between col-span-2 md:col-span-1 hover:background-[#000000] border-b pb-2 cursor-pointer"
        @click="router.push(`/albums/${item.id}/photos`)"
      >
        <div class="flex items-center gap-x-3 2xl:gap-x-4">
          <img
            :src="getRandomImage(fakeImages)"
            alt=""
            class="w-[40px] h-[40px] rounded-[50%]"
          />
          <div class="flex flex-col justify-between">
            <p class="truncate w-[200px] text-[16px] font-bold">
              {{ item.title }}
            </p>
            <p>artist: {{ item.id }}</p>
          </div>
        </div>

        <div class="flex flex-col justify-between">
          <p class="text-[16px] font-bold">Time</p>
          <p>16:12</p>
        </div>
      </div>
    </div>
    <div class="col-span-2 text-center text-[#a3a3a3]" v-else>No Data</div>
  </div>
</template>
