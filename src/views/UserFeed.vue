<template>
  <div id="app" class="cute-app">
    <CaatasApi />
  </div>
</template>

<script>
import CaatasApi from "@/components/CaatasApi.vue";

export default {
  components: {
    CaatasApi,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.cute-app {
  background-color: #f8f8f8; /* Light background color */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow */
}
</style>
