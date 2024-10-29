<template>
  <div class="tw-m-2 tw-bg-white tw-shadow-lg hover:tw-bg-slate-200 tw-rounded-2xl" @click="open">
    <div class="tw-flex tw-font-mont">
      <q-img :src="imageURL" placeholder-src="/no-photo.png" class="tw-h-44 tw-w-56 tw-rounded-l-2xl" />
      <div class="tw-ml-4 tw-w-full tw-flex tw-flex-col">
        <div class="tw-flex">
          <div v-if="!item.id">
            <q-skeleton class="tw-w-[300px] tw-text-xl" type="text"></q-skeleton>
          </div>
          <div
            v-else
            class="tw-text-xl tw-font-medium tw-overflow-hidden tw-whitespace-nowrap tw-max-w-[300px] tw-text-ellipsis">
            {{ item.title }}
          </div>
          <q-btn
            v-if="userStore.isLoggedIn && item.id"
            class="tw-ml-auto tw-rounded-2xl"
            :color="userStore.userNative?.favorites.includes(item.id) ? 'red-5' : 'black'"
            flat
            :icon="userStore.userNative?.favorites.includes(item.id) ? 'favorite' : 'favorite_border'"
            @click.stop="addToFavorites"></q-btn>
        </div>

        <div v-if="!item.id">
          <q-skeleton class="tw-w-[300px]" type="text"></q-skeleton>
        </div>
        <div
          v-else
          class="tw-font-medium tw-mt-1 tw-overflow-hidden tw-max-w-[300px] tw-whitespace-nowrap tw-text-ellipsis">
          {{ item.description }}
        </div>

        <div class="tw-mt-auto tw-mb-2">
          <div v-if="!item.id">
            <q-skeleton class="tw-w-[150px]" type="text"></q-skeleton>
            <q-skeleton class="tw-w-[150px]" type="text"></q-skeleton>
          </div>
          <div v-else>
            <div>{{ item.animal + ", " + item.status }}</div>
            <div>{{ $t('date') }} : {{ item.dateCreated }}</div>
          </div>
        </div>
      </div>
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
import { useRouter } from "vue-router";
import { Item } from "../class/Item";
import { onMounted, ref } from "vue";
import { useUserStore } from "../stores/userStore";

const props = defineProps({ item: Item });

const userStore = useUserStore();
const router = useRouter();
const imageURL = ref(null);

onMounted(async () => {
  const urls = await props.item.getImagesURLs();
  imageURL.value = urls ? urls[0] : null;
});

const open = () => {
  router.push({ name: "item", params: { id: props.item.id } });
};

const addToFavorites = async () => {
  if (userStore.userNative.favorites.includes(props.item.id)) {
    let index = userStore.userNative.favorites.indexOf(props.item.id);
    if (index !== -1) {
      userStore.userNative.favorites.splice(index, 1);
      await userStore.userNative.update();
    }
  } else {
    userStore.userNative.favorites.push(props.item.id);
    await userStore.userNative.update();
  }
};
</script>
