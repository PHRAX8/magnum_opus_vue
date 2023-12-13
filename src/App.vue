<template>
  <nav class="cute-navigation">
    <router-link to="/"> Home </router-link> |
    <router-link to="/feed"> Feed </router-link> |
    <router-link to="/favorites"> Favorites </router-link> |
    <router-link to="/search"> Search </router-link> |
    <router-link to="/register"> Register </router-link> |
    <router-link to="/sign-in"> Login </router-link> |
    <button
      @click="handleSignOut"
      v-if="isLoggedIn"
      class="cute-signout-button"
    >
      Sign Out
    </button>
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
.cute-navigation {
  background-color: #fcdede; /* Light pink background */
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow */
  margin-bottom: 20px;
}

.cute-navigation a {
  text-decoration: none;
  color: #6d5e78; /* Purple text color */
  margin-right: 10px;
  font-weight: bold;
  font-size: 14px;
}

.cute-signout-button {
  font-size: 14px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: #f49ac2; /* Lighter pink button background */
  color: #fff; /* White text color */
}

.cute-signout-button:hover {
  background-color: #d784a7; /* Slightly darker pink on hover */
}
</style>
