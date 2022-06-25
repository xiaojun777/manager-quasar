import axios from "axios";

export default {
  data() {
    return {
      appinfos: [],
    };
  },

  mounted: async function () {
    this.appinfos = await this.getAppInfos();
  },

  methods: {
    async getAppInfos() {
      let response = await axios.get("/apps");
      return response.data;
    },
  },
};
