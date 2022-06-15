<template>
  <q-dialog full-width full-height v-model="innerShow">
    <q-card>
      <div class="q-pa-md">
        <q-form class="q-gutter-lg">
          <q-input
            stack-label
            type="text"
            label="标题"
            v-model="innerTitle"/>

          <slot></slot>

          <div class="row justify-end q-pa-md q-gutter-sm">
              <q-btn
                  label="Cancel"
                  class="q-mt-md"
                  icon="cancel"
                  @click="onEditorCancel">
              </q-btn>
              <q-btn
                  label="Save"
                  class="q-mt-md"
                  icon="save"
                  @click="onEditorSave">
              </q-btn>
          </div>
        </q-form>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PortletEditor",
  props: ['title','show'],
  mixins: [
  ],
  components: {
  },
  data: function () {
    return {
      innerTitle: this.title,
      innerShow: this.show
    };
  },
  emits: {
    'update:title': null,
    'save': null,
    'cancel': null,
    'update:show': null
  },

  watch: {
    innerTitle: {
      handler (val) {
        this.$emit('udpate:title', val);
      }
    },
    innerShow: {
      handler (val) {
        this.$emit('update:show', val);
      }
    },
    show: {
      handler (val) {
        this.innerShow = val;
      }
    }
  },

  methods: {
    onEditorSave () {
      this.$emit('save');
    },

    onEditorCancel () {
      this.$emit('cancel');
    }
  }
});
</script>

<style lang="sass" scoped>
</style>
