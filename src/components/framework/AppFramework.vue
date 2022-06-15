<template>
  <q-table
    class="full-width"
    ref="table"
    :title="app.name"
    :rows="rows"
    :columns="cols"
    :grid="grid"
    :loading="loading"
    :selection="selection"
    v-model:selected="selected"
    v-model:pagination="pagination"
    @request="onRequest"
    @row-click="onRowClick"
    row-key="name"
  >
    <template v-slot:top>
      <q-btn
        flat
        class="q-ml-sm"
        icon="add"
        :disable="loading"
        label="Add"
        @click="addRow"
      />
      <q-btn
        flat
        class="q-ml-sm"
        icon="edit"
        :disable="loading"
        label="Edit"
        @click="editRow"
      />
      <q-btn
        flat
        class="q-ml-sm"
        icon="preview"
        :disable="loading"
        label="View"
        @click="viewRow"
      />
      <q-btn
        flat
        class="q-ml-sm"
        icon="remove"
        :disable="loading"
        label="Remove"
        @click="removeRow"
      />
      <q-btn-toggle
        v-model="grid"
        class="q-ml-sm"
        flat
        unelevated
        :options="[
          { label: 'table', value: false, icon: 'list' },
          { label: 'grid', value: true, icon: 'grid_view' },
        ]"
      />

      <q-space />
      <q-btn
        flat
        dense
        round
        class="q-ml-sm"
        icon="search"
        :disable="loading"
        @click="searchRow"
      />
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
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import RowEditor from "./RowEditor.vue";
import SearchView from "./SearchView.vue";
import AlertDialog from "./Alert.vue";
import rows from "src/components/mixins/rows.js";

export default defineComponent({
  name: "AppFramework",
  mixins: [rows],
  components: {
    RowEditor,
    SearchView,
    AlertDialog,
  },
  props: {
    appid: String,
    rowsPerPage: Number,
  },
  data: function () {
    return {
      appname: this.appid,
      grid: false,
      loading: false,
      selection: "multiple",
      selected: [],
    };
  },

  methods: {
    addRow() {
      this.$refs.editor.newRow();
    },

    editRow() {
      if (this.selected.length > 1) {
        this.$refs.alert.show("rows greater than one.");
      } else if (this.selected.length == 0) {
        this.$refs.alert.show("must select a row.");
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
      console.log("remove row...");
      if (this.selected.length > 0) {
        let response = await axios.post(this.getBaseUrl() + "/delete", {
          params: this.selected,
        });
        if (response.data.code) {
          this.flushRows();
        }
      } else {
        this.$refs.alert.show("rows length must greater than zero.");
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

    onSearch(val) {
      this.searching = val;
      this.resetPagination();
      this.flushRows();
    },

    onRowClick(event, row, index) {
      this.$refs.editor.viewRow(row);
    },
  },
});
</script>

<style lang="sass" scoped>
.my-custom-toggle
  border: 1px solid #027be3
</style>
