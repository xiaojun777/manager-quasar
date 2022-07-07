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
        @click="onSearchClick"
      />

    </template>
  </q-input>

  <QIconPicker v-model:icon="innerIcon" ref="picker"/>
</template>

<script>
import { defineComponent } from 'vue';
import QIconPicker from 'src/components/base/picker/icon.vue'
export default defineComponent({
  name: 'QIconInput',
  components: {
    QIconPicker
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
    }
  },
  emits: {
    'update:icon': null,
  },
  watch: {
    innerIcon (val) {
      this.$emit('update:icon', val);
    }
  },
  methods: {
    onSearchClick () {
      this.$refs.picker.show();
    }
  }
})
</script>
<style lang="sass" scoped>
</style>


