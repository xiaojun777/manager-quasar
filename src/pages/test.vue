<template>
  <q-page class="row no-wrap column">
    <icon-selector></icon-selector>
  </q-page>
</template>
<script>
import { defineComponent } from "vue";
import IconSelector from "src/components/base/iconselector.vue";

export default defineComponent({
  name: "simple",
  order: 0,
  components: {
    IconSelector,
  },
  data: function () {
    return {};
  },
  mounted: function () {
  },
  computed: {},
  methods: {},
});
</script>
