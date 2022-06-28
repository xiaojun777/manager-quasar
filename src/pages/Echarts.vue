<template>
  <q-btn @click="someThingIsChanging">change</q-btn>
  <q-page>
    <div class="row q-col-gutter-sm q-ml-xs q-mr-sm q-py-sm">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <line-chart :colorData="color"></line-chart>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <bar-chart> </bar-chart>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <pie-chart :options="pieOptions"></pie-chart>
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
    return {
      color: ['orange', 'cyan', 'pink', 'green', 'blue'],
      pieOptions: {
        color: ['orange', 'cyan', 'pink', 'green', 'blue'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          top: 'bottom',
          bottom: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access source',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '35%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct access' },
              { value: 580, name: 'Email marketing' },
              { value: 484, name: 'Affiliate Advertising' },
              { value: 300, name: 'Video ad' }
            ]
          }
        ]
      }
    }
  },

  methods: {
    someThingIsChanging() {
      this.color = this.color.reverse()
      // console.log(this.color)
      this.pieOptions.color = this.color
    }
  }
})
</script>
