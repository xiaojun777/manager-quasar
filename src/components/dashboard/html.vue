<template>
  <board-widget :title="title" @edit="onEdit" @delete="onDelete">
    <div v-html="html"></div>
  </board-widget>

  <q-dialog full-width full-height v-model="editorShow">
    <q-card>
      <div class="q-pa-md">
        <div class="q-gutter-md">
          <q-form>
            <q-input
              type="text"
              label="标题"
              v-model="innerTitle"/>

            <ckeditor v-model="innerHtml">
            </ckeditor>
          </q-form>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import BoardWidget from "./widget.vue";
import Ckeditor from "../base/ckeditor.vue"

export default defineComponent({
  name: "WidgetHtml",
  props: ["widgetName", "title", "html"],
  components: {
    BoardWidget,
    Ckeditor
  },
  data: function () {
    return {
      innerTitle: this.title,
      innterHtml: this.html,
      editorShow: false
    };
  },
  emits: {
    'delete': null
  },
  methods: {
    onEdit () {
      this.editorShow = true;
    },

    onDelete () {
      console.log(arguments);
      console.log('delete in html.');
      this.$emit('delete', this.widgetName);
    }
  }
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
