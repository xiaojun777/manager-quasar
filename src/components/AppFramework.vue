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
        row-key="name">
      <template v-slot:top>
        <q-btn flat class="q-ml-sm" icon="add" :disable="loading" label="Add" @click="addRow"/>
        <q-btn flat class="q-ml-sm" icon="edit" :disable="loading" label="Edit" @click="editRow" />
        <q-btn flat class="q-ml-sm" icon="preview" :disable="loading" label="View" @click="viewRow" />
        <q-btn flat class="q-ml-sm" icon="remove" :disable="loading" label="Remove" @click="removeRow" />
        <q-btn-toggle
            v-model="grid"
            class="q-ml-sm"
            flat
            unelevated
            :options="[
                {label: 'table', value: false},
                {label: 'grid', value: true}
            ]"
        />

        <q-space />
        <q-btn flat class="q-ml-sm" icon="search" :disable="loading" @click="searchRow" />
      </template>
    </q-table>

    <row-editor
        :app="app"
        ref="editor"
        v-on:edit="onEdit"
        v-on:new="onAdd"
        v-on:afternew="onAfterNew">
    </row-editor>

    <search-view
        :app="app"
        ref="search"
        v-on:search="onSearch">
    </search-view>

    <alert-dialog
        ref="alert"/>

</template>

<script>
import { defineComponent } from 'vue';
import axios from "axios";
import RowEditor from './RowEditor.vue';
import SearchView from './SearchView.vue';
import AlertDialog from './Alert.vue';
import rows from './mixins/rows.js';

export default defineComponent({
    name: 'AppFramework',
    mixins: [rows],
    components: { 
        RowEditor, 
        SearchView,
        AlertDialog
    },
    props: {
        appid: String,
        rowsPerPage: Number
    },
    data: function () {
        return {
            grid: false,
            loading: false,
            selection: 'multiple', //none, single, multiple
            selected: [],
            searching: {},
            pagination: {
                sortBy: this.sortBy,
                descending: false,
                page: 1,
                rowsPerPage: this.rowsPerPage,
                rowsNumber: 0
            }
        }
    },

    mounted: async function () {
        this.app = await this.getSchema();
        this.initCols();
        this.pagination.sortBy = this.app.schema.key;
        this.flushRows();
    },  

    methods: {
        resetPagination () {
            this.pagination = {
                sortBy: this.app.schema.key,
                descending: false,
                page: 1,
                rowsPerPage: this.pagination.rowsPerPage,
                rowsNumber: 0
            };              
        },

        async flushRows (pagination) {
            this.rows = await this.getRows(pagination, this.searching);
        },

        addRow () {
            this.$refs.editor.newRow();
        },

        editRow () {
            if (this.selected.length > 1){
                this.$refs.alert.show('rows greater than one.');
            } else if (this.selected.length == 0){
                this.$refs.alert.show('must select a row.');
            }else if (this.selected.length === 1){
                this.$refs.editor.editRow(this.selected[0]);
            }
        },

        viewRow () {
            if (this.selected.length > 1){
                this.$refs.alert.show('rows greater than one.');
            } else if (this.selected.length == 0){
                this.$refs.alert.show('must select a row.');
            } else if (this.selected.length === 1){
                this.$refs.editor.viewRow(this.selected[0]);
            }
        },        

        searchRow () {
            this.$refs.search.show();
        },

        async removeRow () {
            console.log('remove row...');
            if (this.selected.length > 0){
                let response = await axios.post(this.getBaseUrl() + '/delete', { params: this.selected });
                if (response.data.code) {
                    this.flushRows();
                }
            } else {
                this.$refs.alert.show('rows length must greater than zero.');
            }
            
        },

        initCols () {
            this.app.schema.items.forEach(item => {
                let col = {
                    name: item.id,
                    field: item.id,
                    label: item.label,
                    align: 'left',
                    sortable: item.sortable
                };
                if (this.app.schema.key === item.id){
                    col['required'] = true
                }
                if (item.type === 'option'){
                    col['format'] = function (val, row) {
                        return item.options[val]
                    }
                }
                this.cols.push(col);
            });
        },

        getBaseUrl () {
            return `/app/${this.appid}`;
        },

        async getSchema  () {
            let response = await axios.get('app/schema', { params: { appid: this.appid } });
            return response.data.app;
        },

        async getRows (pagination, searching) {
            if (pagination === void 0){
                pagination = this.pagination;
            }
            const { page, rowsPerPage, sortBy, descending } = pagination;
            let response = await axios.get(this.getBaseUrl() + '/items', { params: {
                start: (page - 1) * rowsPerPage,
                count: rowsPerPage,
                sort: sortBy,
                desc: false,
                searching: searching
            }});
            let items = [];
            if (response.data.code){
                this.pagination.sortBy = pagination.sortBy;
                this.pagination.page = pagination.page;
                this.pagination.descending = pagination.descending;
                this.pagination.rowsPerPage = pagination.rowsPerPage;
                this.pagination.rowsNumber = response.data.length;
                items = response.data.items;
            }
            return items;
        },
        
        async onAdd (val, callback) {
            let response = await axios.post(this.getBaseUrl() + '/add', { params: val });
            callback(response.data);
        },

        async onEdit (val, callback) {
            let response = await axios.post(this.getBaseUrl() + '/update',  { params: val });
            callback(response.data);
        },

        onAfterNew () {
            this.flushRows();
        },

        onRequest (config) {
            this.flushRows(config.pagination);
        },

        onSearch (val) {
            this.searching = val;
            this.resetPagination();
            this.flushRows();
        },

        onRowClick (event, row, index) {
            this.$refs.editor.viewRow(row);
        }
    }
})
</script>


<style lang="sass" scoped>
    .my-custom-toggle
        border: 1px solid #027be3
</style>

