import axios from "axios";
import _ from "lodash";
export default {
    data () {
      return {
        appname: '',
        rows: [],
        cols: [],
        app: {},
        defaultSearching: {},
        searching: {},
        pagination: {
          sortBy: '',
          descending: false,
          page: 1,
          rowsPerPage: 10,
          rowsNumber: 0
        }
      }
    },

    computed: {
    },

    mounted: async function () {
      this.resetApp();
    },

    methods: {
      async resetApp () {
        this.app = await this.getApp();
        this.initCols();
        this.resetPagination();
        //this.pagination.sortBy = this.app.schema.key;
        this.flushRows();
      },

      getBaseUrl () {
        return `/app/${this.appname}`;
      },

      async flushRows (pagination) {
        let searching = _.merge(this.defaultSearching, this.searching);
        this.rows = await this.getRows(pagination, searching);
      },

      async getApp  () {
        let response = await axios.get('apps/getapp', { params: { appid: this.appname } });
        return response.data;
      },

      initCols () {
        this.cols = [];
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

      resetPagination () {
        this.pagination = {
          sortBy: this.app.schema.key,
          descending: false,
          page: 1,
          rowsPerPage: this.pagination.rowsPerPage,
          rowsNumber: 0
        };
      },
    }
  }
