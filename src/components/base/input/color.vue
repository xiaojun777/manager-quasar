<template>
  <q-field :label="label" stack-label>
    <template v-slot:control>
      <q-btn v-if="dense"
        rounded
        class="no-border color-btn"
        dense
        :text-color="getBlackOrWhite(innerColor)"
        :style="{'background-color': innerColor}"
        :label="innerColor" icon="colorize">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-color v-model="innerColor"
            flat square border
            no-header
            no-header-tabs
            default-view="palette">
          </q-color>
        </q-popup-proxy>
      </q-btn>
      <q-color v-if="!dense"
        v-model="innerColor"
        flat square border
        no-header-tabs
        no-footer
        default-view="palette">
      </q-color>
    </template>
  </q-field>
</template>

<script>
import { defineComponent } from 'vue';
import colors from "src/components/mixins/colors"

export default defineComponent({
  name: 'QColorInput',
  mixins: [colors],
  components: {
  },
  props: {
    dense: {
      type: Boolean,
      default: false
    },
    color: {
      type:String,
      default: '#FFFFFF'
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
    },
  }
})
</script>
<style lang="sass" scoped>
</style>


