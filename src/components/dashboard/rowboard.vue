<template>
  <q-page class="fit column">
    <q-bar v-if="editable" class="bg-primary text-white">
      <q-btn
        flat
        rounded
        class="q-ml-sm"
        icon="add"
        label="添加行"
        @click="onAddRow"
      />
      <q-btn
        flat
        rounded
        class="q-ml-sm"
        icon="edit_note"
        label="属性"
        @click="onEditBoard"
      />
      <q-space />
      <q-btn
        flat
        rounded
        class="q-ml-sm"
        icon="save_alt"
        label="保存"
        @click="onSaveBoard"
      />
    </q-bar>
    <div v-if="board.items !== void 0" class="col column q-pr-sm">
      <template v-for="rownum in board.items.length" :key="rownum">
        <draggable
          v-if="editable"
          tag="div"
          :componentData="{
            class: 'row',
          }"
          v-model="board.items[rownum - 1]"
          :group="board.name"
          item-key="name"
        >
          <template #item="{ element }">
            <div :class="getClasses(board.items[rownum - 1].length)">
              <portlet
                :portlet="element"
                :board="board.name"
                :editable="editable"
                @widget-delete="onDeletePortlet"
              >
              </portlet>
            </div>
          </template>
        </draggable>

        <div
          v-if="!editable"
          class="row justify-between no-wrap content-stretch"
        >
          <template
            v-for="element in board.items[rownum - 1]"
            :key="element.name"
          >
            <div :class="getClasses(board.items[rownum - 1].length)">
              <portlet
                :portlet="element"
                :board="board.name"
                :editable="editable"
                @widget-delete="onDeletePortlet"
              >
              </portlet>
            </div>
          </template>
        </div>
      </template>
    </div>
  </q-page>

  <new-portlet-dialog ref="factory" @new="onNewPortlet"> </new-portlet-dialog>
</template>

<script>
import { defineComponent } from "vue";
import Portlet from "./portlet.vue";
import draggable from "vuedraggable";
import axios from "axios";
import NewPortletDialog from "./newportlet.vue";

export default defineComponent({
  name: "RowDashBoard",

  props: {
    boardid: String,
    editable: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    Portlet,
    draggable,
    NewPortletDialog,
  },

  computed: {},

  mounted: async function () {
    this.board = await this.getBoard();
  },

  data: function () {
    return {
      board: {},
    };
  },

  methods: {
    getClasses(length) {
      let colnum = 12 / length;
      colnum = Math.floor(colnum);
      return `q-pl-sm q-pt-sm col-lg-${colnum} col-md-${colnum} col-xs-12 col-sm-12`;
    },

    async getBoard() {
      let response = await axios.get("board", {
        params: { board: this.boardid },
      });
      return response.data;
    },

    onDeletePortlet(name) {
      this.deletePortlet(name);
    },

    deletePortlet(name) {
      for (let i = 0; i < this.board.items.length; i++) {
        let col = this.board.items[i];
        for (let j = 0; j < col.length; j++) {
          let item = col[j];
          if (item.name === name) {
            this.board.items[i].splice(j, 1);
            break;
          }
        }
      }
    },

    addPortlet(val) {
      if (this.board.items !== void 0) {
        if (this.board.items.length > 0) {
          this.board.items[0].push(val);
        } else {
          this.board.items = [val];
        }
      }
    },

    onAddPortlet() {
      this.$refs.factory.show();
    },

    onNewPortlet(val) {
      this.addPortlet(val);
    },

    onSaveBoard() {
      console.log("save board upto server.");
    },
  },
});
</script>
