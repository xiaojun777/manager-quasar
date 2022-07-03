<template>
  <board-widget
    :title="innerPortlet.title"
    :titleshow="innerPortlet.titleshow"
    @edit="onPortletEdit"
    @delete="onPortletDelete"
    :editable="editable"
  >
    <div class="col-md-3 col-sm-12 col-xs-12">
      <q-item
        :style="`background-color: ${portlet.params.bgcolor}`"
        class="q-pa-none"
      >
        <q-item-section class="q-pa-md q-ml-none text-white">
          <q-item-label class="text-white text-h6 text-weight-bolder">
            {{ portlet.params.indicatorvalue }}
          </q-item-label>
          <q-item-label>{{ portlet.params.indicatorname }}</q-item-label>
        </q-item-section>
        <q-item-section side class="q-mr-md text-white">
          <q-icon
            :name="portlet.params.icon"
            color="white"
            size="44px"
          ></q-icon>
        </q-item-section>
      </q-item>
    </div>
  </board-widget>

  <portlet-editor
    v-model:title="innerPortlet.title"
    v-model:titleshow="innerPortlet.titleshow"
    @save="onEditorSave"
    @cancel="onEditorCancel"
    v-model:show="editorShow"
  >
  </portlet-editor>
</template>

<script>
import { defineComponent } from "vue";
import BoardWidget from "./widget.vue";
import portletbase from "../mixins/portletbase";
import editorbase from "../mixins/editorbase";
import PortletEditor from "./portleteditor.vue";

export default defineComponent({
  name: "WidgetIndicator",
  props: [],
  mixins: [portletbase, editorbase],
  components: {
    BoardWidget,
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
