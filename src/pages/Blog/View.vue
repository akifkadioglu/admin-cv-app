<template>
  <div>
    <CreateBlog />
    <Blogs />
  </div>
</template>

<script>
import CreateBlog from "./Components/CreateBlog.vue";
import Blogs from "./Components/Blogs.vue";
export default {
  components: {
    CreateBlog,
    Blogs,
  },
};
</script>
