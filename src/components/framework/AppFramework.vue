<template>
  <q-bar class="full-width bg-transparent">
    <q-btn
      flat rounded
      class="q-ml-sm"
      icon="add"
      text-color="primary"
      :disable="loading || !flags.add"
      label="新增"
      @click="addRow"
    />
    <q-btn
      flat rounded
      text-color="primary"
      class="q-ml-sm"
      icon="edit"
      :disable="loading || !flags.edit"
      label="修改"
      @click="editRow"
    />
    <q-btn
      flat rounded
      text-color="primary"
      class="q-ml-sm"
      icon="preview"
      :disable="loading || !flags.view"
      label="查看"
      @click="viewRow"
    />
    <q-btn
      flat rounded
      text-color="primary"
      class="q-ml-sm"
      icon="remove"
      :disable="loading || !flags.delete"
      label="删除"
      @click="removeRow"
    />

    <q-space />
    <q-btn
      flat dense round
      class="q-ml-sm"
      text-color="primary"
      icon="search"
      :disable="loading"
      @click="searchRow"
    />
  </q-bar>
  <q-table
    class="full-width"
    ref="table"
    :title="app.name"
    :rows="rows"
    :columns="cols"
    :loading="loading"
    :selection="selection"
    v-model:selected="selected"
    v-model:pagination="pagination"
    @request="onRequest"
    @row-click="onRowClick"
    row-key="name"
  >
    <template v-slot:top>
      <template v-for="item in searchingItems" :key="item.id">
        <q-chip removable @remove="onRemoveSearchingItem(item.id);" color="primary" text-color="white">
          {{item.label}}
        </q-chip>
      </template>
    </template>

  </q-table>

  <row-editor
    :app="app"
    ref="editor"
    v-on:edit="onEdit"
    v-on:new="onAdd"
    v-on:afternew="onAfterNew"
  >
  </row-editor>

  <search-view :app="app" ref="search" v-on:search="onSearch"> </search-view>

  <alert-dialog ref="alert" />
  <confirm-dialog ref="confirm" />
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import RowEditor from "./RowEditor.vue";
import SearchView from "./SearchView.vue";
import AlertDialog from "./Alert.vue";
import ConfirmDialog from "./Confirm.vue";
import rows from "src/components/mixins/rows.js";

export default defineComponent({
  name: "AppFramework",
  mixins: [rows],
  components: {
    RowEditor,
    SearchView,
    AlertDialog,
    ConfirmDialog
  },
  props: {
    appid: String,
    rowsPerPage: Number,
  },
  data: function () {
    return {
      appname: this.appid,
      loading: false,
      selection: "multiple",
      selected: [],
      searchingItems: [],
      flags: {
        add: true,
        edit: false,
        view: false,
        delete: false
      }
    };
  },

  computed: {

  },

  mounted: async function () {
    this.updateFlag(this.selected);
  },

  watch: {
    selected: {
      handler (val) {
        this.updateFlag(val);
      },
      deep: true
    }
  },

  methods: {
    updateFlag (selected) {
      switch (selected.length){
        case 0: {
          this.flags = {
            add: true,
            edit: false,
            view: false,
            delete: false
          }
          break;
        }
        case 1: {
          this.flags = {
            add: true,
            edit: true,
            view: true,
            delete: true
          }
          break;
        }
        default: {
          this.flags = {
            add: true,
            edit: false,
            view: false,
            delete: true
          }
          break;
        }
      }
    },

    addRow() {
      this.$refs.editor.newRow();
    },

    editRow() {
      if (this.selected.length > 1) {
        this.$refs.alert.show("同时只能编辑一个条目。");
      } else if (this.selected.length == 0) {
        this.$refs.alert.show("必须选择一个编辑条目。");
      } else if (this.selected.length === 1) {
        this.$refs.editor.editRow(this.selected[0]);
      }
    },

    viewRow() {
      if (this.selected.length > 1) {
        this.$refs.alert.show("rows greater than one.");
      } else if (this.selected.length == 0) {
          this.$refs.alert.show("must select a row.");
      } else if (this.selected.length === 1) {
        this.$refs.editor.viewRow(this.selected[0]);
      }
    },

    searchRow() {
      this.$refs.search.show();
    },

    async removeRow() {
      let bRet = await this.$refs.confirm.show('确定要删除信息吗？');
      if (bRet) {
        let response = await axios.post(this.getBaseUrl() + "/delete", {
          params: this.selected,
        });
        if (response.data.code) {
          this.selected = [];
          this.flushRows();
        }
      }
    },

    async onAdd(val, callback) {
      let response = await axios.post(this.getBaseUrl() + "/add", {
        params: val,
      });
      callback(response.data);
    },

    async onEdit(val, callback) {
      let response = await axios.post(this.getBaseUrl() + "/update", {
        params: val,
      });
      callback(response.data);
    },

    onAfterNew() {
      this.flushRows();
    },

    onRequest(config) {
      this.flushRows(config.pagination);
    },

    refreshTable () {
      this.resetPagination();
      this.flushRows();
      this.transSearchItems();
    },

    onSearch(val) {
      this.searching = val;
      this.refreshTable();
    },

    onRowClick(event, row, index) {
      this.$refs.editor.viewRow(row);
    },

    onRemoveSearchingItem(itemId) {
      switch(typeof this.searching[itemId]){
        case 'string': {
          this.searching[itemId] = '';
          break;
        }
        case 'object': {
          if (Array.isArray(this.searching[itemId])){
            this.searching[itemId] = [];
          }else{
            this.searching[itemId] = {};
          }
          break;
        }
      }
      this.refreshTable();
    },

    transSearchItems () {
      this.searchingItems = [];
      let searching = this.searching;
      for (let i = 0; i < this.app.schema.items.length; i++) {
        let item = this.app.schema.items[i];
        if (item.searchable) {
          switch (item.type) {
            case "string": {
              if (searching[item.id] !== void 0 && searching[item.id].length > 0) {
                this.searchingItems.push({
                  id: item.id,
                  label: item.label + ': ' + searching[item.id]
                });
              }
              break;
            }
            case "number": {
              if (searching[item.id] !== void 0 && (searching[item.id].min !== void 0 || searching[item.id].max !== void 0)) {
                let numberSearching = searching[item.id];
                let label = item.label + ': ';
                let min = numberSearching.min;
                let max = numberSearching.max;
                let bMin = min !== void 0 && min.length !== 0;
                let bMax = max !== void 0 && max.length !== 0;

                if (bMin || bMax){
                  if (bMin){
                    label += '>=' + min;
                  }

                  if (bMin && bMax){
                    label += '且'
                  }

                  if (bMax){
                    label += '<=' + max;
                  }
                  this.searchingItems.push({
                    id: item.id,
                    label: label
                  });
                }
              }
              break;
            }
            case "option": {
              if (searching[item.id] !== void 0 && searching[item.id] != null && searching[item.id].length > 0) {
                let label = item.label + ': ';
                let labels = [];
                for (let i=0; i<searching[item.id].length; i++) {
                  let con = searching[item.id][i];
                  labels.push(item.options[con]);
                }
                label += `[${labels.join(',')}]`;
                this.searchingItems.push({
                  id: item.id,
                  label: label
                });
              }
              break;
            }
          }
        }
      }
    }
  },
});
</script>

<style lang="sass" scoped>
.my-custom-toggle
    border: 1px solid #027be3
</style>
