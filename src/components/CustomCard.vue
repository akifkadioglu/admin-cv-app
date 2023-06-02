<template>
  <div
    class="transition cursor-pointer col-span-1 bg-white hover:bg-neutral-100 mb-10 dark:bg-neutral-800 dark:hover:bg-neutral-950 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-sm"
  >
    <h3
      class="font-mono capitalize text-slate-900 dark:text-white text-base font-medium tracking-tight"
    >
      {{ title }}
    </h3>
    
    <div
      v-html="content"
      class="line-clamp-2 font-mono text-slate-500 dark:text-slate-400 mt-2 text-sm"
    ></div>
    <div class="flex justify-end mt-5">
      <button
        :aria-label="buttonText + 'button'"
        @click="click"
        class="rounded-full bg-zinc-200 dark:bg-zinc-700 px-6 py-1"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    buttonText: {
      type: String,
      default: "",
    },
    click: {
      type: Function,
    },
  },
};
</script>
