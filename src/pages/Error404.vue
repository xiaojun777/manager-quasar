<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 30vh">404</div>
      <div>{{ count }}</div>

      <div class="text-h2" style="opacity: 0.4">Oops. Nothing here...</div>

      <q-btn @click="add">gotoE-charts</q-btn>
      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Error404',
  data() {
    return {
      count: ['orange']
    }
  },
  methods: {
    add() {
      // this.count.push('white')
      this.$router.push({ path: '/echarts' })
    }
  }
})
</script>
