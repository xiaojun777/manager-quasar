export default {
    props: {
    },
    data () {
      return {
        editorShow: false
      }
    },

    onEditorHanlder: async function () {
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
