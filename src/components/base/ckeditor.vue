<template>
  <ckeditor
    :editor="editor"
    v-model="editorData"
    :config="editorConfig">
  </ckeditor>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { defineComponent } from 'vue';

export default defineComponent({
  name: "CKeditor",
  props: {
    value: String
  },
  model: {
    name: 'value',
    event: 'input'
  },
  components: {
    ckeditor: CKEditor.component
  },
  data: function () {
    return {
      editor: ClassicEditor,
      editorData: this.value,
      editorConfig: {
        // The configuration of the editor.
        language: 'zh-cn',
      }
    };
  },
  watch: {
    editorData (val) {
      this.$emit('input', val);
    }
  },
  computed: {
  },
  methods: {
  }
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
