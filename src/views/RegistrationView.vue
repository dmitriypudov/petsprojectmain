<template>
  <div class="tw-bg-gradient-to-br tw-from-[#F4CB38] tw-to-[#F4A938] tw-h-screen tw-flex tw-justify-center">
    <div class="tw-flex tw-flex-col tw-justify-center tw-font-mont">
      <div class="tw-text-4xl tw-font-black tw-text-center tw-mb-8">{{ $t('reg') }}</div>
      <div class="tw-bg-[#FCF8EF] tw-w-[567px] tw-px-14 tw-py-8 tw-rounded-[50px]">
        <div class="tw-text-xl">{{ $t('email') }}</div>
        <q-input dense class="tw-bg-slate-200" outlined color="dark" v-model="email" />

        <div class="tw-text-xl">{{ $t('number') }}</div>
        <q-input dense class="tw-bg-slate-200" outlined color="dark" v-model="phone" />

        <div class="tw-text-xl">{{ $t('name') }}</div>
        <q-input dense class="tw-bg-slate-200" outlined color="dark" v-model="name" />

        <div class="tw-text-xl">{{ $t('lastname') }}</div>
        <q-input dense class="tw-bg-slate-200" outlined color="dark" v-model="lastName" />

        <div class="tw-text-xl">{{ $t('pass') }}</div>
        <q-input v-model="password" dense class="tw-bg-slate-200" outlined color="dark" :type="isPwd ? 'password' : 'text'">
          <template v-slot:append>
            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
          </template>
        </q-input>

        <div class="tw-pt-6 tw-text-xl tw-flex">
          <div>{{ $t('alprofile') }}</div>
          <router-link class="tw-ml-auto tw-text-red-500" to="/login">{{ $t('buttonlog') }}</router-link>
        </div>

        <div class="tw-pt-6">{{ $t('byregist') }}</div>

        <div class="tw-flex tw-justify-center tw-mt-8">
          <pets-button :label="$t('reg')" @click="createAccount"></pets-button>
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
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useUserStore } from "../stores/userStore";
import PetsButton from "../components/pets-button.vue";
import { User } from "../class/User.js";

const name = ref(null);
const lastName = ref(null);
const phone = ref(null);
const email = ref(null);
const password = ref(null);
const isPwd = ref(true);

const userStore = useUserStore();
const router = useRouter();
const $q = useQuasar();

const createAccount = async () => {
  $q.loading.show();

  const authCreation = await userStore.createUser(email.value, password.value);
  $q.loading.hide();

  if (authCreation !== true) {
    $q.dialog({
      title: "Error",
      message: authCreation,
    });
  } else {
    let user = new User();
    user.name = name.value;
    user.lastName = lastName.value;
    user.email = email.value;
    user.phone = phone.value;
    user.auth = userStore.getUserId();

    await user.create();
    router.push({ name: "home" });
  }
};
</script>
