<template>
  <widget-html
    v-if="portlet.type == 'html'"
    v-model:portlet="innerPortlet"
    @delete="onDelete"
    :editable="editable"
  >
  </widget-html>

  <widget-rows
    v-if="portlet.type == 'rows'"
    v-model:portlet="innerPortlet"
    @delete="onDelete"
    :editable="editable"
  >
  </widget-rows>

  <widget-gallery
    v-if="portlet.type == 'gallery'"
    v-model:portlet="innerPortlet"
    @delete="onDelete"
    :editable="editable"
  >
  </widget-gallery>
  <widget-e-chart
    v-if="portlet.type == 'lineChart'"
    v-model:portlet="innerPortlet"
    @delete="onDelete"
    :editable="editable"
  ></widget-e-chart>

  <widget-indicator
    v-if="portlet.type == 'indicator'"
    v-model:portlet="innerPortlet"
    @delete="onDelete"
    :editable="editable"
  >
  </widget-indicator>
</template>

<script>
import { defineComponent } from "vue";
import WidgetRows from "./rows.vue";
import WidgetHtml from "./html.vue";
import WidgetGallery from "./gallery.vue";
import WidgetIndicator from "./indicator.vue";
import WidgetEChart from "./echarts.vue";

export default defineComponent({
  name: "Portlet",
  props: {
    portlet: {},
    board: String,
    editable: Boolean,
  },

  components: {
    WidgetRows,
    WidgetHtml,
    WidgetGallery,
    WidgetEChart,
    WidgetIndicator,
  },

  data: function () {
    return {
      innerPortlet: this.portlet,
    };
  },

  emits: {
    "widget-delete": null,
    "update:portlet": null,
  },

  watch: {
    innerPortlet: {
      handler(val) {
        this.$emit("update:portlet", val);
      },
      deep: true,
    },
  },

  methods: {
    onDelete(val) {
      this.$emit("widget-delete", val);
    },
  },
});
</script>
