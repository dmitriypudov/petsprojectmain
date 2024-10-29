<template xmlns="http://www.w3.org/1999/html">
  <div class="tw-bg-gradient-to-br tw-from-[#F4CB38] tw-to-[#F4A938] tw-min-h-[905px]">
    <navigation-panel class="tw-pt-8"></navigation-panel>
    <div>
      <div class="lozung tw-flex tw-justify-center" v-html="$t('lozung')"></div>
      <div class="lozung2 tw-flex tw-justify-center" v-html="$t('lozung2')"></div>
      <div class="btn">
        <q-btn class="btn-submit" :label="$t('crads')" to="/createitem" />
      </div>
      <div class="tw-flex tw-justify-center">
        <q-img src="animals+ellipse5.png" class="img tw-w-[1060px] tw-h-[850px]" />
      </div>
      <div>
      </div>
    </div>
  </div>
  <ads-info class="tw-my-24"></ads-info>
  <ads></ads>
  <footer class="footer">
    <div class="buttons">
      <q-btn class="footer-txt" :label="$t('crads')" to="/createitem"/>
      <q-btn class="footer-txt" :label="$t('О нас')"/>
      <q-btn class="footer-txt" :label="$t('Контакты')"/>
      <q-btn class="footer-txt" :label="$t('Отзывы')"/>
      <q-btn class="footer-txt" :label="$t('Свяжитесь с нами')"/>
    </div>
    <div class="logos">
      <img src="inst.png" alt="Dog" class="dog-image" />
      <img src="vk.png" alt="Dog" class="dog-image" />
      <img src="gmail.png" alt="Dog" class="dog-image" />
      <img src="whatsapp.png" alt="Dog" class="dog-image" />
    </div>
    <div class="logofooter">
    <q-img src="logofooter.png" no-spinner class="tw-w-[64px] tw-h-[64px]" />
      <span class="tw-ml-4 tw-font-mont tw-text-2xl tw-font-bold tw-tracking-[10.8px] tw-uppercase">Pets</span>
    </div>
  </footer>
</template>

<script setup>
import {useI18n} from "vue-i18n";
const { t, locale } = useI18n({useScope: "global"})
const switchLang = () => {
  locale.value === 'en' ? locale.value = 'ru' : locale.value = 'en'
  localStorage.setItem('lang', locale.value)
  console.log(locale.value);
}
import NavigationPanel from "../components/navigation-panel.vue";
import AdsInfo from "@/components/ads-info.vue";
import Ads from "@/components/ads.vue";
import PetsButton from "@/components/pets-button.vue";
</script>

<style scoped>

.btn{
  margin-left: -263px;
  margin-top: -132px;
  display: flex;
  justify-content: center;
}
.lozung {
  color: #000;
  font-family: Montserrat;
  font-size: 36px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  margin-right: 550px;
  margin-top: 150px;
}

.lozung2 {
  color: #000;
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-right: 887px;
}

.btn-submit {
  text-transform: initial;
  color: #ffffff;
  font-family: Montserrat;
  font-weight: 900;
  width: 420px;
  height: 89.564px;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  background: #ff5700;
  box-shadow: 0px 7px 35px 0px rgb(255, 87, 0);
  margin-right: 550px;
  margin-top: 150px;
}

.img {
  margin-right: -843px;
  margin-top: -400px;
}

.footer {
  background-image: url('public/dog-image.png');
  background-repeat: no-repeat;
  background-size: cover;
  position: bottom;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1000px;
}

.dog-image {
  margin-top: 200px;
  display: inline-block; /* или display: inline; */
  margin-right: 10px; /* добавьте отступ между изображениями, если необходимо */
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.buttons {
  margin-bottom: 563px;
  margin-left: -824px;
  color: white;
}

.dog-image {
  width: 30px; /* задайте нужную ширину для логотипов */
  margin-right: 10px; /* добавьте отступ между логотипами, если необходимо */
}

.logofooter {
  margin-right: 1550px;
  color: white;
}

</style>
