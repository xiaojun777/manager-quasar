<template>
  <board-widget
    :title="innerPortlet.title"
    :titleshow="innerPortlet.titleshow"
    :bordershow="innerPortlet.bordershow"
    :bgcolor="innerPortlet.bgcolor"
    :titlecolor="innerPortlet.titlecolor"
    @edit="onPortletEdit"
    @delete="onPortletDelete"
    :editable="editable"
  >
    <div v-if="chartType" ref="echarts" id="echarts"></div>
  </board-widget>
  <portlet-editor
    v-model:title="innerPortlet.title"
    v-model:titleshow="innerPortlet.titleshow"
    @save="onEditorSave"
    @cancel="onEditorCancel"
    v-model:show="editorShow"
  >
    <q-select
      label="类型"
      v-model="chartType"
      stack-label
      emit-value
      map-options
      :options="this.getOptions()"
    />
    <pie-chart-editor
      v-if="chartType === 'pie'"
      v-model:options="options"
    ></pie-chart-editor>
    <bar-chart-editor
      v-else-if="chartType === 'bar'"
      v-model:options="options"
    ></bar-chart-editor>
    <line-chart-editor
      v-else-if="chartType === 'line'"
      v-model:options="options"
    ></line-chart-editor>
  </portlet-editor>
</template>

<script>
import { defineComponent } from 'vue'
import BoardWidget from './widget.vue'
import portletbase from '../mixins/portletbase'
import editorbase from '../mixins/editorbase'
import PortletEditor from './portleteditor.vue'
import * as echarts from 'echarts'
import PieChartEditor from './echarts/PieChart.vue'
import LineChartEditor from './echarts/LineChart.vue'
import BarChartEditor from './echarts/BarChart.vue'

const options = [
  {
    value: 'line',
    label: '折线图'
  },
  {
    value: 'bar',
    label: '柱状图'
  },
  {
    value: 'pie',
    label: '饼图'
  }
]

export default defineComponent({
  name: 'WidgetECharts',
  props: [],
  mixins: [portletbase, editorbase],
  components: {
    PieChartEditor,
    BarChartEditor,
    LineChartEditor,
    BoardWidget,
    PortletEditor
  },
  data: function () {
    return {
      model: false,
      chart: null,
      chartType: '',
      options:
        this.portlet.params.options !== void 0
          ? this.portlet.params.options
          : null
    }
  },
  watch: {
    options: {
      handler(val) {
        // this.portlet.params.options = val
        this.init()
      },
      deep: true
    }
  },
  emits: {
    delete: null
  },

  methods: {
    getOptions() {
      return options
    },
    onDelete() {
      this.$emit('delete', this.portlet.name)
    },
    init() {
      let lineChart = this.$refs['echarts']
      if (lineChart !== null) {
        echarts.dispose(lineChart)
        let theme = this.model ? 'dark' : 'light'
        lineChart = echarts.init(lineChart, theme)
        lineChart.setOption(this.options)
      }
    },
    onResize() {
      if (this.line_chart) {
        this.line_chart.resize()
      }
    }
  }
})
</script>

<style lang="sass" scoped>
#echarts
  background: #fff
  height: 300px
</style>
