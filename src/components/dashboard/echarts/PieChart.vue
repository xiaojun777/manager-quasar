<template>
  <div></div>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'PieChart',
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
      innerOptions: this.options !== void 0 ? this.options : null
    }
  },
  computed: {},

  mounted: async function () {
    if (this.options == null || this.options.series[0].type !== this.type) {
      this.innerOptions = await this.getPieOptions()
    }
  },
  methods: {
    async getPieOptions() {
      let response = await axios.get('echarts', {
        params: { board: this.type }
      })
      return response.data
    }
  }
})
</script>

<style lang="sass" scoped></style>
