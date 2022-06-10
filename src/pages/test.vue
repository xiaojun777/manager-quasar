<template>
  <CKeditor v-model="editorData">
  </CKeditor>
  {{editorData}}
</template>
<script>
import CKeditor from '../components/base/ckeditor.vue';
import { defineComponent } from "vue";

export default defineComponent({
  name: "simple",
  order: 0,
  components: {
    CKeditor
  },
  data: function () {
    return {
      editorData: '<p>Content of the editor.</p>',
    };
  },
  computed: {
  },
  methods: {
  }
});
</script>
