<template>
  <div>
    <q-card>
      <q-card-section class="text-h6"> Stacked Area Chart </q-card-section>
      <q-card-section>
        <div ref="areachart" id="areaChart" style="height: 250px"></div>
      </q-card-section>
      <q-resize-observer @resize="onResize" />
    </q-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AreaChart',
  props: ['dataOption'],
  data() {
    return {
      model: false,
      options: this.dataOption,
      area_chart: null
    }
  },
  // mounted() {
  //   // console.log('AreaChart mounted is comming', this.dataOption)
  //   this.init()
  // },
  watch: {
    '$q.dark.isActive': function () {
      this.init()
    },
    dataOption: {
      handler(newVal) {
        console.log('newVal: ', newVal)
        this.options = newVal
        this.init()
      }
    }
  },
  methods: {
    init() {
      let areaChart = document.getElementById('areaChart')
      // echarts.dispose(areaChart)
      let theme = this.model ? 'dark' : 'light'
      areaChart = echarts.init(areaChart, theme)
      // console.log('drawAreaChart: ', data.areaChartOptions)
      areaChart.setOption(this.options)
    },
    onResize() {
      if (this.area_chart) {
        this.area_chart.resize()
      }
    }
  }
})
</script>

<style scoped></style>
