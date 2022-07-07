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
    v-model:portlet="innerPortlet"
    @save="onEditorSave"
    @cancel="onEditorCancel"
    v-model:show="editorShow"
  >
    <template v-slot="{portlet}">
      <ckeditor label="HTML" v-model:html="portlet.params.html"> </ckeditor>
    </template>
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
