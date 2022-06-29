<template>
  <q-page class="fit">
    <div class="fit row justify-center">
      <template v-for="colnum in board.columns" :key="colnum">
        <draggable
          tag="div"
          :componentData="{ class: 'col-lg-4 col-md-4 col-xs-12 col-sm-12' }"
          v-model="board.items[colnum - 1]"
          :group="board.name"
          item-key="name"
        >
          <template #item="{ element }">
            <div class="q-ma-sm">
              <portlet
                :portlet="element"
                :board="board.name"
                :editable="editable"
                @widget-delete="onDeleteWidget"
              >
              </portlet>
            </div>
          </template>
        </draggable>
      </template>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import Portlet from './portlet.vue'
import draggable from 'vuedraggable'
import axios from 'axios'

export default defineComponent({
  name: 'DashBoard',

  props: {
    boardid: String //users
  },

  components: {
    Portlet,
    draggable
  },

  computed: {},

  mounted: async function () {
    this.board = await this.getBoard()
  },

  data: function () {
    return {
      board: {},
      editable: true
    }
  },

  methods: {
    async getBoard() {
      let response = await axios.get('board', {
        params: { board: this.boardid }
      })
      return response.data
    },

    onDeleteWidget(name) {
      console.log('onDeleteWidget...')
      console.log(name)
      this.deleteWidget(name)
    },

    deleteWidget(name) {
      for (let i = 0; i < this.board.items.length; i++) {
        let col = this.board.items[i]
        for (let j = 0; j < col.length; j++) {
          let item = col[j]
          if (item.name === name) {
            this.board.items[i].splice(j, 1)
            break
          }
        }
      }
    }
  }
})
</script>
