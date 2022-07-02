<template>
  <row-dash-board boardid="users" editable> </row-dash-board>
</template>

<script>
import RowDashBoard from "src/components/dashboard/rowboard.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { RowDashBoard },
  //name: "AppDashBoard",
  data: function () {
    return {};
  },

  methods: function () {},
});
</script>
