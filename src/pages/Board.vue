<template>
  <q-page class="flex">
    <dash-board>
    </dash-board>
  </q-page>
</template>

<script>
import DashBoard from 'src/components/dashboard/board.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { DashBoard },
  name: 'AppDashBoard',
  data: function () {
    return {}
  },

  methods: function () {

  }
})
</script>
