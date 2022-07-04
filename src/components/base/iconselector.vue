<template>
  <div class="col q-pa-md column no-wrap" v-scroll ref="selector">
    <q-bar class="bg-transparent">
      <q-space/>
      <q-input borderless dense debounce="300" v-model="filter" placeholder="搜索图标">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-bar>
    <q-virtual-scroll
      :items="rows"
      v-slot="{ item }"
    >
      <div class="row fit justify-around no-wrap">
        <div v-for="(citem, cindex) in item" :key="cindex"
          class="q-pa-xs" :style="{width: this.itemWidth + 'px'}"
          :title="citem.id.replaceAll('_', ' ')">
          <q-card v-if="citem.id !== ''"
            @click="this.selected=citem.id"
            flat
            class="cursor-pointer custom-grey"
            :class="citem.id===this.selected ? 'bg-grey-2' : ''"
          >
            <q-card-section class="row justify-center">
              <q-icon size="xl" :name="citem.id" />
            </q-card-section>
            <q-card-section class="text-center custom-icon-label">
              {{ citem.id.replaceAll("_", " ") }}
            </q-card-section>
          </q-card>

          <q-card v-if="citem.id === ''"
            flat
            class="custom-grey"
          >
          </q-card>
        </div>
      </div>
    </q-virtual-scroll>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useElementSize } from '@vueuse/core'
import icons from "./icons";

export default defineComponent({
  name: "IconSelector",
  props: {
    icon: String,
    itemWidth: {
      type: Number,
      default: 120
    }
  },
  components: {},
  emits: {
    "update:icon": null,
  },
  data: function () {
    return {
      rows: [],
      defaultRows: [],
      filterRows: [],
      perRowItems: 5,
      filter: "",
      selected: this.icon,
      containerWidth: 0,
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
    const { width } = useElementSize(this.$refs.selector);
    this.containerWidth = width;
    icons.forEach((icon) => {
      this.defaultRows.push({
        id: icon,
      });
    });
    this.filterRows = this.defaultRows;
    //this.reLayoutRows();
  },
  watch: {
    containerWidth (val) {
      this.perRowItems = Math.floor(val / this.itemWidth);
      this.reLayoutRows();
    },

    icon (val) {
      this.selected = [val];
    },

    selected (val) {
      this.$emit("update:icon", val);
    },

    filter () {
      this.filterData();
    },

    filterRows () {
      this.reLayoutRows();
    }
  },
  computed: {},
  methods: {
    reLayoutRows () {
      this.rows = [];

      for(let i = 0; i < Math.ceil(this.filterRows.length / this.perRowItems); i++){
        this.rows.push(this.filterRows.slice(i * this.perRowItems, (i + 1) * this.perRowItems));
      }
      let remains = this.filterRows.length % this.perRowItems;

      if (remains !== 0){
        for (let i=0; i<this.perRowItems - remains; i++){
          this.rows[this.rows.length - 1].push({
            id: ''
          });
        }
      }
    },

    filterData() {
      if (this.defaultRows.length > 2 && this.filter) {
        this.filterRows = this.defaultRows.filter((row) => {
          return row.id.indexOf(this.filter) !== -1;
        });
      } else {
        this.filterRows = this.defaultRows;
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
