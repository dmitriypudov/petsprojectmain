<template>
  <div class="tw-bg-gradient-to-br tw-from-[#F4CB38] tw-to-[#F4A938] tw-min-h-screen">
    <navigation-panel class="tw-pt-8"></navigation-panel>

    <div class="tw-flex tw-justify-center tw-mt-12 tw-font-mont">
      <div class="tw-bg-[#FCF8EF] tw-w-[1758.05px] tw-rounded-3xl tw-p-8 tw-flex tw-flex-col tw-gap-2">
        <div class="tw-flex">
          <div class="tw-p-4">
            <div class="tw-flex">
              <div class="tw-mr-2">Опубликовано :</div>
              <div v-if="!item.id">
                <q-skeleton class="tw-w-[140px]" type="text"></q-skeleton>
              </div>
              <div v-else>
                {{ item.dateCreated }}
              </div>
            </div>
            <div class="tw-font-bold tw-text-4xl tw-max-w-[720px]">
              <div v-if="!item.id">
                <q-skeleton class="tw-w-full" type="text"></q-skeleton>
              </div>
              <div v-else>
                {{ item.title }}
              </div>
            </div>
            <div class="tw-flex tw-mt-1">
              <div class="tw-w-10 tw-flex tw-flex-col tw-justify-center">
                <q-btn
                  v-if="imagesURLs.length > 1"
                  icon="keyboard_arrow_left"
                  flat
                  size="xl"
                  @click="selectedImage = selectedImage - 1 === -1 ? imagesURLs.length - 1 : selectedImage - 1" />
              </div>
              <q-img
                :src="imagesURLs ? imagesURLs[selectedImage] : ''"
                placeholder-src="/no-photo.png"
                class="tw-w-[720px] tw-h-[720px] tw-shadow-lg"></q-img>
              <div class="tw-w-10 tw-flex tw-flex-col tw-justify-center">
                <q-btn
                  v-if="imagesURLs.length > 1"
                  icon="keyboard_arrow_right"
                  flat
                  size="xl"
                  @click="selectedImage = (selectedImage + 1) % imagesURLs.length" />
              </div>
            </div>
            <div v-if="imagesURLs.length > 1" class="tw-flex tw-p-1">
              <q-img
                v-for="(url, index) in imagesURLs"
                :src="url"
                :key="url"
                class="tw-h-16 tw-w-24 tw-border tw-opacity-50"
                :class="{ 'tw-border-amber-500 tw-opacity-100': index === selectedImage }"
                @click="selectedImage = index">
              </q-img>
            </div>
          </div>
          <div class="tw-w-full tw-flex tw-justify-center">
            <div>
              <div class="tw-border tw-p-8 tw-text-4xl tw-font-bold tw-flex">
                <q-skeleton class="tw-mr-4" type="circle" size="xl"></q-skeleton>
                <template v-if="!user.id">
                  <q-skeleton class="tw-w-[200px]" type="text"></q-skeleton>
                </template>
                <template v-else>
                  {{ user.name + " " + user.lastName }}
                </template>
              </div>
              <div class="tw-border tw-p-8 tw-text-4xl tw-font-bold tw-flex">
                <q-icon class="tw-mr-4" name="phone" size="xl"></q-icon>
                <template v-if="!user.id">
                  <q-skeleton class="tw-w-[200px]" type="text"></q-skeleton>
                </template>
                <template v-else>
                  {{ user.phone }}
                </template>
              </div>
              <div class="tw-border tw-p-8 tw-text-4xl tw-font-bold tw-flex">
                <q-icon class="tw-mr-4" name="email" size="xl"></q-icon>
                <template v-if="!user.id">
                  <q-skeleton class="tw-w-[200px]" type="text"></q-skeleton>
                </template>
                <template v-else>
                  {{ user.email }}
                </template>
              </div>
              <div style="height: 600px; width: 800px">
                <l-map ref="map" :center="center" :zoom="zoom" :useGlobalLeaflet="false">
                  <l-tile-layer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    layer-type="base"
                    name="OpenStreetMap">
                  </l-tile-layer>
                  <l-marker v-for="(marker, i) in item.markers" :key="i" :lat-lng="marker"> </l-marker>
                </l-map>
              </div>
            </div>
          </div>
        </div>
        <div class="tw-font-bold tw-text-2xl">Описание</div>
        <div class="tw-border tw-p-2">
          <div v-if="!item.id">
            <q-skeleton class="tw-w-1/2" type="text"></q-skeleton>
          </div>
          <div v-else class="tw-break-words">
            {{ item.description ? item.description : "Описание отсутствует." }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import NavigationPanel from "../components/navigation-panel.vue";
import { onBeforeMount, ref } from "vue";
import { Item } from "../class/Item";
import { User } from "../class/User";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

const route = useRoute();
const item = ref(new Item());
const user = ref(new User());
const imagesURLs = ref([]);
const selectedImage = ref(0);

const center = ref([56.489984, 84.970322]);
const zoom = ref(12);

onBeforeMount(async () => {
  const result = await Item.getById(route.params.id);

  console.log(result);

  if (result) {
    user.value = await User.getById(result.user);
    item.value = result;
    imagesURLs.value = await result.getImagesURLs();
  }
});

onBeforeRouteUpdate((to, from) => {
  console.log(to, from);
});
</script>
