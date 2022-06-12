<template>
  <board-widget :title="innerPortlet.title" @edit="onEdit" @delete="onDelete">
    <div v-html="innerPortlet.params.html"></div>
  </board-widget>

  <q-dialog full-width full-height v-model="editorShow">
    <q-card>
      <div class="q-pa-md">
        <q-form class="q-gutter-lg">
          <q-input
            stack-label
            type="text"
            label="标题"
            v-model="innerPortlet.title"/>

          <ckeditor 
            label="HTML"
            v-model:html="innerPortlet.params.html">
          </ckeditor>

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
import BoardWidget from "./widget.vue";
import Ckeditor from "../base/ckeditor.vue"
import portletbase from '../mixins/portletbase'
import editorbase from '../mixins/editorbase'

export default defineComponent({
  name: "WidgetHtml",
  props: ['portlet'],
  mixins: [
    portletbase, 
    editorbase
  ],
  components: {
    BoardWidget,
    Ckeditor
  },
  data: function () {
    return {
    };
  },
  emits: {
    'delete': null
  },

  methods: {
    onDelete () {
      this.$emit('delete', this.portlet.name);
    },
  }
});
</script>

<style lang="sass" scoped>
</style>
