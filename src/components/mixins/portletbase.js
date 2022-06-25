export default {
  props: {
    portlet: Object,
    editable: Boolean,
  },
  data() {
    return {
      innerPortlet: this.portlet,
    };
  },

  emits: {
    "update:portlet": null,
  },

  watch: {
    innerPortlet: {
      handler(val) {
        this.$emit("update:portlet", val);
      },
      deep: true,
    },
  },

  computed: {},

  mounted: async function () {},

  methods: {},
};
