<template>
  <div class="fit q-pa-md">
    <q-table
      title="选择图标"
      :rows="rows"
      :columns="columns"
      row-key="id"
      selection="single"
      v-model:selected="innerSelected"
      :filter="filter"
      :filter-method="filterData"
      grid
      hide-header
      hide-bottom
      :pagination="pagination"
      :rows-per-page-options="[0]"
    >
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="搜索图标"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-4 col-sm-2 col-md-2 col-lg-1">
          <q-card
            @click="props.selected = !props.selected"
            flat
            class="cursor-pointer custom-grey"
            :class="props.selected ? 'bg-grey-2' : ''"
          >
            <q-card-section class="row justify-center">
              <q-icon size="xl" :name="props.row.id" />
            </q-card-section>
            <q-card-section class="row justify-center custom-icon-label">
              {{ props.row.id.replaceAll("_", " ") }}
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import icons from "./icons";
export default defineComponent({
  name: "IconSelector",
  props: {
    icon: String,
  },
  components: {},
  emits: {
    "update:icon": null,
  },
  data: function () {
    return {
      rows: [],
      filter: "",
      innerSelected: [{id:this.icon}],
      loading: false,
      nextpage: 2,
      pagination: { rowsPerPage: 0 },
      columns: [
        {
          name: "id",
          required: true,
        },
      ],
    };
  },
  mounted: function () {
    icons.forEach((icon) => {
      this.rows.push({
        id: icon,
      });
    });
  },
  watch: {
    icon (val) {
      this.selected = [val];
    },

    innerSelected (val) {
      let icon = '';
      if (val.length > 0){
        icon = val[0].id;
      }
      this.$emit("update:icon", icon);
    },
  },
  computed: {},
  methods: {
    filterData() {
      if (this.rows.length > 2 && this.filter) {
        return this.rows.filter((row) => {
          return row.id.indexOf(this.filter) !== -1;
        });
      } else {
        return this.rows;
      }
    },
  },
});
</script>

<style lang="sass" scoped>
.custom-grey
  color: #5f6368

.custom-icon-label
  text-overflow: ellipsis
  overflow: hidden
  white-space: nowrap
</style>
