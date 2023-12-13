<template>
  <div class="cute-signin-form">
    <h1>Sign In to an Account</h1>
    <input type="text" placeholder="Email" v-model="email" class="cute-input" />
    <input
      type="password"
      placeholder="Password"
      v-model="password"
      class="cute-input"
    />
    <p v-if="errorMessage" class="cute-error-message">{{ errorMessage }}</p>
    <button @click="signIn" class="cute-submit-button">Submit</button>
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

    const signIn = async () => {
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
      signIn,
      errorMessage,
    };
  },
};
</script>
<style scoped>
/* Add your custom styles here */
.cute-signin-form {
  text-align: center;
  padding: 20px;
  background-color: #bbe1fa; /* Light blue background */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow */
}

.cute-input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #d6e9f9; /* Light blue border */
  border-radius: 5px;
}

.cute-submit-button {
  background-color: #7fadef; /* Medium blue color */
  color: #fff; /* White text color */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.cute-submit-button:hover {
  background-color: #5c8cc1; /* Slightly darker blue on hover */
}

.cute-error-message {
  color: #ff4d4d; /* Red color for error messages */
}
</style>
