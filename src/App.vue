<template>
  <!-- <router-view /> -->
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { defineComponent } from "vue";
import "./mock";

export default defineComponent({
  name: "App",
});
</script>
