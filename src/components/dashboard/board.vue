<template>
  <q-page class="q-pa-sm">
    <div class="row q-col-gutter-lg">
      <template
        v-for="colnum in board.columns" :key="colnum">
        <draggable
          tag="div"
          :componentData="{class: classes}"
          v-model="board.items[colnum - 1]"
          :group="board.name"
          item-key="name">
          <template #item="{ element }">
            <div>
              <portlet :portlet="element">
              </portlet>
            </div>
          </template>
        </draggable>
      </template>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import Portlet from './portlet.vue';
import draggable from 'vuedraggable';
import axios from "axios";

export default defineComponent({
  name: "DashBoard",

  props: {
    boardid: String,
  },

  components: {
    Portlet,
    draggable
  },

  computed: {
    colWidth () {
      return 12 / this.board.columns;
    },

    classes () {
      let classes = `col-xs-12 col-sm-12 col-lg-${this.colWidth} col-md-${this.colWidth}`;
      console.log(classes);
      return classes;
    }
  },

  mounted: async function () {
    this.board = await this.getBoard();
  },

  data: function () {
    return {
      board: {},
    };
  },

  methods: {
    async getBoard() {
      let response = await axios.get("board", {
        params: { board: this.boardid },
      });
      return response.data;
    },
  },
});
</script>
