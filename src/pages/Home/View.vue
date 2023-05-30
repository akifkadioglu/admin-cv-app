<template>
  <div class="flex justify-center">
    <form class="w-full max-w-lg">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-2/3 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Title
          </label>
          <input
            class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
            id="grid-first-name"
            type="text"
            v-model="title"
            placeholder="Title"
          />
        </div>
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-state"
          >
            Tag
          </label>
          <div class="relative">
            <select
              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none"
              id="grid-state"
              v-model="type_id"
            >
              <option
                v-for="(item, index) in types"
                :key="index"
                :value="item.id"
              >
                {{ item.type }}
              </option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-password"
          >
            Content
          </label>
          <textarea
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
            id="grid-password"
            placeholder="Write content here"
            v-model="content"
          />
        </div>
      </div>
      <div v-if="loading" class="flex justify-center my-5">
        <div class="w-7 h-7 border-2 border-gray-300 animate-spin"></div>
      </div>
      <button
        v-else
        @click="createBlog()"
        class="shadow w-full font-bold py-2 px-4 rounded"
        type="button"
      >
        Create
      </button>
    </form>
  </div>
</template>
<script>
import { getAuth } from "firebase/auth";
import { onMounted, ref } from "vue";
import { collection, addDoc, query, doc, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/config";

export default {
  setup() {
    onMounted(() => {
      getTypes();
    });

    const user = getAuth().currentUser;
    const types = ref([]);
    const type_id = ref();
    const title = ref("");
    const content = ref("");
    const loading = ref(false);

    const createBlog = async () => {
      loading.value = true;
      const typeRef = doc(collection(firestore, "Types"), type_id.value);
      var now = new Date();

      const data = {
        title: title.value,
        content: content.value,
        created_at: now,
        type: typeRef,
      };
      await addDoc(collection(firestore, "Blogs"), data).then((x) => {
        title.value = "";
        content.value = "";
      });
      loading.value = false;
    };

    const getTypes = async () => {
      const postQuery = query(collection(firestore, "Types"));
      const postSnapshot = await getDocs(postQuery);
      const posts = [];
      postSnapshot.forEach((postDoc) => {
        posts.push({ id: postDoc.id, ...postDoc.data() });
      });
      types.value = posts;
      type_id.value = posts[0].id;
    };

    return {
      user,
      types,
      type_id,
      title,
      content,
      loading,
      createBlog,
    };
  },
};
</script>
