<template>
  <board-widget :title="title" @edit="onEdit">
    <div v-html="html"></div>
  </board-widget>
</template>

<script>
import { defineComponent } from "vue";
import BoardWidget from "./widget.vue";

export default defineComponent({
  name: "WidgetHtml",
  props: ["title", "html"],
  components: {
    BoardWidget
  },
  data: function () {
    return {};
  },
  methods: {
    onEdit () {
      console.log('on edit...');
    }
  }
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
