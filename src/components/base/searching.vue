<template>
  <template v-for="item in innerApp.schema.items" :key="item.id">
    <q-input
      v-if="item.type == 'string' && item.searchable"
      type="text"
      stack-label
      :label="item.label"
      v-model="innerSearching[item.id]"
    />
    <div v-if="item.type == 'number' && item.searchable" class="row">
      <q-input
        class="col"
        type="number"
        stack-label
        :label="item.label + '(min)'"
        v-model="innerSearching[item.id]['min']"
      />
      <div
        class="col-1 text-subtitle1"
        style="text-align: center; margin-top: 10px"
      >
        ---
      </div>
      <q-input
        class="col"
        type="number"
        stack-label
        :label="item.label + '(max)'"
        v-model="innerSearching[item.id]['max']"
      />
    </div>
    <q-select
      v-if="item.type == 'option' && item.searchable"
      v-model="innerSearching[item.id]"
      stack-label
      emit-value
      map-options
      multiple
      :options="this.getOptions(item.options)"
      :label="item.label"
    />
  </template>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "QSearchings",
  props: ["app", "appid", "searching"],
  data: function () {
    return {
      innerApp: {
        schema: {
          items: [],
        },
      },
      innerSearching: this.searching,
    };
  },
  emits: {
    "update:searching": null,
  },
  watch: {
    innerSearching: {
      handler(val) {
        this.$emit("update:searching", val);
      },
      deep: true,
    },
    appid: {
      async handler(val) {
        this.innerApp = await this.getApp();
      },
    },
  },

  mounted: async function () {
    if (this.app !== void 0) {
      this.innerApp = this.app;
    } else {
      this.innerApp = await this.getApp();
    }
    this.resetSearching(this.searching);
  },

  methods: {
    async getApp() {
      let response = await axios.get("apps/getapp", {
        params: { appid: this.appid },
      });
      return response.data;
    },

    resetSearching(searching) {
      this.innerSearching = {};
      for (let i = 0; i < this.innerApp.schema.items.length; i++) {
        let item = this.innerApp.schema.items[i];
        if (item.searchable) {
          if (searching !== void 0 && searching[item.id] !== void 0) {
            this.innerSearching[item.id] = searching[item.id];
          } else {
            switch (item.type) {
              case "string": {
                this.innerSearching[item.id] = "";
                break;
              }
              case "number": {
                this.innerSearching[item.id] = {};
                break;
              }
              case "option": {
                this.innerSearching[item.id] = null;
                break;
              }
            }
          }
        }
      }
    },

    getOptions(options) {
      let opts = [];
      for (let opt in Object.keys(options)) {
        opts.push({
          value: opt,
          label: options[opt],
        });
      }
      return opts;
    },
  },
});
</script>
