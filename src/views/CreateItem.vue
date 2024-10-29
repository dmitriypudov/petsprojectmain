<template>
  <div class="tw-bg-gradient-to-br tw-from-[#F4CB38] tw-to-[#F4A938] tw-min-h-screen">
    <navigation-panel class="tw-pt-8"></navigation-panel>

    <div class="tw-flex tw-justify-center tw-font-mont">
      <div class="tw-bg-[#FCF8EF] tw-w-[1758.05px] tw-my-12 tw-rounded-3xl tw-p-8 tw-flex tw-flex-col tw-gap-5">
        <div class="tw-font-bold tw-text-4xl">{{ $t('adscr') }}</div>
        <div class="tw-text-lg tw-font-medium">
          {{ $t('nameadd') }}
          <q-input
            class="tw-bg-slate-200"
            outlined
            color="dark"
            :placeholder="placeholderText"
            v-model="title"
          />
        </div>
        <div class="tw-text-lg tw-font-medium">
          {{ $t('addcat') }}
          <q-select class="tw-bg-slate-200" outlined color="dark" v-model="status" :options="statusOptions" />
        </div>
        <div class="tw-text-lg tw-font-medium">
          {{ $t('animal') }}
          <q-select class="tw-bg-slate-200" outlined color="dark" v-model="animal" :options="animalOptions" />
        </div>
        <div class="tw-text-2xl tw-font-medium">
          {{ $t('photo') }}
          <div>
          <input type="file" @change="handleImageUpload" accept="image/*" multiple /></div>
          <q-file
            class="tw-bg-slate-200 tw-w-96"
            v-model="images"
            outlined
            color="dark"
            max-files="3"
            multiple
            use-chips
            @change="handleImageUpload"
            append
            accept="image/*"
          />
        </div>
        <div class="tw-flex tw-bg-slate-200 tw-p-4">
          <template v-if="imagesURLComputed.length === 0">
            <q-skeleton class="tw-h-48 tw-w-72 tw-mx-8" type="rect" />
            <q-skeleton class="tw-h-48 tw-w-72 tw-mx-8" type="rect" />
            <q-skeleton class="tw-h-48 tw-w-72 tw-mx-8" type="rect" />
          </template>
          <template v-else>
            <q-img v-for="url in imagesURLComputed" :src="url" :key="url" class="tw-h-48 tw-w-72 tw-mx-8"> </q-img>
          </template>
        </div>
        <div class="tw-text-2xl tw-font-medium">{{ $t('description') }}</div>
        <q-input
          autogrow
          type="textarea"
          class="tw-bg-slate-200"
          :placeholder="$t('placeholder')"
          outlined
          color="dark"
          v-model="description" />
        <div class="tw-text-2xl tw-font-medium">{{ $t('location') }}</div>
        <div>
          <ul>
            <li>{{ $t('locationdesc') }}</li>
          </ul>
        </div>
        <div class="tw-flex tw-justify-center">
          <div style="height: 600px; width: 800px">
            <l-map
              ref="map"
              v-model:zoom="zoom"
              :center="center"
              :useGlobalLeaflet="false"
              @update:center="center = $event"
              @click="addMarker">
              <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                layer-type="base"
                name="OpenStreetMap">
              </l-tile-layer>
              <l-marker v-for="(marker, i) in markers" :key="i" :lat-lng="marker" @click="markers.splice(i, 1)">
              </l-marker>
            </l-map>
          </div>
        </div>
        <div class="tw-flex tw-justify-center">
          <pets-button :label="$t('crads')" @click="submit"></pets-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { Item } from "../class/Item";
import { useQuasar } from "quasar";
import * as tf from "@tensorflow/tfjs";
import { useUserStore } from "../stores/userStore.js";
import NavigationPanel from "../components/navigation-panel.vue";
import PetsButton from "../components/pets-button.vue";
import { useRouter } from "vue-router";

import "leaflet/dist/leaflet.css";
import * as L from "leaflet/dist/leaflet-src.esm";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import { model } from "@tensorflow/tfjs";

