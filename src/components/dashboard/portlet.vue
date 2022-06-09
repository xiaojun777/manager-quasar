<template>
    <widget-html v-if="portlet.type == 'html'"
      :title="portlet.title"
      :html="portlet.params.html"
    >
    </widget-html>
    <widget-rows  v-if="portlet.type == 'rows'"
      :title="portlet.title"
      :appid="portlet.params.appid"
      :params="portlet.params.searching"
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
    }
})
</script>

