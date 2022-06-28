<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="fit">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'MainLayout',

  components: {},

  data: function () {
    return {
      apps: []
    }
  },

  mounted: async function () {
    this.apps = await this.getApps()
  },

  methods: {
    getApps: async function () {
      let response = await axios.get('/apps')
      return response.data.apps
    },

    appClickHandler: function (app) {
      console.log(app)
    }
  },

  setup() {
    const leftDrawerOpen = ref(false)
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
