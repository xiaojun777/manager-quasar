<template>
  <q-page class="row no-wrap">

    <q-tab-panels class="col-12" v-model="panel" vertical>
      <q-tab-panel class="fit" name="hello">
        <div>hello</div>
      </q-tab-panel>
    </q-tab-panels>

  </q-page>
</template>
<script>
import { defineComponent } from "vue";

let app = {
  id: "users",
  label: "用户管理",
  schema: {
    key: "userid",
    apps: [{
      label: '教育经历',
      id: 'educations',
      foreign: 'userid'
    }],
    items: [{
      type: "fieldset",
      label: "基础信息",
      items:[{
          id: "userid",
          label: "用户ID",
          type: "string", //string, option, number, date, time, month
          default: "",
          searchable: false,
          sortable: true,
          rules: [{
          type: "required",
          },{
          type: "alpha",
          },{
          type: "minlength",
          params: [6],
          },{
          type: "maxlength",
          params: [12],
          }],
      },{
          id: "name",
          label: "姓名",
          type: "string",
          default: "",
          searchable: true,
          sortable: true,
          rules: [{
          type: "fullcode",
          }],
      },{
          id: "age",
          label: "年龄",
          type: "number",
          default: 1,
          searchable: true,
          sortable: true,
          rules: [{
          type: "min",
          params: [0],
          },
          {
          type: "max",
          params: [150],
          }],
      },{
          id: "minzu",
          label: "民族",
          type: "string",
          default: "汉",
          searchable: false,
          sortable: true,
          rules: [{
          type: "fullcode",
          }],
      },{
          id: "gender",
          label: "性别",
          type: "option",
          default: 0,
          searchable: true,
          sortable: true,
          options: {
          0: "男",
          1: "女",
          },
          rules: [],
      },{
          id: "hobby",
          label: "爱好",
          type: "string",
          searchable: false,
          sortable: true,
          rules: [],
      }],
    }]
  }
};

export default defineComponent({
  name: "simple",
  order: 0,
  components: {

  },
  data: function () {
    return {
      editorData: '<p>Content of the editor.</p>',
      panel: 'hello'
    };
  },
  computed: {
  },
  methods: {
  }
});
</script>
