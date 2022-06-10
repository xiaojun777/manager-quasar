<template>
    <widget-html v-if="portlet.type == 'html'"
      :title="portlet.title"
      :widget-name="portlet.name"
      :html="portlet.params.html"
      @delete="onDelete"
    >
    </widget-html>
    <widget-rows v-if="portlet.type == 'rows'"
      :title="portlet.title"
      :widget-name="portlet.name"
      :appid="portlet.params.appid"
      :params="portlet.params.searching"
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
      dataDraggable: Boolean
    },

    components: {
        WidgetRows,
        WidgetHtml
    },

    emits: {
      'widget-delete': null
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

