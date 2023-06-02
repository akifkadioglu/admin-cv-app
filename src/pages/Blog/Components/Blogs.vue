<template>
  <div class="flex items-center space-x-1 justify-center">
    <input
      type="text"
      v-model="search"
      class="focus:outline-none rounded-full bg-gray-300 my-5 w-64 px-3 py-1.5"
    />
    <button
      @click="searchBlogs"
      class="transition hover:bg-blue-200 rounded-full p-1.5"
    >
      <mdicon name="magnify" />
    </button>
  </div>
  <div>
    <CustomCard
      :title="item.title"
      :content="item.content"
      buttonText="Delete"
      @click="deleteByID(index, item.id)"
      v-for="(item, index) in blogs"
      :key="index"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
import { fetchFire } from "../../../firebase/functions";
import CustomCard from "../../../components/CustomCard.vue";
const search = ref("");
const blogs = ref([]);

const searchBlogs = async () => {
  let request = await fetchFire.getPostsByTitle("Blogs", search.value);

  blogs.value.push(...request);
};

const deleteByID = async (index, id) => {
  if (await fetchFire.deleteByID("Blogs", id)) {
    blogs.value.splice(index, 1);
  }
};
</script>
