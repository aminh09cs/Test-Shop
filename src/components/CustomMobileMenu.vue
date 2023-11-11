<script setup lang="ts">
import { useRouter } from 'vue-router';

interface Props {
  essentialLinks: { title: string; link: string }[];
}
const props = withDefaults(defineProps<Props>(), {});
const emits = defineEmits(['close']);

const router = useRouter();

const handleAction = (action: 'route' | 'button', link?: string) => {
  if (action === 'route') {
    if (!link) return;
    emits('close');
    router.push(link);
  } else {
    emits('close');
  }
};
</script>

<template>
  <div
    class="fixed w-full h-full flex flex-col gap-y-3 justify-center items-center bg-[#00000080] backdrop-blur"
  >
    <div
      v-for="(item, index) in essentialLinks"
      :key="index"
      class="text-[16px] font-bold hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer"
      @click="handleAction('route', item.link)"
    >
      {{ item.title }}
    </div>
    <q-icon
      name="fa-solid fa-xmark"
      class="text-[24px] hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer"
      @click="handleAction('button')"
    />
  </div>
</template>
