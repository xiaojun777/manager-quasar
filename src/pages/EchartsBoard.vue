<template>
  <dash-board boardid="echarts" editable> </dash-board>
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
