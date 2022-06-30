<template>
  <board-widget
    :title="innerPortlet.title"
    :titleshow="innerPortlet.titleshow"
    @edit="onEdit"
    @delete="onDelete"
    :editable="editable"
  >
    <q-card>
      <q-card-section>
        <div ref="echarts" id="echarts" style="height: 250px"></div>
      </q-card-section>
      <q-resize-observer @resize="onResize" />
    </q-card>
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
  name: 'WidgetECharts',
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
      chart: null
    }
  },
  emits: {
    delete: null
  },
  mounted() {
    this.init()
  },
  methods: {
    onDelete() {
      this.$emit('delete', this.portlet.name)
    },
    init() {
      let lineChart = this.$refs['echarts']
      console.log('echarts:', lineChart)
      if (lineChart !== null) {
        echarts.dispose(lineChart)
        let theme = this.model ? 'dark' : 'light'
        this.chart = echarts.init(lineChart, theme)
        this.chart.setOption(this.innerPortlet.params.options)
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

<style lang="sass" scoped></style>
