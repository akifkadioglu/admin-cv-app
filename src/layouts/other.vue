<template>
  <div class="flex my-5 mx-5 items-center justify-between">
    <Avatar :size="72" />
    <div class="flex space-x-5">
      <LogoutButton />
      <SwitchMode />
    </div>
  </div>
  <div>
    <slot />
  </div>
</template>
<script>
import Avatar from "../components/Avatar.vue";
import LogoutButton from "../components/LogoutButton.vue";
import SwitchMode from "../components/SwitchMode.vue";
export default {
  components: { SwitchMode, Avatar, LogoutButton },
};
</script>
