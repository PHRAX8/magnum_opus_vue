<template>
  <div class="cute-cat-container">
    <h1>Random Cat</h1>
    <div class="cute-image-container">
      <img
        :src="catImageUrl"
        alt="Random Cute Cat"
        class="cute-cat-image"
        @load="imageLoaded"
      />
      <div v-if="loading" class="cute-loading-overlay">
        <div class="cute-loading-circle"></div>
      </div>
      <div v-if="imageLoaded && !loading" class="cute-button-container">
        <button @click="likeCat" class="cute-heart-button" title="Like">
          ❤️
        </button>
        <button
          @click="dislikeCat"
          class="cute-broken-heart-button"
          title="Dislike"
        >
          💔
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, push } from "firebase/database";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/main";

initializeApp(firebaseConfig);

const auth = getAuth();
const database = getDatabase();

export default {
  data() {
    return {
      catImageUrl: "",
      loading: true,
    };
  },
  methods: {
    async getNewCat() {
      try {
        const response = await axios.get(
          `https://cataas.com/api/cats?limit=${this.getRandomValue()}&skip=${this.getRandomValue()}`
        );

        const catId = response.data[0]._id;
        this.catImageUrl = `https://cataas.com/cat/${catId}`;
      } catch (error) {
        console.error("Error fetching random cat:", error);
      }
    },
    async likeCat() {
      await this.saveUserInfo("LikedCats");
    },
    async dislikeCat() {
      await this.saveUserInfo("DislikedCats");
    },
    getRandomValue() {
      return Math.floor(Math.random() * Math.floor(Math.random() * 1205));
    },
    async saveUserInfo(chosenDatabase) {
      const user = auth.currentUser;

      if (user) {
        const userEmail = user.email;
        const userTable = ref(database, chosenDatabase);

        push(userTable, {
          email: userEmail,
          imageId: this.catImageUrl.split("/").pop(),
        });
      } else {
        alert("No user is signed in.");
      }
      this.getNewCat();
    },
    imageLoaded() {
      this.loading = false;
    },
  },
  created() {
    this.getNewCat();
  },
};
</script>

<style scoped>
.cute-cat-container {
  text-align: center;
}

.cute-image-container {
  position: relative;
  background-color: #fce3e3; /* Pastel pink background */
  padding: 10px;
  border-radius: 10px;
}

.cute-cat-image {
  max-width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow */
}

.cute-loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cute-loading-circle {
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

.cute-button-container {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.cute-heart-button,
.cute-broken-heart-button {
  font-size: 24px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  background: #ffccd4; /* Light pink background */
  border: none;
  transition: background 0.3s ease;
}

.cute-heart-button:hover,
.cute-broken-heart-button:hover {
  background: #ffb3bd; /* Slightly darker pink on hover */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
