<template>
    <div class="cute-home">
      <div class="cute-overlay">
        <h1>Welcome to Catopia</h1>
      </div>
    </div>
  </template>
  
  <style scoped>
  /* Add your custom styles here */
  .cute-home {
    height: 100vh;
    background-image: url('../assets/KittenBackground.jpeg'); /* Replace with the actual path to your image */
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .cute-overlay {
    text-align: center;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.8); /* Semi-transparent white background */
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow */
  }
  
  .cute-overlay h1 {
    margin: 0;
    font-size: 36px;
    color: #2c3e50; /* Dark grey text color */
  }
  </style>
  