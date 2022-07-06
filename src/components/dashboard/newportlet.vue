<template>
  <q-dialog full-width full-height v-model="innerShow">
    <q-card class="column no-wrap">
      <q-card-section class="scroll">
        <q-form class="q-gutter-lg">
          <q-input stack-label type="text" label="ID" v-model="pId"> </q-input>
          <q-input
            stack-label
            type="text"
            label="标题"
            :readonly="!pTitleShow"
            v-model="pTitle"
          >
            <template v-slot:append>
              <q-checkbox
                v-model="pTitleShow"
                label=""
                checked-icon="visibility"
                unchecked-icon="visibility_off"
              />
            </template>
          </q-input>
          <q-select
            v-model="pType"
            stack-label
            emit-value
            map-options
            :options="this.getOptions()"
            label="类型"
          />
        </q-form>
      </q-card-section>
      <q-space />
      <div class="row q-pa-md justify-end">
        <q-btn
          flat
          rounded
          label="取消"
          icon="cancel"
          color="secondary"
          v-close-popup
        >
        </q-btn>
        <q-btn
          flat
          rounded
          label="保存"
          icon="save"
          color="primary"
          v-close-popup
          @click="onEditorSave"
        >
        </q-btn>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
const options = [
  {
    value: 'html',
    label: '静态HTML内容'
  },
  {
    value: 'indicator',
    label: '单一指标'
  },
  {
    value: 'rows',
    label: '多行应用数据'
  },
  {
    value: 'gallery',
    label: '图库'
  },
  {
    value: 'echarts',
    label: '图表'
  }
]

export default defineComponent({
  name: 'NewPortletDialog',
  props: [],
  mixins: [],
  components: {},
  data: function () {
    return {
      pId: '',
      pTitle: '',
      pType: '',
      pTitleShow: true,
      innerShow: false
    }
  },
  emits: {
    new: null
  },

  watch: {},

  methods: {
    getOptions() {
      return options
    },

    resetValues() {
      this.pid = ''
      this.ptitle = ''
      this.ptype = null
    },

    show() {
      this.resetValues()
      this.innerShow = true
    },

    hide() {
      this.innerShow = false
    },

    onEditorSave() {
      this.$emit('new', {
        name: this.pid,
        title: this.pTitle,
        titleshow: this.pTitleShow,
        type: this.pType,
        params: {}
      })
    }
  }
})
</script>

<style lang="sass" scoped></style>
