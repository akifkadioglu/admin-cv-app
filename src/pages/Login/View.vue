<template>
  <div
    class="flex flex-col items-center justify-center px-6 py-8 mx-auto my-10 lg:py-0"
  >
    <div
      class="w-full bg-white mb-10 md:mt-0 sm:max-w-md xl:p-0 rounded-lg ring-1 ring-slate-900/5 shadow-sm"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl"
        >
          Login
        </h1>
        <div class="space-y-4">
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              v-model="email"
              type="email"
              name="email"
              id="email"
              class="bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              placeholder="name@company.com"
              required=""
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              v-model="password"
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              class="bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              required=""
            />
          </div>
          <div v-if="loading" class="flex justify-center my-5">
            <div class="w-7 h-7 border-2 border-gray-300 animate-spin"></div>
          </div>
          <button
            v-else
            @click="signIn"
            class="w-full text-white bg-blue-900 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { routeName } from "../../router/routeName";
const email = ref("");
const password = ref("");
var loading = ref(false);
const router = useRouter();

const signIn = async () => {
  loading.value = true;
  const auth = getAuth();
  await signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      router.push({ name: routeName.HOME });
    })
    .catch((err) => {});
  loading.value = false;
};
</script>
