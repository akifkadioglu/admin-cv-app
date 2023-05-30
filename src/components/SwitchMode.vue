<script setup>
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <button
    @click="toggleDark()"
    aria-label="dark-mode button"
    class="transition ease-in-out delay-50 hover:scale-125 duration-300"
  >
    <mdicon name="white-balance-sunny" class="dark:text-orange-300" />
  </button>
</template>
