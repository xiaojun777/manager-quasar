<template>
  <q-input
    v-model="innerIcon"
    stack-label
    label="图标"
  >
    <template v-slot:append>
      <q-icon
        :name="innerIcon!=='' ? innerIcon: 'search'"
        class="cursor-pointer"
        @click="dialogShow=true">
      </q-icon>
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


