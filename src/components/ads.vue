<template>
  <div class="tw-bg-gradient-to-br tw-from-[#FFEEC8] tw-to-[#FFEEC8] tw-min-h-[480px] tw-font-mont">
    <div class="tw-flex tw-justify-center tw-pt-16">
      <p class="tw-font-bold tw-text-4xl">{{ $t('lastads') }}</p>
    </div>
    <div class="tw-flex tw-justify-center">
      <template v-for="item in items" :key="item.id">
        <quick-item class="tw-w-1/5" :item="item"></quick-item>
        <q-separator></q-separator>
      </template>
    </div>
  </div>
</template>

<script setup>
import {useI18n} from "vue-i18n";
const { t, locale } = useI18n({useScope: "global"})
const switchLang = () => {
  locale.value === 'en' ? locale.value = 'ru' : locale.value = 'en'
  localStorage.setItem('lang', locale.value)
  console.log(locale.value);
}
import { onMounted, ref } from "vue";
import { Item } from "../class/Item";
import QuickItem from "../components/quick-item.vue";

const items = ref([]);

onMounted(async () => {
  const result = await Item.getCollection(null, null, 3);
  items.value = Object.values(result);
});
</script>
