let board_one = {
  title: "用户信息",
  name: "rowusers",
  items: [
    [
      {
        title: "月收入",
        titleshow: false,
        type: "indicator",
        name: "monthly",
        params: {
          indicatorname: "月收入",
          indicatorvalue: "$ 20k",
          icon: "attach_money",
          bgcolor: "#546bfa",
        },
      },
      {
        title: "周销售",
        titleshow: false,
        type: "indicator",
        name: "weeklysales",
        params: {
          indicatorname: "周销售",
          icon: "bar_chart",
          indicatorvalue: "20",
          bgcolor: "#3a9688",
        },
      },
      {
        title: "新客户",
        titleshow: false,
        type: "indicator",
        name: "newcustomer",
        params: {
          indicatorname: "新用户",
          icon: "show_chart",
          indicatorvalue: "321",
          bgcolor: "#7cb342",
        },
      },
      {
        title: "活跃用户",
        titleshow: false,
        type: "indicator",
        name: "activeusers",
        params: {
          indicatorname: "活跃用户",
          icon: "person",
          indicatorvalue: "82",
          bgcolor: "#f88c2b",
        },
      },
    ],
    [
      {
        title: "简介",
        titleshow: false,
        type: "html",
        name: "desc",
        draggable: true,
        params: {
          html: "员工总数6000，男性员工5000人，女性1000人。",
        },
      },
      {
        title: "女性员工",
        titleshow: true,
        type: "rows",
        name: "female",
        draggable: true,
        params: {
          appid: "users",
          searching: {
            gender: ["1"],
          },
        },
      },
      {
        title: "李姓员工",
        titleshow: true,
        type: "rows",
        name: "huang",
        draggable: true,
        params: {
          appid: "users",
          searching: {
            name: "李",
          },
        },
      },
    ],
    [
      {
        title: "男性员工",
        titleshow: true,
        type: "rows",
        name: "male",
        draggable: true,
        params: {
          appid: "users",
          searching: {
            gender: ["0"],
          },
        },
      },
      {
        title: "张三教育经历",
        titleshow: true,
        type: "rows",
        name: "zhangsan",
        draggable: true,
        params: {
          appid: "educations",
          searching: {
            userid: "zhangsan",
          },
        },
      },
    ],
    [
      {
        title: "30-40岁员工",
        titleshow: false,
        type: "rows",
        name: "30-40",
        draggable: true,
        params: {
          appid: "users",
          searching: {
            age: {
              min: 30,
              max: 40,
            },
          },
        },
      },
      {
        title: "图片新闻",
        titleshow: false,
        type: "gallery",
        name: "image_news",
        draggable: true,
        params: {
          images: [
            {
              image: "https://cdn.quasar.dev/img/mountains.jpg",
              //link暂定，还未确定站点链接如何实现。
            },
            {
              image: "https://cdn.quasar.dev/img/parallax1.jpg",
              //link暂定，还未确定站点链接如何实现。
            },
            {
              image: "https://cdn.quasar.dev/img/parallax2.jpg",
              //link暂定，还未确定站点链接如何实现。
            },
            {
              image: "https://cdn.quasar.dev/img/quasar.jpg",
              //link暂定，还未确定站点链接如何实现。
            },
          ],
        },
      },
    ],
  ],
};

export default {
  installData: function (mock) {
    mock
      .onGet("/board", {
        params: {
          board: "rowusers",
        },
      })
      .reply(function (config) {
        return [200, board_one];
      });
  },
};
