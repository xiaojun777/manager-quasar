<template>
  <dash-board boardid="users"> </dash-board>
</template>

<script>
import DashBoard from "src/components/dashboard/colboard.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { DashBoard },
  //name: "AppDashBoard",
  data: function () {
    return {};
  },

  methods: function () {},
});
</script>
