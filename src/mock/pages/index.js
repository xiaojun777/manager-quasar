import {
  _
} from "core-js";

let rows = [{
  userid: "zhangsan",
  name: "张三",
  age: 45,
  gender: "0",
  hobby: "骑行 徒步",
}, {
  userid: "lisi",
  name: "李四",
  age: 44,
  gender: "0",
  hobby: "跑步 徒步",
}, {
  userid: "wangwu",
  name: "王五",
  age: 34,
  gender: "0",
  hobby: "跑步 徒步 楚留香",
}, {
  userid: "liuyi",
  name: "刘一",
  age: 46,
  gender: "0",
  hobby: "跑步 徒步 骑行",
}, {
  userid: "chener",
  name: "chener",
  age: 45,
  gender: "0",
  hobby: "跑步 徒步 骑行 打牌 高尔夫",
}, {
  userid: "zhaoliu",
  name: "赵六",
  age: 45,
  gender: "0",
  hobby: "跑步 徒步 骑行 打牌 足球",
}, {
  userid: "sunqi",
  name: "孙七",
  age: 30,
  gender: "1",
  hobby: "跑步 徒步 骑行 喝酒",
}, {
  userid: "zhouba",
  name: "周八",
  age: 27,
  gender: "1",
  hobby: "跑步 徒步 骑行 刺绣",
}, {
  userid: "wujiu",
  name: "吴九",
  age: 45,
  gender: "0",
  hobby: "徒步 骑行 电影",
}, {
  userid: "zhengshi",
  name: "郑十",
  age: 27,
  gender: "0",
  hobby: "徒步 骑行 电影 台球 机车",
}, {
  userid: "haoyu",
  name: "浩宇",
  age: 24,
  gender: "0",
  hobby: "徒步",
}, {
  userid: "yize",
  name: "奕泽",
  age: 27,
  gender: "0",
  hobby: "徒步",
}];

