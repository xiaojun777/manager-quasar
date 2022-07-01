<template>
  <q-card :class="'column no-wrap ' + this.class">
    <template v-if="getTabs().length > 1">
      <q-tabs
        v-model="panel"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="left"
        narrow-indicator
      >
        <template v-for="tab in getTabs()" :key="tab.id">
          <q-tab :name="tab.id" :label="tab.label" />
        </template>
      </q-tabs>

      <q-separator />
    </template>
    <q-tab-panels class="col"
      v-model="panel">
      <q-tab-panel :name="app.id"
        class="column">
        <div class="q-pa-md scroll col">
          <q-form class="q-gutter-sm">
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
      </q-tab-panel>

      <template v-for="childapp in this.app.schema.apps" :key="childapp.id">
        <q-tab-panel :name="childapp.id" class="column">
          <app-framework
            :appid="childapp.id"
            class="col"
            :hideHeader="true"
            :editable="method!=='view'"
            :defaultData="this.genForeignData(childapp.foreigns)">
          </app-framework>
        </q-tab-panel>
      </template>
    </q-tab-panels>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RowEditor',
  components: {
  },
  props: {
    app: null,
    rowval: null,
    method: String,
    class: String
  },
  data: function () {
    return {
      values: this.rowval,
      submitting: false,
      panel: this.app.id
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
    genForeignData (keys) {
      let data = {};
      for(let i=0; i<keys.length; i++){
        let key = keys[i];
        data[key] = this.rowval[key];
      }
      return data;
    },

    getTabs: function () {
      let tabs = [{
        id: this.app.id,
        label: this.app.label
      }];
      for (let i=0; i<this.app.schema.apps.length; i++){
        let app = this.app.schema.apps[i];
        tabs.push({
          id: app.id,
          label: app.label
        });
      }
      return tabs;
    },

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
<style lang="sass" scoped>

.q-tab-panel
  padding: 0px !important
</style>
