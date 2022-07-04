<template>
  <q-input
    stack-label
    :label="label"
    v-model="innerColor"
    :input-style="{ 'color': innerColor }"
  >
    <template v-slot:append>
      <q-icon
        name="colorize"
        class="cursor-pointer"
        :style="{ 'color': innerColor, 'border-color': 'lightgrey', 'border-style': 'solid', 'border-width': '1px' }"
        @click="dialogShow=true">
      </q-icon>
    </template>
  </q-input>

  <q-dialog v-model="dialogShow">
    <q-card class="column no-wrap">
      <q-color
        class="col"
        v-model="innerColor" />
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QColorInput',
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
  }
})
</script>
<style lang="sass" scoped>
</style>


