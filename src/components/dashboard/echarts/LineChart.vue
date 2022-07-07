<template>
  <div>{{ innerOptions }}</div>
  <div>{{ selectData }}</div>
  <div v-if="innerOptions">
    <q-toggle
      v-model="innerOptions.xAxis[0].boundaryGap"
      label="X轴铺满"
      color="primary"
      icon="fit_screen"
      keep-color
      :true-value="false"
      :false-value="true"
      checked-icon=""
    ></q-toggle>
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
      <q-toggle
        color="green"
        keep-color
        icon="hide_source"
        v-model="selectData.showSymbol"
        label="隐藏值"
      ></q-toggle>
      <q-toggle
        v-model="selectData.stack"
        true-value="Total"
        false-value="''"
        label="堆叠"
        color="orange"
        icon="stacked_bar_chart"
        keep-color
      />
      <q-toggle
        @input="disableTheLine"
        v-model="selectData.smooth"
        color="red"
        icon="swipe"
        keep-color
        label="平滑"
      />
      <q-toggle
        v-model="selectData.areaStyle"
        :true-value="Object"
        :false-value="null"
        color="pink"
        keep-color
        icon="area_chart"
        label="面积"
      />
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
      innerOptions: this.options,
      selectData: null,
      trueValue: true
      // isShow
    }
  },
  computed: {},

  mounted: async function () {
    console.log('line chart is mounted: ', this.options, this)
    if (this.options == null || this.options.series[0].type !== this.type) {
      let response = await this.getLineOptions()
      // 组装数据
      let legendArr = []
      response.series.forEach((item, index) => {
        if (!item.name) {
          item.name = 'line ' + (index + 1)
        }
        legendArr.push(item.name)
        item.type = 'line'
      })
      let legend = { data: legendArr }
      response.legend = legend
      this.innerOptions = response
    }
  },
  methods: {
    async getLineOptions() {
      let response = await axios.get('echarts', {
        params: { board: this.type }
      })
      return response.data
    }
  }
})
</script>

<style lang="sass" scoped></style>
