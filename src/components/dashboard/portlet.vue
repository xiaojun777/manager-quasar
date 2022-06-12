<template>
    <widget-html v-if="portlet.type == 'html'"
      v-model:portlet="innerPortlet"
      @delete="onDelete"
    >
    </widget-html>

    <widget-rows v-if="portlet.type == 'rows'"
      v-model:portlet="innerPortlet"
      :appid="innerPortlet.params.appid"
      @delete="onDelete"
    >
    </widget-rows>
</template>

<script>
import { defineComponent } from 'vue';
import WidgetRows from "./rows.vue";
import WidgetHtml from "./html.vue";


export default defineComponent({
    name: 'Portlet',
    props: {
      portlet: {},
      board: String,
      dataDraggable: Boolean
    },

    components: {
      WidgetRows,
      WidgetHtml
    },

    data: function () {
      return {
        innerPortlet: this.portlet
      };
    },

    emits: {
      'widget-delete': null
    },

    watch: {
      innerPortlet: {
        handler (val) {
          this.$emit('update', val);
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

