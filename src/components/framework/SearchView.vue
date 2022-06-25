<template>
  <q-dialog full-width full-height v-model="showed">
    <q-card class="column no-wrap">
      <div class="q-pa-md scroll">
        <q-form class="q-gutter-lg">
          <q-searchings ref="hello" :app="app" v-model:searching="values">
          </q-searchings>
        </q-form>
      </div>
      <q-space />
      <div class="row justify-end q-pa-md q-gutter-sm">
        <q-btn
          flat
          rounded
          color="secondary"
          label="取消"
          class="q-mt-md"
          icon="cancel"
          @click="onCancel"
        >
        </q-btn>
        <q-btn
          flat
          rounded
          color="primary"
          label="搜索"
          class="q-mt-md"
          icon="search"
          @click="onSearch"
        >
        </q-btn>
      </div>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent } from "vue";
import QSearchings from "src/components/base/searching.vue";

export default defineComponent({
  name: "SearchView",
  components: {
    QSearchings,
  },
  props: {
    app: {},
  },
  data: function () {
    return {
      values: {},
      showed: false,
      initialized: false,
    };
  },

  mounted: function () {},

  methods: {
    resetSearch() {
      this.values = {};
      for (let i = 0; i < this.app.schema.items.length; i++) {
        let item = this.app.schema.items[i];
        if (item.searchable) {
          switch (item.type) {
            case "string": {
              this.values[item.id] = "";
              break;
            }
            case "number": {
              this.values[item.id] = {};
              break;
            }
            case "option": {
              this.values[item.id] = null;
              break;
            }
          }
        }
      }
    },

    show() {
      this.showed = true;
      if (this.app !== void 0 && !this.initialized) {
        this.initialized = true;
        this.resetSearch();
      }
    },

    hide() {
      this.showed = false;
    },

    onCancel() {
      this.hide();
    },

    onSearch() {
      this.$emit("search", this.values);
      this.hide();
    },
  },
});
</script>
