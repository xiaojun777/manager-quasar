<template>
  <q-btn @click="addData">增加</q-btn>
  <div v-if="innerOptions">
    <div
      class="row"
      v-for="(item, index) in innerOptions.series[0].data"
      :key="index"
    >
      <q-input class="col-3 q-mr-sm" label="名称" v-model="item.name"></q-input>
      <q-input
        class="col-3 q-mr-sm"
        label="值"
        type="number"
        v-model.number="item.value"
      ></q-input>
      <q-input class="col-2 q-mr-sm" filled v-model="item.itemStyle.color">
        <template v-slot:append>
          <q-icon name="colorize" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-color v-model="item.itemStyle.color" />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-btn @click="deleteRow(index)">删除</q-btn>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'PieChart',
  props: {
    options: Object
  },
  watch: {
    innerOptions: {
      handler(val) {
        this.$emit('update:options', val)
      },
      deep: true
    }
  },
  emits: {
    'update:options': null
  },
  data() {
    return {
      innerOptions: this.options !== void 0 ? this.options : null,
      color: ''
    }
  },
  computed: {},

  mounted: async function () {
    if (this.options == null) {
      this.innerOptions = await this.getPieOptions()
      if (this.innerOptions.series[0].data) {
        this.innerOptions.series[0].data.forEach((item) => {
          item.itemStyle = { color: undefined }
          // if(item.itemStyle && !item.it)
        })
      }
    }
  },
  methods: {
    async getPieOptions() {
      let response = await axios.get('echarts', {
        params: { board: 'pie' }
      })
      return response.data
    },
    addData() {
      let element = { name: '', value: 0, itemStyle: { color: '' } }
      this.innerOptions.series[0].data.push(element)
    },
    deleteRow(index) {
      this.innerOptions.series[0].data.splice(index, 1)
    }
  }
})
</script>

<style lang="sass" scoped></style>
