<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from "vue-router";
import {useI18n} from "vue-i18n";

// eslint-disable-next-line no-unused-vars
const { t } = useI18n({useScope: 'global'})
</script>
