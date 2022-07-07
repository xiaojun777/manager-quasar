<template>
  <board-widget
    :portlet="innerPortlet"
    @edit="onPortletEdit"
    @delete="onPortletDelete"
    :editable="editable"
  >
    <q-table
      flat
      square
      class="fit full-width"
      :rows="rows"
      :columns="cols"
      field="name"
      hide-header
      hide-bottom
    >
    </q-table>
  </board-widget>

  <portlet-editor
    v-model:portlet="innerPortlet"
    @save="onEditorSave"
    @cancel="onEditorCancel"
    v-model:show="editorShow"
  >

    <template v-slot="{portlet}">
      <q-select
        v-model="portlet.params.appid"
        stack-label
        emit-value
        map-options
        option-value="id"
        option-label="label"
        :options="appinfos"
        label="选择应用"
      />

      <q-searchings :appid="portlet.params.appid" v-model:searching="portlet.params.searching">
      </q-searchings>
    </template>
  </portlet-editor>
</template>

<script>
import { defineComponent } from "vue";
import BoardWidget from "./widget.vue";
import rows from "src/components/mixins/rows.js";
import portletbase from "src/components/mixins/portletbase";
import editorbase from "src/components/mixins/editorbase";
import apps from "src/components/mixins/apps";
import QSearchings from "src/components/base/searching.vue";
import PortletEditor from "./portleteditor.vue";
import _ from "lodash";

export default defineComponent({
  name: "WidgetRows",
  mixins: [rows, portletbase, editorbase, apps],
  components: {
    BoardWidget,
    QSearchings,
    PortletEditor,
  },
  emits: {
    delete: null,
  },
  data: function () {
    return {
      appname:
        this.portlet.params.appid !== void 0 ? this.portlet.params.appid : null,
      searching:
        this.portlet.params.searching !== void 0
          ? this.portlet.params.searching
          : null,
    };
  },
  watch: {
    'portlet.params.appid': {
      handler (val) {
        this.appname = val;
        this.resetApp();
      }
    },

    'portlet.params.searching': {
      handler(val) {
        this.searching = val;
        this.resetPagination();
        this.flushRows();
      },
      deep: true,
    },
  },

  mounted: function () {},

  methods: {},
});
</script>

<style lang="sass" scoped>

::v-deep .q-table__top
  padding-top: 0px !important
  padding-bottom: 0px !important

::v-deep .q-table th, ::v-deep .q-table td
  padding-top: 0px !important
  padding-bottom: 0px !important

::v-deep .q-table thead tr, ::v-deep .q-table tbody td
  height: 32px

::v-deep .q-checkbox__bg
  left: 30%
  top: 30%
  width: 40%
  height: 40%

::v-deep .q-checkbox__inner
  font-size: 32px
</style>
