<template>
  <div class="cute-search-container">
    <h1>Cat Search</h1>
    <div class="search-section">
      <label for="tagSearch">Search by Tag:</label>
      <input
        type="text"
        id="tagSearch"
        v-model="searchTag"
        @input="handleTagSearch"
        @focus="showSuggestions"
        placeholder="Enter a tag..."
      />
      <ul
        v-if="showSuggestionsFlag && tagSuggestions.length > 0"
        class="tag-suggestions"
      >
        <li
          v-for="suggestion in tagSuggestions"
          :key="suggestion"
          @click="selectTag(suggestion)"
        >
          {{ suggestion }}
        </li>
      </ul>
    </div>
    <div v-if="catImages.length > 0">
      <h2>Search Results</h2>
      <div class="cute-cat-images">
        <img
          v-for="catId in catImages"
          :key="catId"
          :src="`https://cataas.com/cat/${catId}`"
          alt="Cat"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchTag: "",
      tagSuggestions: [],
      catImages: [],
      showSuggestionsFlag: false,
    };
  },
  methods: {
    async handleTagSearch() {
      this.showSuggestionsFlag = true;

      if (this.searchTag.trim() === "") {
        this.tagSuggestions = [];
        this.catImages = []; // Clear previous search results when the input is empty
        return;
      }

      try {
        const response = await axios.get("https://cataas.com/api/tags");
        const allTags = response.data;
        this.tagSuggestions = allTags.filter((tag) =>
          tag.toLowerCase().includes(this.searchTag.toLowerCase())
        );

        // Fetch images each time the tag changes
        await this.fetchCatImages();
      } catch (error) {
        console.error("Error fetching tag suggestions:", error);
      }
    },
    async selectTag(tag) {
      this.searchTag = tag;
      this.showSuggestionsFlag = false;

      // Fetch images when selecting a tag
      await this.fetchCatImages();
    },
    showSuggestions() {
      this.showSuggestionsFlag = true;
    },
    async fetchCatImages() {
      try {
        const response = await axios.get(`https://cataas.com/api/cats`, {
          params: {
            tags: this.searchTag,
            skip: 0,
            limit: 10, // Set the limit to 10
          },
        });
        this.catImages = response.data.map((cat) => cat._id);
      } catch (error) {
        console.error("Error fetching cat images by tag:", error);
      }
    },
  },
};
</script>

<style scoped>
.cute-search-container {
  text-align: center;
  padding: 20px;
  background-color: #fdeada; /* Light yellow background */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow */
}

.search-section {
  margin-top: 20px;
}

.tag-suggestions {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #f0f0f0; /* Light grey border */
  border-top: none;
  border-radius: 0 0 8px 8px; /* Rounded bottom corners */
}

.tag-suggestions li {
  padding: 8px;
  cursor: pointer;
  border-top: 1px solid #f0f0f0; /* Light grey border */
}

.tag-suggestions li:hover {
  background-color: #f9f9f9; /* Light grey background on hover */
}

.cute-cat-images {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.cute-cat-images img {
  max-width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Soft shadow */
}
</style>
