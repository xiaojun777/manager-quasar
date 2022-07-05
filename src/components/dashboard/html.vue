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
    <q-card square v-html="innerPortlet.params.html" class="text-black fit q-pa-md no-box-shadow"></q-card>
  </board-widget>

  <portlet-editor
    v-model:title="innerPortlet.title"
    v-model:titleshow="innerPortlet.titleshow"
    v-model:bordershow="innerPortlet.bordershow"
    v-model:bgcolor="innerPortlet.bgcolor"
    v-model:titlecolor="innerPortlet.titlecolor"
    @save="onEditorSave"
    @cancel="onEditorCancel"
    v-model:show="editorShow"
  >
    <ckeditor label="HTML" v-model:html="innerPortlet.params.html"> </ckeditor>
  </portlet-editor>
</template>

<script>
import { defineComponent } from "vue";
import BoardWidget from "./widget.vue";
import Ckeditor from "../base/ckeditor.vue";
import portletbase from "../mixins/portletbase";
import editorbase from "../mixins/editorbase";
import PortletEditor from "./portleteditor.vue";

export default defineComponent({
  name: "WidgetHtml",
  props: [],
  mixins: [portletbase, editorbase],
  components: {
    BoardWidget,
    Ckeditor,
    PortletEditor,
  },
  data: function () {
    return {};
  },
  emits: {
    delete: null,
  },

  methods: {},
});
</script>

<style lang="sass" scoped></style>
