<template>
  <board-widget :title="innerPortlet.title" @edit="onEdit" @delete="onDelete">
    <q-table
      flat
      class="full-width"
      :rows="rows"
      :columns="cols"
      field="name"
      hide-header
      hide-bottom>
    </q-table>
  </board-widget>

  <q-dialog full-width full-height v-model="editorShow">
    <q-card>
      <div class="q-pa-md">
        <q-form class="q-gutter-lg">
          <q-input
            stack-label
            type="text"
            label="标题"
            v-model="innerPortlet.title"/>

          <q-select
            v-model="appname"
            stack-label
            emit-value
            map-options
            option-value="id"
            option-label="name"
            :options="appinfos"
            label="选择应用"/>

          <q-searchings
            :appid="appname"
            v-model:searching="searching">
          </q-searchings>

          <div class="row justify-end q-pa-md q-gutter-sm">
            <q-btn
              label="Cancel"
              class="q-mt-md"
              icon="cancel"
              @click="onEditorCancel">
            </q-btn>
            <q-btn
              label="Save"
              class="q-mt-md"
              icon="save"
              @click="onEditorSave">
            </q-btn>
          </div>          
        </q-form>    
      </div>
    </q-card>
  </q-dialog>

</template>

<script>
import { defineComponent } from 'vue';
import BoardWidget from "./widget.vue";
import rows from 'src/components/mixins/rows.js';
import portletbase from 'src/components/mixins/portletbase';
import editorbase from 'src/components/mixins/editorbase'
import apps from 'src/components/mixins/apps'
import QSearchings from 'src/components/base/searching.vue'

export default defineComponent({
    name: 'WidgetRows',
    mixins: [
      rows, 
      portletbase, 
      editorbase,
      apps
    ],
    components: {
      BoardWidget,
      QSearchings
    },
    emits: {
      'delete': null
    },
    data: function () {
      return {
        appname: this.portlet.params.appid,
        searching: this.portlet.params.searching
      }
    },
    watch: {
      appname (val) {
        console.log('appname：' + val);
        this.innerPortlet.params.appid = val;
        this.resetApp();
      },

      searching (val) {
        console.log('searching: ' + val);
        this.innerPortlet.params.seraching = val;
        this.resetPagination();
        this.flushRows();
      }
    },

    mounted: function () {
    },

    methods: {
      onDelete () {
        console.log('onDelete in rows...');
        this.$emit('delete', this.portlet.name);
      }
    }
})
</script>

<style lang="sass" scoped>
</style>
