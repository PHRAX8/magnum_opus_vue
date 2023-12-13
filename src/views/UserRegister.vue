<template>
  <div class="cute-registration-form">
    <h1>Create an Account</h1>
    <input type="text" placeholder="Email" v-model="email" class="cute-input" />
    <input
      type="password"
      placeholder="Password"
      v-model="password"
      class="cute-input"
    />
    <button @click="register" class="cute-submit-button">Submit</button>
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
<style scoped>
/* Add your custom styles here */
.cute-registration-form {
  text-align: center;
  padding: 20px;
  background-color: #fdeada; /* Light yellow background */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow */
}

.cute-input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #f0f0f0; /* Light grey border */
  border-radius: 5px;
}

.cute-submit-button {
  background-color: #ffcdb2; /* Light peach color */
  color: #fff; /* White text color */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.cute-submit-button:hover {
  background-color: #ffad8f; /* Slightly darker peach on hover */
}
</style>
