<template>
  <div>
    <q-field :label="label" stack-label>
      <ckeditor :editor="editor" v-model="editorData" :config="editorConfig">
      </ckeditor>
    </q-field>
  </div>
</template>

<script>
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { defineComponent } from "vue";

export default defineComponent({
  name: "CKeditor",
  props: {
    label: String,
    html: String,
  },
  components: {
    ckeditor: CKEditor.component,
  },
  emits: {
    "update:html": null,
  },
  data: function () {
    return {
      editor: ClassicEditor,
      editorData: this.html,
      editorConfig: {
        // The configuration of the editor.
        language: "zh-cn",
        toolbar: {
          shouldNotGroupWhenFull: true,
        },
      },
    };
  },
  watch: {
    editorData(val) {
      this.$emit("update:html", val);
    },
  },
  computed: {},
  methods: {},
});
</script>

<style>
.ck-editor {
  width: 100% !important;
}

.ck-editor .ck-editor__editable_inline {
  min-height: 400px;
}
</style>
