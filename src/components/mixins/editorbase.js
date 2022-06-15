export default {
    props: {
    },
    data () {
      return {
        editorShow: false
      }
    },

    methods: {
      onEdit () {
        this.editorShow = true;
      },

      onEditorCancel () {
        this.editorShow = false;
      },

      onEditorSave () {
        this.editorShow = false;
      }
    }
  }
