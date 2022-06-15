<template>
    <widget-html v-if="portlet.type == 'html'"
      v-model:portlet="innerPortlet"
      @delete="onDelete"
    >
    </widget-html>

    <widget-rows v-if="portlet.type == 'rows'"
      v-model:portlet="innerPortlet"
      @delete="onDelete"
    >
    </widget-rows>

    <widget-gallery v-if="portlet.type == 'gallery'"
      v-model:portlet="innerPortlet"
      @delete="onDelete"
    >
    </widget-gallery>
</template>

<script>
import { defineComponent } from 'vue';
import WidgetRows from "./rows.vue";
import WidgetHtml from "./html.vue";
import WidgetGallery from "./gallery.vue";


export default defineComponent({
    name: 'Portlet',
    props: {
      portlet: {},
      board: String,
      dataDraggable: Boolean
    },

    components: {
      WidgetRows,
      WidgetHtml,
      WidgetGallery
    },

    data: function () {
      return {
        innerPortlet: this.portlet
      };
    },

    emits: {
      'widget-delete': null,
      'update:portlet': null
    },

    watch: {
      innerPortlet: {
        handler (val) {
          this.$emit('update:portlet', val);
        },
        deep: true
      }
    },

    methods: {
      onDelete (val) {
        console.log('onDelete in portlet...');
        console.log(val);
        this.$emit('widget-delete', val);
      }
    }
})
</script>

