let app =  {
  id: "groups",
  label: "用户组管理",
  schema: {
    key: 'groupid',
    items:[{
      id: "groupid",
      label: "用户组ID",
      type: "string", //string, option, number, date, time, month
      default: "",
      searchable: false,
      sortable: true,
      rules: [{
        type: "required",
      },{
        type: "alpha",
      },{
        type: "minlength",
        params: [6],
      },{
        type: "maxlength",
        params: [12],
      }],
    },{
      id: "name",
      label: "组名",
      type: "string",
      default: "",
      searchable: true,
      sortable: true,
      rules: [{
        type: "fullcode",
      }],
    }]
  }
};

export default {
  app: app,
  installData: function (mock) {

  }
};
