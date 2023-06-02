<template>
  <div class="flex my-5 mx-5 justify-center">
    <Avatar :size="120" />
  </div>
  <div class="flex justify-center my-5">
    <div class="transition duration-300 font-mono text-2xl hover:underline">
      Akif Kadioglu
    </div>
  </div>
  <div>
    <slot />
  </div>
</template>
<script>
import Avatar from "../components/Avatar.vue";

export default {
  components: { Avatar },
};
</script>
