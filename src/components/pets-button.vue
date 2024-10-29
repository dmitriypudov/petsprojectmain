<template>
  <q-btn
    :label="label"
    @click="$emit('click')"
    size="lg"
    rounded
    no-caps
    class="tw-bg-gradient-to-r tw-from-[#FFE500] tw-to-[#FFEB3E] tw-font-medium tw-font-mont" />
</template>

<script setup>
defineProps({
  label: String,
});

defineEmits(["click"]);
</script>
