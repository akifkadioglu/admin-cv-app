<template>
  <div>
    <div class="container mx-auto mt-10 px-3">
      <router-view v-slot="{ Component, route }">
        <component :is="$route.meta.layout">
          <div :key="route.name">
            <component :is="Component" />
          </div>
        </component>
      </router-view>
    </div>
  </div>
</template>
<script>
export default {};
</script>
