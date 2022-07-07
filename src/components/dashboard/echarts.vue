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
      :options="getOptions()"
    />
    <q-select
      label="主题"
      v-model="theme"
      v-if="options"
      :options="getThemeOptions()"
      option-value="label"
      map-options
    ></q-select>

    <pie-chart-editor
      v-if="chartType === 'pie'"
      v-model:options="options"
      :type="chartType"
    ></pie-chart-editor>
    <bar-chart-editor
      v-else-if="chartType === 'bar'"
      v-model:options="options"
      :type="chartType"
    ></bar-chart-editor>
    <line-chart-editor
      v-else-if="chartType === 'line'"
      v-model:options="options"
      :type="chartType"
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
import wonderlandTheme from '../../mock/pages/theme/wonderlandTheme.json'
import primaryTheme from '../../mock/pages/theme/primaryTheme.json'
import waldenTheme from '../../mock/pages/theme/waldenTheme.json'

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
const themeOptions = [
  { label: 'dark' },
  { label: 'light' },
  { label: 'vintage', value: wonderlandTheme },
  { label: 'waldenTheme', value: waldenTheme },
  { label: 'primaryTheme', value: primaryTheme }
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
      chart: null,
      chartType: '',
      theme: { label: 'light' },
      options:
        this.portlet.params.options !== void 0
          ? this.portlet.params.options
          : null
    }
  },
  watch: {
    options: {
      handler() {
        this.init()
      },
      deep: true
    },
    theme: {
      handler(val) {
        if (val.label !== 'dark' && val.label !== 'light') {
          echarts.registerTheme(val.label, val.value)
        }
        this.init()
      }
    }
    // dataChange: {
    //   handle(val) {
    //     console.log(val)
    //     if (val.theme.label !== 'dark' && val.theme.label !== 'light') {
    //       echarts.registerTheme(val.theme.label, val.theme.value)
    //     }
    //     this.init()
    //   },
    //   deep: true
    // }
  },
  computed: {
    dataChange() {
      const { options, theme } = this
      return { options, theme }
    }
  },
  emits: {
    delete: null
  },
  mounted() {},
  methods: {
    getOptions() {
      return options
    },
    getThemeOptions() {
      return themeOptions
    },
    onDelete() {
      this.$emit('delete', this.portlet.name)
    },
    init() {
      let lineChart = this.$refs['echarts']
      if (lineChart !== null) {
        echarts.dispose(lineChart)
        lineChart = echarts.init(lineChart, this.theme.label)
        lineChart.setOption(this.options)
      }
    },
    onResize() {
      if (this.chart) {
        this.chart.resize()
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
