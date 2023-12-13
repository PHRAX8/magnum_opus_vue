<template>
    <div>
      <h2>Your Liked Cats</h2>
      <div v-if="userImageIds.length === 0">No liked cats yet.</div>
      <div v-else>
        <img
          v-for="(imageId, index) in userImageIds"
          :key="index"
          :src="`https://cataas.com/cat/${imageId}`"
          :alt="'Liked Cat ' + (index + 1)"
          class="liked-cat-image"
        />
      </div>
    </div>
  </template>
  
  <script>
  import { ref, getDatabase, query, orderByChild, equalTo, onValue } from 'firebase/database';
  import { getAuth } from 'firebase/auth';
  
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
  
          // Get a reference to the 'user_info' table
          const userTable = ref(getDatabase(), 'LikedCats');
  
          // Query to get imageIds for the current user
          const userQuery = query(
            userTable,
            orderByChild('email'),
            equalTo(userEmail)
          );
  
          // Listen for changes in the data
          onValue(userQuery, (snapshot) => {
            this.userImageIds = []; // Clear previous data
  
            snapshot.forEach((childSnapshot) => {
              const userData = childSnapshot.val();
              this.userImageIds.push(userData.imageId);
            });
          });
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  .liked-cat-image {
    max-width: 100%;
    max-height: 200px; /* Adjust the height as needed */
    margin: 5px;
  }
  </style>
  