<template>
  <div class="flex my-5 mx-5 items-center justify-end">
    <LogoutButton />
  </div>
  <div class="flex mt-10 space-x-5 justify-start">
    <button
      v-for="(item, index) in pages"
      :key="index"
      @click="$router.push({ name: item })"
      class="transition  px-5 py-1 rounded-full hover:bg-blue-200 text-blue-950 font-bold text-lg"
    >
      {{ item }}
    </button>
  </div>
  <DividerContent :text="currentPage" />
  <div>
    <slot />
  </div>
</template>
<script>
import LogoutButton from "../components/LogoutButton.vue";
import DividerContent from "../components/DividerContent.vue";

export default {
  mounted() {
    this.currentPage = this.$route.name;
  },
  data() {
    return {
      currentPage: "",
      pages: ["Blog", "Type"],
    };
  },
  watch: {
    "$route.name"(newp, oldp) {
      this.currentPage = newp;
    },
  },
  components: { LogoutButton, DividerContent },
};
</script>
