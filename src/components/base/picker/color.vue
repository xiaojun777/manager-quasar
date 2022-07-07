<template>
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
  name: 'QColorPicker',
  components: {
  },
  props: {
    color: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      innerColor: this.color,
      dialogShow: false
    }
  },
  emits: {
    'update:color': null
  },
  watch: {
    innerColor (val) {
      this.$emit('update:color', val);
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
