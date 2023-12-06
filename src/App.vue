<template>
  <nav>
    <router-link to="/"> Home </router-link> |
    <router-link to="/feed"> Feed </router-link> |
    <router-link to="/register"> Register </router-link> |
    <router-link to="/sign-in"> Login </router-link> |
    <button @click="handleSignOut" v-if="isLoggedIn">Sign Out</button>
  </nav>
  <router-view />
</template>

<script>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  name: "App",
  setup() {
    const router = useRouter();
    const isLoggedIn = ref(false);
    let auth;

    onMounted(() => {
      auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        isLoggedIn.value = !!user; // Set isLoggedIn based on the presence of user
      });
    });

    const handleSignOut = () => {
      signOut(auth).then(() => {
        router.push("/");
      });
    };

    return {
      isLoggedIn,
      handleSignOut,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
