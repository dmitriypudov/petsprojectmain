<template>
  <div class="tw-bg-gradient-to-br tw-from-[#F4CB38] tw-to-[#F4A938] tw-min-h-screen">
    <navigation-panel class="tw-pt-8"></navigation-panel>
    <div class="tw-flex tw-justify-center tw-items-center tw-gap-80 tw-mt-8">
      <div class="tw-font-mont tw-font-bold tw-text-4xl">{{ $t('myads') }}</div>
    </div>
    <div class="tw-flex tw-justify-center tw-mt-2">
      <div class="tw-bg-[#FCF8EF] tw-w-[1758.05px] tw-min-h-[600px] tw-rounded-3xl tw-font-mont tw-p-8">
        <template v-for="item in items" :key="item.id">
          <quick-item :item="item"></quick-item>
          <q-separator></q-separator>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Item } from "../class/Item";
import { onMounted, ref } from "vue";
import NavigationPanel from "../components/navigation-panel.vue";
import QuickItem from "../components/quick-item.vue";
import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();

const items = ref([
  new Item(),
  new Item(),
  new Item(),
  new Item(),
  new Item(),
  new Item(),
  new Item(),
  new Item(),
  new Item(),
  new Item(),
]);

onMounted(async () => {
  await search();
});

const search = async () => {
  await userStore.init();
  const result = await Item.getCollection(null, ["user", "==", userStore.getUserId()]);
  items.value = Object.values(result);
};
</script>
