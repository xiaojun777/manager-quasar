<template>
  <q-dialog full-width full-height v-model="innerShow">
    <q-card class="column no-wrap">
      <q-card-section class="scroll">
        <q-form class="q-gutter-xs">
          <q-expansion-item
            expand-separator
            icon="info"
            label="portlet基础信息"
            header-class="bg-primary text-white"
          >
            <q-input
              stack-label
              type="text"
              label="标题"
              :readonly="!innerTitleShow"
              v-model="innerTitle">
              <template v-slot:append>
                <q-btn
                  flat dense round
                  icon="border_color"
                  class="q-ml-sm"
                  size="sm"
                  @click="colorDialogShow=true"
                />

                <q-btn
                  flat dense round
                  class="q-ml-sm"
                  size="sm"
                  :icon="innerTitleShow?'visibility':'visibility_off'"
                  @click="innerTitleShow=!innerTitleShow"
                />
              </template>
            </q-input>

            <q-color-input
              v-model:color="innerBGColor"
              label="背景色"
            >
            </q-color-input>

            <q-field>
              <q-toggle
                v-model="innerBorderShow"
                :icon="innerBorderShow ? 'border_all':'border_clear'"
                :label="innerBorderShow ? '隐藏边框' : '显示边框'"
              />
            </q-field>
          </q-expansion-item>

          <q-expansion-item
            expand-separator
            icon="extension"
            label="portlet附加信息"
            header-class="bg-primary text-white">

            <slot></slot>
          </q-expansion-item>
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

  <q-dialog v-model="colorDialogShow">
    <q-card class="column no-wrap">
      <q-color
        class="col"
        v-model="innerTitleColor" />
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import QColorInput from "../base/input/color.vue";

export default defineComponent({
  name: "PortletEditor",
  props: {
    title: String,
    titlecolor: {
      type: String,
      default: '#FFF'
    },
    titleshow: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    },
    bgcolor: {
      type: String,
      default: '#5f6368'
    },
    bordershow: {
      type: Boolean,
      default: false
    }
  },
  mixins: [
  ],
  components: {
    QColorInput
  },
  data: function () {
    return {
      innerTitle: this.title,
      innerTitleColor: this.titlecolor,
      innerShow: this.show,
      innerTitleShow: this.titleshow,
      innerBGColor: this.bgcolor,
      innerBorderShow: this.bordershow,
      colorDialogShow: false
    };
  },
  emits: {
    'udpate:title': null,
    'save': null,
    'cancel': null,
    'update:show': null,
    'update:titleshow': null,
    'update:titlecolor': null,
    'update:bordershow': null,
    'update:bgcolor': null
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
    },
    innerBGColor: {
      handler (val) {
        this.$emit('update:bgcolor', val);
      }
    },
    innerTitleColor: {
      handler (val) {
        this.$emit('update:titlecolor', val);
      }
    },
    innerBorderShow: {
      handler (val) {
        this.$emit('update:bordershow', val);
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
