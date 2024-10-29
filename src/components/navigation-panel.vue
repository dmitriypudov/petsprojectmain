<template>
  <div class="tw-flex tw-justify-center">
    <div class="tw-mr-28">
      <q-img src="/favicon.ico" no-spinner class="tw-w-[64px] tw-h-[64px]" />
      <span class="tw-ml-4 tw-font-mont tw-text-2xl tw-font-bold tw-tracking-[10.8px] tw-uppercase">Pets</span>
    </div>

    <q-btn
      to="/"
      :label="$t('home')"
      flat
      size="xl"
      :ripple="false"
      no-caps
      class="tw-mr-16 tw-font-mont tw-text-2xl active: tw-underline-offset-8"
      :class="{ 'tw-underline tw-underline-offset-8': $route.path === '/' }" />
    <q-btn
      to="/search"
      :label="$t('allads')"
      flat
      size="xl"
      :ripple="false"
      no-caps
      class="tw-mr-16 tw-font-mont tw-text-2xl"
      :class="{ 'tw-underline tw-underline-offset-8': $route.path === '/search' }" />
    <q-btn
      :label="$t('switch')"
      flat
      size="xl"
      :ripple="false"
      no-caps
      :class="['tw-mr-16', 'tw-font-mont', 'tw-text-2xl',]"
      @click="switchLang"
    />

    <div v-if="userStore.isLoggedIn" class="tw-ml-28">
      <q-btn-dropdown
        class="tw-mr-16 tw-font-mont tw-text-2xl"
        :label="$t('profile')"
        no-caps
        flat
        size="xl"
        :ripple="false">
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label class="tw-opacity-50">{{
                userStore.userNative.name + " " + userStore.userNative.lastName
              }}</q-item-label>
            </q-item-section>
          </q-item>


          <q-item clickable v-close-popup to="/createitem">
            <q-item-section>
              <q-item-label>{{ $t('crads') }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup to="/my">
            <q-item-section>
              <q-item-label>{{ $t('myads') }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup to="/favorites">
            <q-item-section>
              <q-item-label>{{ $t('favor') }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup to="/profile">
            <q-item-section>
              <q-item-label>{{ $t('settings') }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator></q-separator>

          <q-item clickable v-close-popup @click="logout">
            <q-item-section>
              <q-item-label class="tw-text-red-500">{{ $t('logout') }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
    <div v-else class="tw-ml-28">
      <q-btn
        to="/login"
        label="Войти"
        class="tw-font-mont tw-text-2xl"
        flat
        no-caps
        size="xl"
        icon-right="login"
        :ripple="false" />
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
import { useUserStore } from "../stores/userStore.js";

const router = useRouter();
const userStore = useUserStore();

const logout = async () => {
  userStore.logout();
  router.push({ name: "home" });
};
</script>
