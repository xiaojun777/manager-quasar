import mockhandler from "./base/mockhandler";
let app = {
  id: "educations",
  name: "教育经历",
  schema: {
    key: "education_id",
    items: [
      {
        id: "education_id",
        label: "教育经历ID",
        type: "string",
        default: "",
        searchable: true,
        sortable: true,
        rules: [],
      },
      {
        id: "userid",
        label: "用户ID",
        type: "string",
        default: "",
        searchable: true,
        sortable: true,
        rules: [],
      },
      {
        id: "level",
        label: "程度",
        type: "option", //string, option, number, date, time, month
        default: 0,
        searchable: false,
        options: {
          0: "小学",
          1: "初中",
          2: "高中",
          3: "大学专科",
          4: "大学本科",
          5: "研究生",
          6: "博士研究生",
        },
        rules: [],
      },
      {
        id: "education_service",
        label: "教育机构",
        type: "string",
        default: "",
        searchable: true,
        sortable: true,
        rules: [],
      },
      {
        id: "education_starttime",
        label: "受教育开始日期",
        type: "date",
        default: "19700101",
        searchable: true,
        sortable: true,
        rules: [],
      },
      {
        id: "education_endtime",
        label: "受教育结束日期",
        type: "date",
        default: "19700101",
        searchable: true,
        sortable: true,
        rules: [],
      },
    ],
  },
};

let rows = [
  {
    education_id: "0000000001",
    userid: "zhangsan",
    level: "0",
    education_service: "宇宙第一小学",
    education_startdate: "19800901",
    education_enddate: "19870701",
  },
  {
    education_id: "0000000002",
    userid: "zhangsan",
    level: "1",
    education_service: "宇宙第一中学",
    education_startdate: "19870901",
    education_enddate: "19900701",
  },
  {
    education_id: "0000000003",
    userid: "zhangsan",
    level: "2",
    education_service: "宇宙第一高级中学",
    education_startdate: "19900901",
    education_enddate: "19930701",
  },
  {
    education_id: "0000000004",
    userid: "zhangsan",
    level: "4",
    education_service: "宇宙第一大学",
    education_startdate: "19930901",
    education_enddate: "19970701",
  },
  {
    education_id: "0000000005",
    userid: "zhangsan",
    level: "5",
    education_service: "宇宙第一大学研究生院",
    education_startdate: "19930901",
    education_enddate: "19960701",
  },
];

let searching = {};
let retRows = [];

export default {
  app: app,
  installData: function (mock) {
    mock.onGet("/app/educations/items").reply(function (config) {
      return mockhandler.items(app, rows, retRows, searching, config);
    });

    mock.onAny("/app/educations/add").reply(function (config) {
      return mockhandler.add(app, rows, config);
    });

    mock.onAny("/app/educations/update").reply(function (config) {
      return mockhandler.update(app, rows, config);
    });

    mock.onAny("/app/educations/delete").reply(function (config) {
      return mockhandler.delete(app, rows, config);
    });
  },
};
