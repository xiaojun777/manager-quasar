<template>
  <q-input
    v-model="innerIcon"
    stack-label
    :label="label"
  >
    <template v-slot:append>
      <q-btn
        flat dense round
        :icon="innerIcon!=='' ? innerIcon: 'search'"
        class="q-ml-sm"
        size="sm"
        @click="dialogShow=true"
      />

    </template>
  </q-input>

  <q-dialog full-width full-height v-model="dialogShow">
    <q-card class="column no-wrap">
      <icon-selector
        class="col"
        @update:icon="dialogShow=false"
        v-model:icon="innerIcon"/>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue';
import IconSelector from "../iconselector.vue"
export default defineComponent({
  name: 'QIconInput',
  components: {
    IconSelector
  },
  props: {
    icon: {
      type:String,
      default: ''
    },
    label: String
  },
  data: function () {
    return {
      innerIcon: this.icon,
      dialogShow: false
    }
  },
  emits: {
    'update:icon': null,
  },
  watch: {
    innerIcon (val) {
      this.$emit('update:icon', val);
    }
  }
})
</script>
<style lang="sass" scoped>
</style>


