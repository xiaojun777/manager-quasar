<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-lg">
      <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
        <widget-html
          title="简介"
          html="员工总数6000，男性员工5000人，女性1000人。"
        >
        </widget-html>
        <widget-rows
          appid="users"
          title="女性员工"
          :params="{
            gender: ['1'],
          }"
        >
        </widget-rows>

        <widget-rows
          appid="users"
          title="黄姓员工"
          :params="{
            name: '黄',
          }"
        >
        </widget-rows>
      </div>
      <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
        <widget-rows
          appid="users"
          title="男性员工"
          :params="{
            gender: ['0'],
          }"
        >
        </widget-rows>
      </div>
      <div class="col-lg-4 col-md-4 col-xs-12 col-sm-12">
        <widget-rows
          appid="users"
          title="30-40岁员工"
          :params="{
            age: {
              min: 30,
              max: 40,
            },
          }"
        >
        </widget-rows>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import WidgetRows from "./rows.vue";
import WidgetHtml from "./html.vue";

export default defineComponent({
  name: "DashBoard",

  components: {
    WidgetRows,
    WidgetHtml,
  },

  mounted: async function () {},

  data: function () {
    return {};
  },

  methods: {},
});
</script>
