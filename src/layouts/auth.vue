<template>
  <div class="flex my-5 mx-5 justify-between">
    <Avatar :size="72" />
    <SwitchMode />
  </div>
  <div>
    <slot />
  </div>
</template>
<script>
import SwitchMode from "../components/SwitchMode.vue";
import Avatar from "../components/Avatar.vue";

export default {
  components: { SwitchMode, Avatar },
};
</script>
