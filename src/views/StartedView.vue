<script setup>
import TheStart from "../components/TheStart.vue";
</script>

<template>
  <main>
    <TheStart />
  </main>
</template>

<script>
export default {
  name: "Started",
  created() {
    document.body.style.backgroundColor = "#77BB3F";
  },
};
</script>

