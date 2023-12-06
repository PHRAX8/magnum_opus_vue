<template>
  <div>
    <h1>Create an Account</h1>
    <input type="text" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <button @click="register">Submit</button>
  </div>
</template>

<script>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  name: "UserRegister",
  props: {
    // You can define any props here if needed
  },
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();

    const register = async () => {
      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        console.log(userCredential.user);
        console.log("Successfully registered!");
        router.push("/feed");
      } catch (error) {
        console.error(error.code);
        alert(error.message);
      }
    };

    return {
      email,
      password,
      register,
    };
  },
};
</script>
