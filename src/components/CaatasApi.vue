<!-- src/components/CatComponent.vue -->
<template>
  <div>
    <h1>Cat as a Service</h1>
    <img :src="catImageUrl" alt="Random Cat" class="cat-image" />
    <div>
      <button @click="getNewCat">Get New Cat</button>
      <button @click="likeCat">Like</button>
      <button @click="dislikeCat">Dislike</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      catImageUrl: "",
      likedCats: [],
      dislikedCats: [],
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
      // Add the current cat URL to the likedCats array
      this.likedCats.push(this.catImageUrl);
      this.getNewCat();
    },
    dislikeCat() {
      // Add the current cat URL to the dislikedCats array
      this.dislikedCats.push(this.catImageUrl);
      this.getNewCat();
    },
    getRandomValue() {
      // Generate a random value for the API parameters
      return Math.floor(Math.random() * Math.floor(Math.random() * 1205));
    },
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
