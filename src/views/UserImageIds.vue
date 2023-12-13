<template>
  <div class="cute-liked-cats">
    <h2>Your Beloved Cats</h2>
    <div v-if="userImageIds.length === 0">No one is here yet.</div>
    <div v-else>
      <div
        v-for="(imageId, index) in userImageIds"
        :key="index"
        class="cute-liked-cat-container"
      >
        <img
          :src="`https://cataas.com/cat/${imageId.imageId}`"
          :alt="'Liked Cat ' + (index + 1)"
          class="cute-liked-cat-image"
        />
        <button
          @click="unlikeCat(imageId.key)"
          class="cute-delete-button"
          title="Unlike"
        >
          💔
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref,
  getDatabase,
  query,
  orderByChild,
  equalTo,
  onValue,
  remove,
  child,
} from "firebase/database";
import { getAuth } from "firebase/auth";

export default {
  data() {
    return {
      userImageIds: [],
    };
  },
  mounted() {
    // Load user image IDs when the component is mounted
    this.loadUserImageIds();
  },
  methods: {
    loadUserImageIds() {
      // Get the current logged-in user
      const user = getAuth().currentUser;

      if (user) {
        // User is signed in.
        const userEmail = user.email;

        // Get a reference to the 'LikedCats' table
        const userTable = ref(getDatabase(), "LikedCats");

        // Query to get imageIds for the current user
        const userQuery = query(
          userTable,
          orderByChild("email"),
          equalTo(userEmail)
        );

        // Listen for changes in the data
        onValue(userQuery, (snapshot) => {
          this.userImageIds = []; // Clear previous data

          snapshot.forEach((childSnapshot) => {
            const userData = childSnapshot.val();
            this.userImageIds.push({
              imageId: userData.imageId,
              key: childSnapshot.key,
            });
          });
        });
      }
    },
    unlikeCat(key) {
      const user = getAuth().currentUser;
      if (user) {
        // Get a reference to the specific entry using 'child'
        const userTable = ref(getDatabase(), "LikedCats");
        const entryRef = child(userTable, key);

        // Remove the liked cat entry
        remove(entryRef);
      }
    },
  },
};
</script>

<style scoped>
/* Add your custom styles here */
.cute-liked-cats {
  text-align: center;
  padding: 20px;
  background-color: #f8f8f8; /* Light grey background */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow */
}

.cute-liked-cat-container {
  position: relative;
  display: inline-block;
  margin: 10px;
}

.cute-liked-cat-image {
  max-width: 100%;
  max-height: 200px; /* Adjust the height as needed */
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Soft shadow */
}

.cute-delete-button {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #ff4d4d; /* Red color for the broken heart emoji */
}

.cute-delete-button:hover {
  color: #ff1a1a; /* Darker red on hover */
}
</style>
