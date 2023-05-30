<template>
  <button
    @click="logout()"
    aria-label="dark-mode button"
    class="transition ease-in-out delay-50 hover:scale-125 duration-300"
  >
    <mdicon name="logout" />
  </button>
</template>
<script>
import { getAuth, signOut } from "firebase/auth";
import { routeName } from "./../router/routeName";
import { useRouter } from 'vue-router';


export default {
  setup() {
    const auth = getAuth();
    const router = useRouter();

    const logout = async () => {
      try {
        await signOut(auth);
        router.push({ name: routeName.LOGIN });
      } catch (error) {
        console.log(error)
      }
    };
    return {
      logout,
    };
  },
};
</script>
