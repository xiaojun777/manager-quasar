<template>
  <board-widget
    :title="innerPortlet.title"
    :titleshow="innerPortlet.titleshow"
    @edit="onEdit"
    @delete="onDelete"
    :editable="editable">
    <div v-html="innerPortlet.params.html"></div>
  </board-widget>

  <portlet-editor
    v-model:title="innerPortlet.title"
    v-model:titleshow="innerPortlet.titleshow"
    @save="onEditorSave"
    @cancel="onEditorCancel"
    v-model:show="editorShow"
    >
    <ckeditor
      label="HTML"
      v-model:html="innerPortlet.params.html">
    </ckeditor>

  </portlet-editor>
</template>

<script>
import { defineComponent } from "vue";
import BoardWidget from "./widget.vue";
import Ckeditor from "../base/ckeditor.vue"
import portletbase from '../mixins/portletbase'
import editorbase from '../mixins/editorbase'
import PortletEditor from './portleteditor.vue'

export default defineComponent({
  name: "WidgetHtml",
  props: [],
  mixins: [
    portletbase,
    editorbase
  ],
  components: {
    BoardWidget,
    Ckeditor,
    PortletEditor
  },
  data: function () {
    return {
    };
  },
  emits: {
    'delete': null
  },

  methods: {
    onDelete () {
      this.$emit('delete', this.portlet.name);
    },
  }
});
</script>

<style lang="sass" scoped>
</style>
