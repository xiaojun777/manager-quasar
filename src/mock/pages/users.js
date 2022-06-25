import mockhandler from "./base/mockhandler";

let rows = [
  {
    userid: "zhangsan",
    name: "张三",
    age: 45,
    gender: "0",
    hobby: "骑行 徒步",
  },
  {
    userid: "lisi",
    name: "李四",
    age: 44,
    gender: "0",
    hobby: "跑步 徒步",
  },
  {
    userid: "wangwu",
    name: "王五",
    age: 34,
    gender: "0",
    hobby: "跑步 徒步 楚留香",
  },
  {
    userid: "liuyi",
    name: "刘一",
    age: 46,
    gender: "0",
    hobby: "跑步 徒步 骑行",
  },
  {
    userid: "chener",
    name: "chener",
    age: 45,
    gender: "0",
    hobby: "跑步 徒步 骑行 打牌 高尔夫",
  },
  {
    userid: "zhaoliu",
    name: "赵六",
    age: 45,
    gender: "0",
    hobby: "跑步 徒步 骑行 打牌 足球",
  },
  {
    userid: "sunqi",
    name: "孙七",
    age: 30,
    gender: "1",
    hobby: "跑步 徒步 骑行 喝酒",
  },
  {
    userid: "zhouba",
    name: "周八",
    age: 27,
    gender: "1",
    hobby: "跑步 徒步 骑行 刺绣",
  },
  {
    userid: "wujiu",
    name: "吴九",
    age: 45,
    gender: "0",
    hobby: "徒步 骑行 电影",
  },
  {
    userid: "zhengshi",
    name: "郑十",
    age: 27,
    gender: "0",
    hobby: "徒步 骑行 电影 台球 机车",
  },
  {
    userid: "haoyu",
    name: "浩宇",
    age: 24,
    gender: "0",
    hobby: "徒步",
  },
  {
    userid: "yize",
    name: "奕泽",
    age: 27,
    gender: "0",
    hobby: "徒步",
  },
];

let app = {
  id: "users",
  name: "用户管理",
  schema: {
    key: "userid",
    items: [
      {
        id: "userid",
        label: "用户ID",
        type: "string", //string, option, number, date, time, month
        default: "",
        searchable: false,
        sortable: true,
        rules: [
          {
            type: "required",
          },
          {
            type: "alpha",
          },
          {
            type: "minlength",
            params: [6],
          },
          {
            type: "maxlength",
            params: [12],
          },
        ],
      },
      {
        id: "name",
        label: "姓名",
        type: "string",
        default: "",
        searchable: true,
        sortable: true,
        rules: [
          {
            type: "fullcode",
          },
        ],
      },
      {
        id: "age",
        label: "年龄",
        type: "number",
        default: 1,
        searchable: true,
        sortable: true,
        rules: [
          {
            type: "min",
            params: [0],
          },
          {
            type: "max",
            params: [150],
          },
        ],
      },
      {
        id: "minzu",
        label: "民族",
        type: "string",
        default: "汉",
        searchable: false,
        sortable: true,
        rules: [
          {
            type: "fullcode",
          },
        ],
      },
      {
        id: "gender",
        label: "性别",
        type: "option",
        default: 0,
        searchable: true,
        sortable: true,
        options: {
          0: "男",
          1: "女",
        },
        rules: [],
      },
      {
        id: "hobby",
        label: "爱好",
        type: "string",
        searchable: false,
        sortable: true,
        rules: [],
      },
    ],
  },
};

let searching = {};
let retRows = [];

export default {
  app: app,
  installData: function (mock) {
    mock.onGet("/app/users/items").reply(function (config) {
      return mockhandler.items(app, rows, retRows, searching, config);
    });

    mock.onAny("/app/users/add").reply(function (config) {
      return mockhandler.add(app, rows, config);
    });

    mock.onAny("/app/users/update").reply(function (config) {
      return mockhandler.update(app, rows, config);
    });

    mock.onAny("/app/users/delete").reply(function (config) {
      return mockhandler.delete(app, rows, config);
    });
  },
};
