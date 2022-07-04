<template>
  <board-widget
    :title="innerPortlet.title"
    :titleshow="innerPortlet.titleshow"
    @edit="onPortletEdit"
    @delete="onPortletDelete"
    :editable="editable"
  >
    <q-item
      :style="`background-color: ${portlet.params.bgcolor}`"
      class="q-pa-none"
    >
      <q-item-section class="q-pa-md q-ml-none text-white">
        <q-item-label
          :style="{color: portlet.params.valuecolor}"
          class="text-h6 text-weight-bolder">
          {{ portlet.params.indicatorvalue }}
        </q-item-label>
        <q-item-label :style="{color: portlet.params.namecolor}">
          {{ portlet.params.indicatorname }}
        </q-item-label>
      </q-item-section>
      <q-item-section side class="q-mr-md text-white">
        <q-icon
          :name="portlet.params.icon"
          :style="{color: portlet.params.iconcolor}"
          size="44px"
        ></q-icon>
      </q-item-section>
    </q-item>
  </board-widget>

  <portlet-editor
    v-model:title="innerPortlet.title"
    v-model:titleshow="innerPortlet.titleshow"
    @save="onEditorSave"
    @cancel="onEditorCancel"
    v-model:show="editorShow"
  >

      <q-input
        v-model="innerPortlet.params.indicatorname"
        stack-label
        label="指标名"
      >
      </q-input>

      <q-color-input
        v-model:color="innerPortlet.params.namecolor"
        label="指标名颜色"
      >
      </q-color-input>

      <q-input
        v-model="innerPortlet.params.indicatorvalue"
        stack-label
        label="指标值"
      >
      </q-input>

      <q-color-input
        v-model:color="innerPortlet.params.valuecolor"
        label="指标颜色"
      >
      </q-color-input>

      <q-icon-input
        v-model:icon="innerPortlet.params.icon"
        label="图标"
      >
      </q-icon-input>

      <q-color-input
        v-model:color="innerPortlet.params.iconcolor"
        label="图标颜色"
      >
      </q-color-input>

      <q-color-input
        v-model:color="innerPortlet.params.bgcolor"
        label="背景色"
      >
      </q-color-input>
  </portlet-editor>
</template>

<script>
import { defineComponent } from "vue";
import BoardWidget from "./widget.vue";
import portletbase from "../mixins/portletbase";
import editorbase from "../mixins/editorbase";
import PortletEditor from "./portleteditor.vue";
import QIconInput from "../base/input/icon.vue"
import QColorInput from "../base/input/color.vue"

export default defineComponent({
  name: "WidgetIndicator",
  props: [],
  mixins: [portletbase, editorbase],
  components: {
    BoardWidget,
    PortletEditor,
    QIconInput,
    QColorInput
  },
  data: function () {
    return {
      iconSelectorShow: false,
      colorPickerShow: false
    };
  },
  emits: {
    delete: null,
  },

  methods: {},
});
</script>

<style lang="sass" scoped></style>
