<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useQuasar } from 'quasar';
import { postRepo } from 'src/repositories/post';
import { getRandomImage } from 'src/helpers/utils';

const $q = useQuasar();

const route = useRoute();
const fakeImages = [
  '/src/images/cat.jpeg',
  '/src/images/cat2.jpeg',
  '/src/images/cheems.webp',
];
const dataPostComment = ref<PostComment[]>();

const fetchData = async () => {
  try {
    $q.loading.show();
    const { id } = route.params;
    if (!id) return;
    const { data } = await postRepo.getCommentPost(+id);
    dataPostComment.value = data;
  } catch (e: unknown) {
    $q.notify({ type: 'negative', message: e });
  } finally {
    $q.loading.hide();
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div
    v-for="item in dataPostComment"
    :key="item.id"
    class="flex gap-x-3 items-center w-full cursor-pointer mb-3"
  >
    <!-- <q-icon name="fa-solid fa-user" class="p-3 border rounded-[50%]" /> -->
    <img
      :src="getRandomImage(fakeImages)"
      alt=""
      class="w-[40px] h-[40px] rounded-[50%]"
    />
    <div class="flex-1 pl-3 bg-[#00000033] p-3 rounded-2xl">
      <p class="text-[#204081] text-[20px] font-bold">{{ item.name }}</p>
      <p>{{ item.body }}</p>
    </div>
  </div>
</template>
