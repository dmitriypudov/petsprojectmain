паа<template>
  <div class="tw-bg-gradient-to-br tw-from-[#F4CB38] tw-to-[#F4A938] tw-h-screen tw-flex tw-justify-center">
    <div class="tw-flex tw-flex-col tw-justify-center tw-font-mont">
      <div class="tw-text-4xl tw-font-black tw-text-center tw-mb-8">{{ $t('recovery') }}</div>
      <div class="tw-bg-[#FCF8EF] tw-w-[567px] tw-px-14 tw-py-8 tw-rounded-[50px]">
        <div class="tw-text-xl">{{ $t('email') }}</div>
        <q-input dense outlined v-model="email" />
        <div class="tw-pt-6 tw-text-l">
          <div class="tw-flex">
            <div>{{ $t('recoverylozung') }}</div>
          </div>
        </div>

        <div class="tw-flex tw-justify-center tw-mt-20">
          <pets-button :label="$t('recoverypass')" @click="login"></pets-button>
        </div>
        <br>
        <span class="txt1" @click="switchLang">{{ $t('switch') }}</span>
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
import { ref } from "vue";
import PetsButton from "../components/pets-button.vue";

const email = ref(null);
</script>
