<template>
  <board-widget
    :title="innerPortlet.title"
    :titleshow="innerPortlet.titleshow"
    @edit="onEdit"
    @delete="onDelete"
    :editable="editable"
  >
    <div ref="echarts" id="echarts" style="height: 250px"></div>
  </board-widget>
  <portlet-editor
    v-model:title="innerPortlet.title"
    v-model:titleshow="innerPortlet.titleshow"
    @save="onEditorSave"
    @cancel="onEditorCancel"
    v-model:show="editorShow"
  >
    <!-- <div>{{ innerPortlet.params.options.series[0] }}</div> -->
    <!-- <q-select
      outlined
      v-model="vModel"
      :options="innerPortlet.params.options.series[0].data"
      label="选择数据对象"
      stack-label
      emit-value
      map-options
      option-value="value"
      option-label="name"
    />
    <q-input v-model="vModel"></q-input> -->
    <q-input
      v-for="item in datas"
      type="number"
      :key="item.name"
      v-model.number="item.value"
      :label="item.name"
    ></q-input>
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
    // Ckeditor,
    PortletEditor
  },
  data: function () {
    return {
      model: false,
      chart: null,
      datas: null
    }
  },
  emits: {
    delete: null
  },
  watch: {
    datas: {
      handler(val) {
        console.log('datas ', val)
        this.init()

        // this.init()
      },
      deep: true
    }
  },
  mounted() {
    this.datas = this.innerPortlet.params.options.series[0].data
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
        // echarts.dispose(lineChart)
        let theme = this.model ? 'dark' : 'light'
        lineChart = echarts.init(lineChart, theme)
        lineChart.setOption(this.innerPortlet.params.options)
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
