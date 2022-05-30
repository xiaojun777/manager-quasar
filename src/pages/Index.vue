<template>
  <q-page class="flex">
    <app-framework appid='users' :rows-per-page="5">
    </app-framework>
  </q-page>
</template>

<script>
import AppFramework from 'src/components/AppFramework.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { AppFramework },
  name: 'PageIndex',
  data: function () {
    return {}
  },

  methods: function () {

  }
})
</script>
