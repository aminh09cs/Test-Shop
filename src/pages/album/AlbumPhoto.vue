<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useQuasar } from 'quasar';
import { albumRepo } from 'src/repositories/album';
import CustomInput from '../../components/CustomInput.vue';

const $q = useQuasar();
const route = useRoute();
const router = useRouter();

const { id } = route.params;

const search = ref();
const dataAlbumPhotos = ref<AlbumPhoto[]>();
const cloneAlbumPhotos = ref<AlbumPhoto[]>();

const fetchData = async () => {
  try {
    $q.loading.show();

    if (!id) return;
    const { data } = await albumRepo.getAlbumPhotos(+id);
    dataAlbumPhotos.value = data;
    cloneAlbumPhotos.value = data;
  } catch (e: unknown) {
    $q.notify({ type: 'negative', message: e });
  } finally {
    $q.loading.hide();
  }
};

watch(search, (val) => {
  dataAlbumPhotos.value = cloneAlbumPhotos.value?.filter(
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
    class="grid grid-cols-2 overflow-x-auto sm:overflow-x-hidden !w-[500px] sm:!w-[95%] m-auto"
  >
    <div class="flex justify-between items-center gap-x-12 col-span-2 mb-5">
      <h1 class="text-blue text-[40px] italic font-bold">
        Photos of album {{ id }}
      </h1>
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
      v-if="dataAlbumPhotos?.length"
    >
      <div
        v-for="item in dataAlbumPhotos"
        :key="item.id"
        class="flex justify-between col-span-2 md:col-span-1 hover:background-[#000000] border-b pb-2 cursor-pointer"
        @click="router.push(`/track/${item.id}`)"
      >
        <div class="flex items-center gap-x-3 2xl:gap-x-4">
          <img
            :src="item?.url || '/src/images/logo.svg'"
            alt=""
            class="w-[40px] h-[40px] rounded-[50%]"
            onerror="onerror=null, src='/src/images/logo.svg'"
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
          <p>04:19</p>
        </div>
      </div>
    </div>
    <div class="col-span-2 text-center text-[#a3a3a3]" v-else>No Data</div>
  </div>
</template>
