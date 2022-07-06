<template>
  <div>{{ innerOptions }}</div>
  <div>{{ selectData }}</div>
  <div v-if="innerOptions">
    <q-checkbox
      v-model="innerOptions.xAxis[0].boundaryGap"
      label="X轴不平铺"
    ></q-checkbox>
    <q-select
      v-model="selectData"
      label="序列"
      stack-label
      emit-value
      map-options
      option-label="name"
      :options="innerOptions.series"
    >
    </q-select>
    <div class="row" v-if="selectData">
      <q-checkbox
        v-model="selectData.stack"
        true-value="Total"
        false-value="''"
        label="堆叠"
      />
      <q-checkbox v-model="selectData.smooth" label="平滑" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'

const stackOptions = ['Total', 'line']
export default defineComponent({
  name: 'LineChart',
  props: {
    options: Object
  },
  watch: {
    innerOptions: {
      handler(val) {
        console.log('innerOptions: ', val)
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
      innerOptions: this.options,
      selectData: null,
      allChecked: null
    }
  },
  computed: {},

  mounted: async function () {
    if (this.options == null) {
      let response = await this.getLineOptions()
      response.series.forEach((item, index) => {
        if (!item.name) {
          item.name = 'line ' + (index + 1)
        }
        item.type = 'line'
      })
      this.innerOptions = response
    }
  },
  methods: {
    async getLineOptions() {
      let response = await axios.get('echarts', {
        params: { board: 'line' }
      })
      return response.data
    },
    che() {
      console.log('item is comming ')
    },
    checkAll() {
      console.log('checkbox on click')
    }
  }
})
</script>

<style lang="sass" scoped></style>