let apps = {
  users: {
    app: {
      id: "users",
      name: "用户管理",
      schema: {
        key: "userid",
        items: [{
            id: "userid",
            label: "用户ID",
            type: "string", //string, option, number, date, time, month
            default: "",
            searchable: false,
            sortable: true,
            rules: [{
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
            label: " 姓名",
            type: "string",
            default: "",
            searchable: true,
            sortable: true,
            rules: [{
              type: "fullcode",
            }, ],
          },
          {
            id: "age",
            label: "年龄",
            type: "number",
            default: 1,
            searchable: true,
            sortable: true,
            rules: [{
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
            rules: [{
              type: "fullcode",
            }, ],
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
    },
  },
};

let board_one = {
  title: "用户信息",
  name: 'users',
  columns: 3,
  items: [[{
    title: '简介',
    type: 'html',
    name: 'desc',
    draggable: true,
    params: {
      html: '员工总数6000，男性员工5000人，女性1000人。'
    }
  },{
    title: "女性员工",
    type: 'rows',
    name: 'female',
    draggable: true,
    params: {
      appid: 'users',
      searching: {
        gender: ['1'],
      },
    },
  },{
    title: "黄姓员工",
    type: 'rows',
    name: 'huang',
    draggable: true,
    params: {
      appid: 'users',
      searching: {
        name: '黄',
      },
    },
  }],[{
    title: "男性员工",
    type: 'rows',
    name: 'male',
    draggable: true,
    params: {
      appid: 'users',
      searching: {
        gender: ['0'],
      },
    },
  }],[{
    title: "30-40岁员工",
    type: 'rows',
    name: '30-40',
    draggable: true,
    params: {
      appid: 'users',
      searching: {
        age: {
          min: 30,
          max: 40,
        },
      },
    },
  }]],
};

let board_two = {
  title: "用户信息",
  name: 'users',
  columns: 3,
  items: [[{
    title: '简介',
    type: 'html',
    name: 'desc',
    draggable: true,
    params: {
      html: '员工总数6000，男性员工5000人，女性1000人。'
    }
  },{
    title: "女性员工",
    type: 'rows',
    name: 'female',
    draggable: true,
    params: {
      appid: 'users',
      searching: {
        gender: ['1'],
      },
    },
  },{
    title: "黄姓员工",
    type: 'rows',
    name: 'huang',
    draggable: true,
    params: {
      appid: 'users',
      searching: {
        name: '黄',
      },
    },
  }],[{
    title: "男性员工",
    type: 'rows',
    name: 'male',
    draggable: true,
    params: {
      appid: 'users',
      searching: {
        gender: ['0'],
      },
    },
  }]],
};

let searching = {};
let retRows = [];

var isExistRow = function (val) {
  var bRet = false;
  rows.forEach((row) => {
    if (row.userid === val.userid) {
      bRet = true;
    }
  });
  return bRet;
};

var addRow = function (val) {
  var bRet = true;
  if (isExistRow(val)) {
    bRet = false;
  } else {
    rows.push(val);
  }
  return bRet;
};

var updateRow = function (val) {
  var bRet = true;
  if (isExistRow(val)) {
    for (let i = 0; i < rows.length; i++) {
      if (val.userid === rows[i].userid) {
        rows[i] = val;
        break;
      }
    }
  } else {
    bRet = false;
  }
  return bRet;
};

var deleteRow = function (val) {
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].userid === val.userid) {
      rows.splice(i, 1);
      break;
    }
  }
};

var deleteRows = function (vals) {
  var bRet = true;
  for (let i = 0; i < vals.length; i++) {
    deleteRow(vals[i]);
  }
  return bRet;
};

var searchRows = function (searching) {
  let app = apps.users.app;
  let retRows = rows;
  for (let i = 0; i < app.schema.items.length; i++) {
    let item = app.schema.items[i];
    if (item.searchable) {
      switch (item.type) {
        case "string": {
          if (searching[item.id] !== void 0 && searching[item.id].length > 0) {
            retRows = retRows.filter((row) => {
              let bRet = false;
              if (row[item.id].indexOf(searching[item.id]) !== -1) {
                bRet = true;
              }
              return bRet;
            });
          }
          break;
        }
        case "number": {
          if (searching[item.id] !== void 0) {
            let numberSearching = searching[item.id];
            if (
              numberSearching.min !== void 0 &&
              numberSearching.max === void 0
            ) {
              retRows = retRows.filter((row) => {
                return row[item.id] >= numberSearching.min;
              });
            }

            if (
              numberSearching.min === void 0 &&
              numberSearching.max !== void 0
            ) {
              retRows = retRows.filter((row) => {
                return row[item.id] <= numberSearching.max;
              });
            }

            if (
              numberSearching.min !== void 0 &&
              numberSearching.max !== void 0
            ) {
              retRows = retRows.filter((row) => {
                return (
                  row[item.id] >= numberSearching.min &&
                  row[item.id] <= numberSearching.max
                );
              });
            }
          }
          break;
        }
        case "option": {
          if (searching[item.id] !== void 0 && searching[item.id].length > 0) {
            retRows = retRows.filter((row) => {
              let bRet = false;
              if (searching[item.id].includes(row[item.id])) {
                bRet = true;
              }
              return bRet;
            });
          }
          break;
        }
      }
    }
  }
  return retRows;
};

export default {
  installData: function (mock) {
    mock.onGet("/apps").reply(200, {
      apps: [{
          id: "users",
          name: "用户管理",
        },
        {
          id: "books",
          name: "图书管理",
        },
      ],
    });
    mock
      .onGet("/app/schema", {
        params: {
          appid: "users"
        }
      })
      .reply(200, apps.users);
    mock.onGet("/app/users/items").reply(function (config) {
      let params = config.params;
      if (searching !== params.searching) {
        searching = params.searching;
        retRows = searchRows(searching);
      }
      return [
        200,
        {
          code: true,
          items: retRows.slice(params.start, params.start + params.count),
          length: retRows.length,
        },
      ];
    });
    mock.onAny("/app/users/add").reply(function (config) {
      let params = JSON.parse(config.data).params;
      var bRet = addRow(params);
      var msg = "add row is ok.";
      if (!bRet) {
        msg = "add row is not ok.";
      }
      return [
        200,
        {
          code: bRet,
          msg: msg,
        },
      ];
    });

    mock.onAny("/app/users/update").reply(function (config) {
      let params = JSON.parse(config.data).params;
      var bRet = updateRow(params);
      var msg = "update row is ok.";
      if (!bRet) {
        msg = "update row is not ok.";
      }
      return [
        200,
        {
          code: bRet,
          msg: msg,
        },
      ];
    });

    mock.onAny("/app/users/delete").reply(function (config) {
      let params = JSON.parse(config.data).params;
      var bRet = deleteRows(params);
      var msg = "delete rows is ok.";
      if (!bRet) {
        msg = "delete rows is not ok.";
      }
      return [
        200,
        {
          code: bRet,
          msg: msg,
        },
      ];
    });

    mock.onGet("/board", {
      params: {
        board: "users"
      }
    }).reply(function (config) {
      return [200, board_one];
    });
  },
};
