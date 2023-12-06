<template>
  <div>
    <h1>Sign In to an Account</h1>
    <input type="text" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <button @click="register">Submit</button>
  </div>
</template>

<script>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  name: "UserRegister",
  props: {
    // You can define any props here if needed
  },
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref();
    const router = useRouter();

    const register = async () => {
      try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        console.log(userCredential.user);
        console.log("Successfully signed in!");
        router.push("/feed");
      } catch (error) {
        console.error(error.code);
        errorMessage.value = "Invalid Email or Password";
      }
    };

    return {
      email,
      password,
      register,
      errorMessage,
    };
  },
};
</script>
