<template>
  <q-input
    stack-label
    :label="label"
    v-model="innerColor"
    :input-style="{ 'color': innerColor }"
  >
    <template v-slot:append>
      <q-btn
        flat dense round
        icon="colorize"
        :style="{'color': innerColor, 'border': '1px solid lightgrey'}"
        class="q-ml-sm"
        size="sm"
        @click="onColorPicker"
      />
    </template>
  </q-input>
  <QColorPicker v-model:color="innerColor" ref="picker"/>

</template>

<script>
import { defineComponent } from 'vue';
import QColorPicker from "src/components/base/picker/color.vue"

export default defineComponent({
  name: 'QColorInput',
  components: {
    QColorPicker
  },
  props: {
    color: {
      type:String,
      default: '#FFF'
    },
    label: String
  },
  data: function () {
    return {
      innerColor: this.color,
      dialogShow: false
    }
  },
  emits: {
    'update:color': null,
  },
  watch: {
    innerColor (val) {
      this.$emit('update:color', val);
    }
  },
  methods: {
    onColorPicker () {
      this.$refs.picker.show();
    }
  }
})
</script>
<style lang="sass" scoped>
</style>


