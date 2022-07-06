<template>
  <q-btn @click="addData">增加</q-btn>
  <div v-if="innerOptions">
    <div
      class="row"
      v-for="(item, index) in innerOptions.series[0].data"
      :key="index"
    >
      <q-input
        class="col-3 q-mr-sm"
        v-model="innerOptions.xAxis.data[index]"
        label="名称"
      ></q-input>
      <q-input class="col-3 q-mr-sm" v-model="item.value" label="值"></q-input>
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
  name: 'BarChart',
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
      innerOptions: this.options
    }
  },
  computed: {},

  mounted: async function () {
    if (this.options == null) {
      let response = await this.getBarOptions()
      let arr = []
      response.series[0].data.forEach((item) => {
        arr.push({ value: item, itemStyle: { color: null } })
      })
      response.series[0].data = arr
      this.innerOptions = response
    }
  },
  methods: {
    async getBarOptions() {
      let response = await axios.get('echarts', {
        params: { board: 'bar' }
      })
      return response.data
    },
    deleteRow(index) {
      this.innerOptions.series[0].data.splice(index, 1),
        this.innerOptions.xAxis.data.splice(index, 1)
    },
    addData() {
      this.innerOptions.xAxis.data.push('')
      this.innerOptions.series[0].data.push({
        value: '',
        itemStyle: { color: null }
      })
    }
  }
})
</script>

<style lang="sass" scoped></style>
