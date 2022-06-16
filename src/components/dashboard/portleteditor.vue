<template>
  <q-dialog full-width full-height v-model="innerShow">
    <q-card>
      <div class="q-pa-md">
        <q-form class="q-gutter-lg">
          <q-input
            stack-label
            type="text"
            label="标题"
            :readonly="!innerTitleShow"
            v-model="innerTitle">
            <template v-slot:append>
              <q-checkbox
                v-model="innerTitleShow"
                label=""
                checked-icon="visibility"
                unchecked-icon="visibility_off"/>
            </template>
          </q-input>

          <slot></slot>
        </q-form>
      </div>

      <q-card-actions align="right" class="absolute-bottom q-pa-md">
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
      </q-card-actions>

    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PortletEditor",
  props: ['title','show', 'titleshow'],
  mixins: [
  ],
  components: {
  },
  data: function () {
    return {
      innerTitle: this.title,
      innerShow: this.show,
      innerTitleShow: this.titleshow
    };
  },
  emits: {
    'update:title': null,
    'save': null,
    'cancel': null,
    'update:show': null,
    'update:titleshow': null
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
    },
    innerTitleShow: {
      handler (val) {
        this.$emit('update:titleshow', val);
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
