<template>
  <div class="tw-flex tw-justify-center tw-font-mont">
    <div>
      <div class="tw-font-bold tw-text-4xl">{{ $t('about') }}</div>
      <div class="tw-flex tw-mt-8">
        <div class="tw-flex">
          <q-img src="dog-icon.png" class="tw-h-[95px] tw-w-[95px]" />
          <div class="tw-ml-9">
            <p class="tw-text-xl tw-font-bold">{{ $t('we') }}</p>
            <p class="tw-text-xl" v-html="$t('1about')"></p>
          </div>
        </div>
        <div class="tw-flex tw-ml-32">
          <q-img src="settings-icon.png" class="tw-h-[95px] tw-w-[95px]" />
          <div class="tw-ml-9">
            <p class="tw-text-xl tw-font-bold">{{ $t('us') }}</p>
            <p class="tw-text-xl" v-html="$t('2about')"></p>
          </div>
        </div>
        <div class="tw-flex tw-ml-32">
          <q-img src="camera-icon.png" class="tw-h-[95px] tw-w-[95px]" />
          <div class="tw-ml-9">
            <p class="tw-text-xl tw-font-bold">{{ $t('you') }}</p>
            <p class="tw-text-xl" v-html="$t('3about')"></p>
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
</script>
