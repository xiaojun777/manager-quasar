<template>
  <board-widget
    :title="innerPortlet.title"
    :titleshow="innerPortlet.titleshow"
    @edit="onEdit"
    @delete="onDelete"
    :editable="editable"
  >
    <!-- <div ref="lineChart" id="lineChart" style="height: 250px"></div> -->
    <div v-if="chartType === 'pie'" :id="chartType">{{ chartType }}</div>
    <div v-else-if="chartType === 'line'" :id="chartType">{{ chartType }}</div>
  </board-widget>
  <portlet-editor
    v-model:title="innerPortlet.title"
    v-model:titleshow="innerPortlet.titleshow"
    @save="onEditorSave"
    @cancel="onEditorCancel"
    v-model:show="editorShow"
  >
    <ckeditor label="HTML" v-model:html="innerPortlet.params.options">
    </ckeditor>
  </portlet-editor>
</template>

<script>
import { defineComponent } from 'vue'
import BoardWidget from './widget.vue'
import Ckeditor from '../base/ckeditor.vue'
import portletbase from '../mixins/portletbase'
import editorbase from '../mixins/editorbase'
import PortletEditor from './portleteditor.vue'
import * as echarts from 'echarts'

export default defineComponent({
  name: 'WidgetLineChart',
  props: [],
  mixins: [portletbase, editorbase],
  components: {
    BoardWidget,
    Ckeditor,
    PortletEditor
  },
  data: function () {
    return {
      model: false,
      chartType: '',
      chart: null
    }
  },
  emits: {
    delete: null
  },
  mounted() {
    this.chartType = this.innerPortlet.params.options.series[0].type
    this.init()
  },
  methods: {
    onDelete() {
      this.$emit('delete', this.portlet.name)
    },
    init() {
      console.log(this.chartType)
      let lineChart = document.getElementById(this.chartType)
      console.log('lineChart:', lineChart)
      if (lineChart !== null) {
        echarts.dispose(lineChart)
        // console.log('lineType', lineChart)
        let theme = this.model ? 'dark' : 'light'
        this.chart = echarts.init(lineChart, theme)
        this.chart.setOption(this.innerPortlet.params.options)
      }
    }
  }
})
</script>

<style lang="sass" scoped></style>
