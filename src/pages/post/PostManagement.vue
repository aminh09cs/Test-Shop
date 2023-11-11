<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { postRepo } from 'src/repositories/post';

const router = useRouter();

const isLoading = ref(false);
const index = ref(0);
const totaldataPosts = ref<Post[]>();
const dataPosts = ref<Post[]>();
const scrollPost = ref<HTMLElement>();
const isScrollPostAtEnd = ref(false);
const fetchData = async () => {
  const { data } = await postRepo.getAll();
  totaldataPosts.value = data;
  dataPosts.value = totaldataPosts.value.slice(0, 20);
};
const handleScrollPost = async () => {
  if (!scrollPost.value) return;
  isScrollPostAtEnd.value =
    Math.floor(scrollPost.value.scrollHeight - scrollPost.value.scrollTop) ===
    scrollPost.value.clientHeight;

  if (isScrollPostAtEnd.value) {
    if (
      !dataPosts.value ||
      !totaldataPosts.value ||
      index.value > totaldataPosts.value.length
    )
      return;
    else {
      isLoading.value = true;

      setTimeout(() => {
        isLoading.value = false;
      }, 500);
      index.value += 20;

      dataPosts.value = [
        ...dataPosts.value,
        ...totaldataPosts.value?.slice(index.value, index.value + 20),
      ];
    }
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div
    class="h-[600px] overflow-scroll"
    ref="scrollPost"
    @scroll="handleScrollPost"
  >
    <div
      v-for="item in dataPosts"
      :key="item.id"
      class="flex gap-x-3 w-full mb-3 cursor-pointer"
      @click="router.push(`/posts/${item.id}/comments`)"
    >
      <p
        class="flex justify-center items-center font-bold text-[16px] w-[20px]"
      >
        {{ item.id }}
      </p>
      <div class="flex-1">
        <p class="text-[#204081] text-[20px] font-bold">{{ item.title }}</p>
        <p>{{ item.body }}</p>
      </div>
    </div>
    <q-inner-loading
      :showing="isLoading"
      label="Loading..."
      label-class="text-[#000000]"
      label-style="font-size: 1.1em"
    />
  </div>
</template>
