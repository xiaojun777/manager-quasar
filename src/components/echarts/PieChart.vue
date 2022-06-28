<template>
  <div>
    <q-card>
      <div>{{ colorData }}</div>
      <q-card-section class="text-h6"> Pie Chart </q-card-section>
      <q-card-section>
        <div ref="piechart" id="pieChart" style="height: 250px"></div>
      </q-card-section>
      <q-resize-observer @resize="onResize" />
    </q-card>
  </div>
</template>

<script>
// import * as echarts from "echarts";
import * as echarts from 'echarts'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'PieChart',
  props: ['options'],
  data() {
    return {
      model: false,
      pieOptions: this.options,
      pie_chart: null
    }
  },
  watch() {
    options: {
      deep: true, handle(val)
      {
        console.log('deep handle ')
        this.init()
      }
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    '$q.dark.isActive': function () {
      this.init()
    }
  },
  methods: {
    init() {
      let pieChart = document.getElementById('pieChart')
      echarts.dispose(pieChart)
      let theme = this.model ? 'dark' : 'light'
      this.pie_chart = echarts.init(pieChart, theme)
      this.pie_chart.setOption(this.pieOptions)
    },
    onResize() {
      if (this.pie_chart) {
        this.pie_chart.resize()
      }
    }
  }
})
</script>

<style scoped></style>
