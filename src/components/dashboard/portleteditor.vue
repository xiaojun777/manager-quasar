<template>
  <q-dialog full-width full-height v-model="innerShow">
    <div class="fit bg-white column">
      <q-bar class="bg-primary text-white">
        <q-icon name="edit_note" />
        <div>编辑</div>
        <q-space/>
        <q-btn
          flat rounded dense
          label=""
          icon="save"
          @click="onEditorSave">
        </q-btn>
        <q-btn
          flat rounded dense
          label=""
          icon="cancel"
          @click="onEditorCancel">
        </q-btn>
      </q-bar>
      <div class="col bg-white row">
        <q-card square class="col bg-white fit q-pa-md no-border no-box-shadow">
          <portlet
            :portlet="innerPortlet"
            :editable="false"
          >
          </portlet>
        </q-card>
        <q-card square class="column no-wrap col full-height q-pa-md scroll no-box-shadow	no-border">
          <q-card-section class="no-padding">
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
                  :readonly="!innerPortlet.titleshow"
                  v-model="innerPortlet.title">
                  <template v-slot:append>
                    <q-btn
                      flat dense round
                      icon="colorize"
                      class="q-ml-sm"
                      size="sm"
                      @click="onColorClick"
                    />

                    <q-btn
                      flat dense round
                      :icon="innerPortlet.titleicon ? innerPortlet.titleicon: 'search'"
                      class="q-ml-sm"
                      size="sm"
                      @click="onIconClick"
                    />

                    <q-btn
                      flat dense round
                      class="q-ml-sm"
                      size="sm"
                      :icon="innerPortlet.titleshow?'visibility':'visibility_off'"
                      @click="innerPortlet.titleshow=!innerPortlet.titleshow"
                    />
                  </template>
                </q-input>

                <q-color-input
                  v-model:color="innerPortlet.bgcolor"
                  label="背景色"
                >
                </q-color-input>

                <q-field>
                  <q-toggle
                    v-model="innerPortlet.bordershow"
                    :icon="innerPortlet.bordershow ? 'border_all':'border_clear'"
                    :label="innerPortlet.bordershow ? '隐藏边框' : '显示边框'"
                  />
                </q-field>
              </q-expansion-item>

              <q-expansion-item
                expand-separator
                icon="extension"
                label="portlet附加信息"
                header-class="bg-primary text-white">

                <slot v-bind:portlet="innerPortlet"></slot>
              </q-expansion-item>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-dialog>
  <QColorPicker v-model:color="innerPortlet.titlecolor" ref="colorpicker"/>
  <QIconPicker v-model:icon="innerPortlet.titleicon" ref="iconpicker"/>

</template>

<script>
import { defineComponent } from "vue";
import QColorInput from "../base/input/color.vue";
import _ from "lodash";
import QColorPicker from "src/components/base/picker/color.vue"
import QIconPicker from 'src/components/base/picker/icon.vue'

export default defineComponent({
  name: "PortletEditor",
  props: {
    portlet: Object,
    show: {
      type: Boolean,
      default: false
    },
  },
  mixins: [
  ],
  components: {
    QColorInput,
    QIconPicker,
    QColorPicker
  },
  data: function () {
    return {
      innerPortlet: {},
      colorDialogShow: false,
      innerShow: false
    };
  },
  emits: {
    'save': null,
    'cancel': null,
    'update:show': null,
    'update:portlet': null
  },

  watch: {
    innerShow: {
      handler (val) {
        this.$emit('update:show', val);
      }
    },
    show: {
      handler (val) {
        this.innerShow = val;
        this.innerPortlet = _.cloneDeep(this.portlet);
      }
    }
  },

  methods: {
    onEditorSave () {
      this.$emit('update:portlet', this.innerPortlet);
      this.$emit('save');
    },

    onEditorCancel () {
      this.$emit('cancel');
    },

    onColorClick () {
      this.$refs.colorpicker.show();
    },

    onIconClick () {
      this.$refs.iconpicker.show();
    }
  }
});
</script>

<style lang="sass" scoped>

</style>
