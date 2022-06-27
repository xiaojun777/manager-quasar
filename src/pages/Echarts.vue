<template>
  <q-page class="">
    <div class="row q-col-gutter-sm q-ml-xs q-mr-sm q-py-sm">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <line-chart></line-chart>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <bar-chart> </bar-chart>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <pie-chart></pie-chart>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <scatter-chart></scatter-chart>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <dotted-bar-chart></dotted-bar-chart>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <guage-chart></guage-chart>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <boxplot></boxplot>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <area-chart></area-chart>
      </div>
      <q-input disable rounded v-model="colorColor" type="text"></q-input>
    </div>
  </q-page>
</template>

<script>
import LineChart from 'src/components/echarts/LineChart'
import Boxplot from 'src/components/echarts/BoxChart'
import PieChart from 'src/components/echarts/PieChart'
import ScatterChart from 'src/components/echarts/ScatterChart'
import DottedBarChart from 'src/components/echarts/DottedBarChart'
import GuageChart from 'src/components/echarts/GuageChart'
import BarChart from 'src/components/echarts/BarChart'
import AreaChart from 'src/components/echarts/AreaChart'
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    LineChart,
    BarChart,
    AreaChart,
    GuageChart,
    Boxplot,
    PieChart,
    ScatterChart,
    DottedBarChart
  },
  name: 'Echarts',
  data: function () {
    return {}
  },

  methods: function () {}
})
</script>
