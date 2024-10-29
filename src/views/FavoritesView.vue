<template>
  <div class="tw-bg-gradient-to-br tw-from-[#F4CB38] tw-to-[#F4A938] tw-min-h-screen">
    <navigation-panel class="tw-pt-8"></navigation-panel>
    <div class="tw-flex tw-justify-center tw-items-center tw-gap-80 tw-mt-8">
      <div class="tw-font-mont tw-font-bold tw-text-4xl">{{ $t('favor') }}</div>
    </div>
    <div class="tw-flex tw-justify-center tw-mt-2">
      <div class="tw-bg-[#FCF8EF] tw-w-[1758.05px] tw-min-h-[600px] tw-rounded-3xl tw-font-mont tw-p-8">
        <div v-if="items.length === 0" class="tw-flex tw-justify-center">
          <div class="tw-font-bold tw-text-3xl tw-opacity-50 tw-mt-48">{{ $t('empty') }}</div>
        </div>
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
import { useQuasar } from "quasar";
import NavigationPanel from "../components/navigation-panel.vue";
import QuickItem from "../components/quick-item.vue";
import { useUserStore } from "../stores/userStore";

const $q = useQuasar();
const userStore = useUserStore();

const items = ref([]);

onMounted(() => {
  search();
});

const search = async () => {
  $q.loading.show();
  await userStore.init();
  for (const itemId of userStore.userNative.favorites) {
    items.value.push(await Item.getById(itemId));
  }
  $q.loading.hide();
};
</script>
