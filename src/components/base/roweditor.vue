<template>
  <q-card class="column no-wrap">
    <div class="q-pa-md scroll">
      <q-form class="q-gutter-lg">
        <template v-for="item in app.schema.items" :key="item.id">
          <q-input v-if="item.type=='string'"
            :readonly="this.method=='view'"
            type="text"
            stack-label
            :label="item.label"
            v-model="values[item.id]"/>
          <q-input v-if="item.type=='number'"
            :readonly="this.method=='view'"
            type="number"
            stack-label
            :label="item.label"
            v-model="values[item.id]"/>
          <q-select v-if="item.type=='option'"
            :readonly="this.method=='view'"
            v-model="values[item.id]"
            stack-label
            emit-value
            map-options
            :options="this.getOptions(item.options)"
            :label="item.label" />
        </template>
      </q-form>
    </div>
    <q-space />
    <div class="row justify-end q-pa-md q-gutter-sm">
      <q-btn
        flat rounded
        :loading="submitting"
        :label="this.method==='view' ? '关闭' : '取消'"
        class="q-mt-md"
        icon="cancel"
        color="secondary"
        @click="onCancel">
      </q-btn>
      <q-btn v-if="this.method!='view'"
        flat rounded
        :loading="submitting"
        label="保存"
        class="q-mt-md"
        icon="save"
        color="primary"
        @click="onSave">
      </q-btn>
    </div>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'RowEditor',
  props: {
    app: null,
    rowval: null,
    method: String
  },
  data: function () {
    return {
      values: this.rowval,
      submitting: false
    }
  },

  emits: {
    'cancel': null,
    'new': null,
    'edit': null,
    'afternew': null,
    'afteredit': null,
    'error': null
  },

  mounted: async function () {
  },

  computed: {

  },

  methods: {
    getOptions (options) {
      let opts = [];
      for (let opt in Object.keys(options)) {
        opts.push({
          value: opt,
          label: options[opt]
        });
      }
      return opts;
    },

    onCancel () {
      this.$emit('cancel');
    },

    onSave () {
      if (this.method === 'new'){
        this.submitting = true;
        this.$emit('new', this.values, (val) => {
          this.submitting = false;
          if (val.code){
            this.$emit('afternew');
          }else{
            this.$emit('error', val);
          }
        });
      }else{
        this.submitting = true;
        this.$emit('edit', this.values, (val) => {
          this.submitting = false;
          if (val.code){
            this.$emit('afteredit');
          }else{
            this.$emit('error', val);
          }
        });
      }

    }
  },

  computed: {

  }

})
</script>
