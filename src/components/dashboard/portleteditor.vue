<template>
  <q-dialog full-width full-height v-model="innerShow">
    <q-card class="column no-wrap">
      <q-card-section class="scroll">
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
      </q-card-section>
      <q-space />
      <div class="row q-pa-md justify-end">
        <q-btn
          flat rounded
          label="取消"
          icon="cancel"
          color="secondary"
          @click="onEditorCancel">
        </q-btn>
        <q-btn
          flat rounded
          label="保存"
          icon="save"
          color="primary"
          @click="onEditorSave">
        </q-btn>
      </div>
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
    'udpate:title': null,
    'save': null,
    'cancel': null,
    'update:show': null,
    'update:titleshow': null
  },

  watch: {
    innerTitle: {
      handler (val) {
        this.$emit('update:title', val);
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
