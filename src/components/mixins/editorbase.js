export default {
  props: {},
  data() {
    return {
      editorShow: false,
    };
  },

  methods: {
    onPortletEdit() {
      this.editorShow = true;
    },

    onEditorCancel() {
      this.editorShow = false;
    },

    onEditorSave() {
      this.editorShow = false;
    },
  },
};
