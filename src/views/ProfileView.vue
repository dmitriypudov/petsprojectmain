<template>
  <div class="tw-bg-gradient-to-br tw-from-[#F4CB38] tw-to-[#F4A938] tw-h-screen">
    <navigation-panel class="tw-pt-8"></navigation-panel>
    <div class="tw-grid tw-grid-cols-5 tw-mt-16 tw-gap-x-0 tw-gap-y-5 tw-font-mont tw-text-xl tw-font-medium">
      <div></div>
      <div class="tw-font-bold tw-text-4xl">{{ $t('profile') }}</div>
      <div class="tw-col-span-3"></div>
      <div></div>
      <div
        class="tw-bg-[#FCF8EF] tw-rounded-[50px] hover:tw-cursor-pointer tw-col-start-2 tw-col-end-5 tw-h-[60px] tw-flex tw-items-center"
        @click="personal = !personal">
        <div class="tw-ml-6 tw-select-none">{{ $t('replcontact') }}</div>
        <q-icon class="tw-ml-auto tw-mr-5" flat round :name="personal ? 'expand_less' : 'expand_more'" />
      </div>
      <div v-if="personal" class="tw-bg-[#FCF8EF] tw-rounded-[50px] tw-col-start-2 tw-col-end-5 tw-p-6">
        <div class="tw-text-xl">{{ $t('name') }}</div>
        <q-input color="dark" dense outlined :placeholder="userStore.userNative.name" />
        <div class="tw-text-xl">{{ $t('lastname') }}</div>
        <q-input color="dark" dense outlined :placeholder="userStore.userNative.lastName" />
        <div class="tw-text-xl">{{ $t('number') }}</div>
        <q-input color="dark" dense outlined :placeholder="userStore.userNative.phone" />
        <div class="tw-text-xl">{{ $t('email') }}</div>
        <q-input color="dark" dense outlined :placeholder="userStore.userNative.email" />
        <pets-button class="tw-mt-4" :label="$t('savebtn')"></pets-button>
      </div>
      <div
        class="tw-bg-[#FCF8EF] hover:tw-cursor-pointer tw-rounded-[50px] tw-col-start-2 tw-col-end-5 tw-h-[60px] tw-flex tw-items-center"
        @click="secret = !secret">
        <div class="tw-ml-6 tw-select-none">{{ $t('replpass') }}</div>
        <q-icon class="tw-ml-auto tw-mr-5" flat round :name="secret ? 'expand_less' : 'expand_more'" />
      </div>
      <div v-if="secret" class="tw-bg-[#FCF8EF] tw-rounded-[50px] tw-col-start-2 tw-col-end-5 tw-p-6">
        <div class="tw-text-xl">{{ $t('currpass') }}</div>
        <q-input type="password" color="dark" dense outlined />
        <div class="tw-text-xl">{{ $t('newpass') }}</div>
        <q-input type="password" color="dark" dense outlined />
        <pets-button class="tw-mt-4" :label="$t('savebtn')"></pets-button>
      </div>
      <div
        class="tw-bg-[#FCF8EF] hover:tw-cursor-pointer tw-rounded-[50px] tw-col-start-2 tw-col-end-5 tw-h-[60px] tw-flex tw-items-center"
        @click="accountDelete = !accountDelete">
        <div class="tw-ml-6 tw-select-none">{{ $t('delacc') }}</div>
        <q-icon class="tw-ml-auto tw-mr-5" flat round :name="accountDelete ? 'expand_less' : 'expand_more'" />
      </div>
      <div v-if="accountDelete" class="tw-bg-[#FCF8EF] tw-rounded-[50px] tw-col-start-2 tw-col-end-5 tw-p-6">
        <q-btn
          size="lg"
          :label="$t('delacc')"
          rounded
          no-caps
          @click="onAccountDeleteClick"
          class="tw-bg-red-500 tw-text-white tw-font-medium" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import NavigationPanel from "../components/navigation-panel.vue";
import PetsButton from "../components/pets-button.vue";
import { useUserStore } from "../stores/userStore";

const $q = useQuasar();
const userStore = useUserStore();

const personal = ref(false);
const secret = ref(false);
const accountDelete = ref(false);

const onAccountDeleteClick = () => {
  $q.dialog({ title: "Система", message: "Вы действительно хотите удалить свой аккаунт?", cancel: "Отмена" }).onOk(() =>
    userStore.deleteAccount(),
  );
};
</script>
