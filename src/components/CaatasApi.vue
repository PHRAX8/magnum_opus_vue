<template>
  <div>
    <h1>Cat as a Service</h1>
    <img :src="catImageUrl" alt="Random Cat" class="cat-image" />
    <div>
      <button @click="likeCat">Like</button>
      <button @click="dislikeCat">Dislike</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, push } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/main';

// Initialize Firebase app
initializeApp(firebaseConfig);

const auth = getAuth(); 
const database = getDatabase(); 

export default {

  data() {
    return {
      catImageUrl: "",
    };
  },
  methods: {
    async getNewCat() {
      try {
        // Fetch a random cat from the API
        const response = await axios.get(
          `https://cataas.com/api/cats?limit=${this.getRandomValue()}&skip=${this.getRandomValue()}`
        );

        // Extract the first cat's ID
        const catId = response.data[0]._id;

        // Set the cat image URL
        this.catImageUrl = `https://cataas.com/cat/${catId}`;
      } catch (error) {
        console.error("Error fetching random cat:", error);
      }
    },
    likeCat() {
      this.saveUserInfo('LikedCats');
      this.getNewCat();
    },
    dislikeCat() {
      this.saveUserInfo('DislikedCats');
      this.getNewCat();
    },
    getRandomValue() {
      // Generate a random value for the API parameters
      return Math.floor(Math.random() * Math.floor(Math.random() * 1205));
    },
    async saveUserInfo(chosenDatabase) {
      // Get the current logged-in user
      const user = auth.currentUser;

      if (user) {
        // User is signed in.
        const userEmail = user.email;

        // Get a reference to the 'user_info' table
        const userTable = ref(database, chosenDatabase);

        // Push user information to the database
        push(userTable, {
          email: userEmail,
          imageId: this.catImageUrl.split('/').pop(), // Extract the catId from the image URL
        });

      } else {
        // No user is signed in.
        alert('No user is signed in.');
      }
    },
  },
  created() {
    // Call getNewCat when the component is created
    this.getNewCat();
  },
};
</script>

<style scoped>
/* Add your custom styles here */
.cat-image {
  max-width: 100%;
  max-height: 400px;
  object-fit: cover;
}
</style>
