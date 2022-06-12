<template>
  <q-page class="fit">
    <div class="fit row justify-center">
      <template
        v-for="colnum in board.columns" :key="colnum">
        <draggable
          tag="div"
          :componentData="{class: classes}"
          v-model="board.items[colnum - 1]"
          :group="board.name"
          item-key="name">
          <template #item="{ element }">
            <div class="q-ma-md">
              <portlet 
                :portlet="element"
                :board="board.name"
                @widget-delete="onDeleteWidget">
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
      //let classes = `col-xs-12 col-sm-12 col-lg-${this.colWidth} col-md-${this.colWidth}`;
      let classes = 'col';
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

    onDeleteWidget (name) {
      console.log('onDeleteWidget...');
      console.log(name);
      this.deleteWidget(name);
    },

    deleteWidget (name) {
      for (let i=0; i<this.board.items.length; i++){
        let col = this.board.items[i];
        for (let j=0; j<col.length; j++){
          let item = col[j];
          if (item.name === name){
            this.board.items[i].splice(j, 1);
            break;
          }
        }
      }
    }
  },
});
</script>
