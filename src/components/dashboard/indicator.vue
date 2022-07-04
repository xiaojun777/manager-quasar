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

      <q-input
        v-model="innerPortlet.params.indicatorname"
        stack-label
        label="指标名"
      >
      </q-input>

      <q-input
        v-model="innerPortlet.params.indicatorvalue"
        stack-label
        label="指标值"
      >
      </q-input>

      <q-input
        v-model="innerPortlet.params.bgcolor"
        stack-label
        label="背景色"
        class=""
      >
        <template v-slot:append>
          <q-icon
            name="colorize"
            class="cursor-pointer"
            @click="colorPickerShow=true">
          </q-icon>
        </template>
      </q-input>

      <q-input
        v-model="innerPortlet.params.icon"
        stack-label
        label="图标"
        class=""
      >
        <template v-slot:append>
          <q-icon
            name="colorize"
            class="cursor-pointer"
            @click="iconSelectorShow=true">
          </q-icon>
        </template>
      </q-input>
  </portlet-editor>

  <q-dialog v-model="colorPickerShow">
    <q-card class="column no-wrap">
      <q-color
        class="col"
        v-model="innerPortlet.params.bgcolor" />
    </q-card>
  </q-dialog>

  <q-dialog full-width full-height v-model="iconSelectorShow">
    <q-card class="column no-wrap">
      <icon-selector
        class="col"
        @update:icon="iconSelectorShow=false"
        v-model:icon="innerPortlet.params.icon"/>
    </q-card>
  </q-dialog>

</template>

<script>
import { defineComponent } from "vue";
import BoardWidget from "./widget.vue";
import portletbase from "../mixins/portletbase";
import editorbase from "../mixins/editorbase";
import PortletEditor from "./portleteditor.vue";
import IconSelector from "../base/iconselector.vue"

export default defineComponent({
  name: "WidgetIndicator",
  props: [],
  mixins: [portletbase, editorbase],
  components: {
    BoardWidget,
    PortletEditor,
    IconSelector
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