const images = ref([]);
const title = ref('');
const placeholderText = ref('');
const description = ref('');
const status = ref('Пропавшие');
const animal = ref('Кошка');
const center = ref(L.latLng(56.489984, 84.970322));
const zoom = ref(12);
const markers = ref([]);

const userStore = useUserStore();
const router = useRouter();
const $q = useQuasar();

const statusOptions = ref(['Пропавшие', 'Найденные']);
const animalOptions = ref(['Кошка', 'Собака']);

const imagesURLComputed = computed(() =>
  images.value ? images.value.map((image) => URL.createObjectURL(image)) : []
);

const addMarker = (position) => {
  if (markers.value.length < 3) {
    markers.value.push([position.latlng.lat, position.latlng.lng]);
  }
};

onBeforeMount(async () => {
  await userStore.init();
  if (!userStore.isLoggedIn) {
    router.push({ name: "login" });
  }
});

const loadModel = async () => {
  try {
    const model = await tf.loadLayersModel('model/model.json');
    console.log('Модель TensorFlow.js загружена', model);
    return model;
  } catch (error) {
    console.error('Ошибка загрузки модели TensorFlow.js:', error);
    return null;
  }
};

// Функция для загрузки изображений
const handleImageUpload = (event) => {
  const selectedFiles = event.target.files;
  if (selectedFiles) {
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      images.value.push(file);
    }
    predictAnimal();
  }
};

// Функция предсказания
const predictAnimal = async () => {
  model.value = await loadModel();
  if (model.value && images.value.length > 0) {
    try {
      const predictionPromises = images.value.map(async (image) => {
        const img = new Image();
        const fileName = image.name;
        console.log(fileName);
        img.src = URL.createObjectURL(image);

        // Создание элемента canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Ожидание загрузки изображения
        await new Promise((resolve) => {
          img.onload = resolve;
        });

        // Установка размеров canvas под размеры изображения
        canvas.width = img.width;
        canvas.height = img.height;

        // Отрисовка изображения на canvas
        ctx.drawImage(img, 0, 0);

        // Извлечение пиксельных данных из canvas
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

        const input = tf.tensor4d(imageData, [1, img.height, img.width, 4]);

        // Предварительная обработка изображения при необходимости
        // Например, изменение размера и нормализация пикселей
        const preprocessedInput = tf.image.resizeBilinear(input, [64, 64]); // Изменение размера до [64, 64]
        const normalizedInput = preprocessedInput.div(255.0); // Нормализация пикселей

// Отбрасывание лишнего канала (если изображение имеет альфа-канал)
        const trimmedInput = normalizedInput.slice([0, 0, 0], [1, 64, 64, 3]);

        const prediction = model.value.predict(trimmedInput);

        // Ожидание результата предсказания
        const result = await prediction.data();

        prediction.dispose();
        tf.dispose([input, preprocessedInput]);

        console.log('Prediction result:', result);
        if (result[0] > 0.5) {
          console.log('Собака');
          placeholderText.value = 'Предсказано: Собака';
          animal.value = 'Собака'; // Установка категории в 'Собака' в случае предсказания "Собака"
        } else {
          console.log('Кошка');
          placeholderText.value = 'Предсказано: Кошка';
          animal.value = 'Кошка'; // Установка категории в 'Кошка' в случае предсказания "Кошка"
        }
      });

      await Promise.all(predictionPromises);
    } catch (error) {
      console.error('Prediction error:', error);
    }
  }
};

const submit = async () => {
  if (title.value.length < 10) {
    $q.dialog({ title: "Произошла ошибка", message: "Название объявления не должно быть короче 10 символов." });

    return;
  }

  $q.loading.show();

  let item = new Item();
  item.title = title.value;
  item.description = description.value;
  item.user = userStore.getUserId();
  item.animal = animal.value;
  item.status = status.value;
  item.markers = markers.value.map((e) => ({ lat: e[0], lng: e[1] }));

  await item.create();

  for (const image of images.value) {
    await item.uploadImage(image);
  }

  router.push({ name: "item", params: { id: item.id } });

  $q.loading.hide();
};
</script>