<template>
  <q-table> </q-table>
</template>

<script>
import { defineComponent } from "vue";
import { icons } from "./icons";
export default defineComponent({
  name: "IconSelector",
  props: {},
  components: {},
  emits: {
    "update:selected": null,
  },
  data: function () {
    return {
      icons: icons,
    };
  },
  watch: {
    editorData(val) {
      this.$emit("update:selected", val);
    },
  },
  computed: {},
  methods: {},
});
</script>

<style></style>
