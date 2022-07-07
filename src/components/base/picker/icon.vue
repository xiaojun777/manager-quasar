<template>
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
import IconSelector from "src/components/base/iconselector.vue"

export default defineComponent({
  name: 'QIconPicker',
  components: {
    IconSelector
  },
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      innerIcon: this.icon,
      dialogShow: false
    }
  },
  emits: {
    'update:icon': null
  },
  watch: {
    innerIcon (val) {
      this.$emit('update:icon', val);
    }
  },
  methods: {
    show () {
      this.dialogShow = true;
    },

    hide () {
      this.dialogShow = false;
    }
  }
})
</script>
