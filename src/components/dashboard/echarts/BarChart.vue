<template>
  <div></div>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'BarChart',
  props: {
    options: Object,
    type: String
  },
  watch: {
    innerOptions: {
      handler(val) {
        this.$emit('update:options', val)
      },
      deep: true
    }
  },
  emits: {
    'update:options': null
  },
  data() {
    return {
      innerOptions: this.options
    }
  },
  computed: {},

  mounted: async function () {
    if (this.options === null || this.options.series[0].type !== this.type) {
      let response = await this.getBarOptions()
      this.innerOptions = response
    }
  },
  methods: {
    async getBarOptions() {
      let response = await axios.get('echarts', {
        params: { board: this.type }
      })
      return response.data
    }
  }
})
</script>

<style lang="sass" scoped></style>
