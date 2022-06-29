import * as echarts from 'echarts'
let board_one = {
  title: '用户信息',
  name: 'users',
  columns: 3,
  items: [
    [
      {
        title: '简介',
        titleshow: false,
        type: 'html',
        name: 'desc',
        draggable: true,
        params: {
          html: '员工总数6000，男性员工5000人，女性1000人。'
        }
      },
      {
        title: '女性员工',
        titleshow: true,
        type: 'rows',
        name: 'female',
        draggable: true,
        params: {
          appid: 'users',
          searching: {
            gender: ['1']
          }
        }
      },
      {
        title: '李姓员工',
        titleshow: true,
        type: 'rows',
        name: 'huang',
        draggable: true,
        params: {
          appid: 'users',
          searching: {
            name: '李'
          }
        }
      }
    ],
    [
      {
        title: '男性员工',
        titleshow: true,
        type: 'rows',
        name: 'male',
        draggable: true,
        params: {
          appid: 'users',
          searching: {
            gender: ['0']
          }
        }
      },
      {
        title: '张三教育经历',
        titleshow: true,
        type: 'rows',
        name: 'zhangsan',
        draggable: true,
        params: {
          appid: 'educations',
          searching: {
            userid: 'zhangsan'
          }
        }
      },
      {
        title: 'lineChart',
        titleshow: true,
        type: 'lineChart',
        name: 'desc',
        draggable: true,
        params: {
          options: {
            color: [
              '#80FFA5',
              '#00DDFF',
              '#37A2FF',
              '#FF0087',
              '#FFBF00',
              'red'
            ], // line1 line2 ... 的颜色
            // title: {
            //   text: 'Gradient Stacked Area Chart'
            // },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#80FFA5'
                }
              }
            },
            legend: {
              data: [
                'Line 1',
                'Line 2',
                'Line 3',
                'Line 4',
                'Line 5',
                'Line 6'
              ],
              bottom: 0
            },
            toolbox: {
              feature: {
                saveAsImage: {},
                dataView: { readOnly: false },
                restore: {}
              }
            },
            grid: {
              left: '5%',
              right: '4%',
              bottom: '20%',
              containLabel: false // 每个值显示节点
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: 'Line 1',
                type: 'line',
                stack: 'Total',
                smooth: true, // 平滑
                lineStyle: {
                  width: 0
                },
                showSymbol: false,
                areaStyle: {
                  opacity: 0.8,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: 'rgb(128, 255, 165)'
                    },
                    {
                      offset: 1,
                      color: 'rgb(1, 191, 236)'
                    }
                  ])
                },
                emphasis: {
                  focus: 'series'
                },
                data: [140, 232, 101, 264, 90, 340, 250]
              },
              {
                name: 'Line 2',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                  width: 0
                },
                showSymbol: false,
                areaStyle: {
                  opacity: 0.8,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: 'rgb(0, 221, 255)'
                    },
                    {
                      offset: 1,
                      color: 'rgb(77, 119, 255)'
                    }
                  ])
                },
                emphasis: {
                  focus: 'series'
                },
                data: [120, 282, 111, 234, 220, 340, 310]
              },
              {
                name: 'Line 3',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                  width: 0
                },
                showSymbol: false,
                areaStyle: {
                  opacity: 0.8,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: 'rgb(55, 162, 255)'
                    },
                    {
                      offset: 1,
                      color: 'rgb(116, 21, 219)'
                    }
                  ])
                },
                emphasis: {
                  focus: 'series'
                },
                data: [320, 132, 201, 334, 190, 130, 220]
              },
              {
                name: 'Line 4',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                  width: 0
                },
                showSymbol: false,
                areaStyle: {
                  opacity: 0.8,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: 'rgb(255, 0, 135)'
                    },
                    {
                      offset: 1,
                      color: 'rgb(135, 0, 157)'
                    }
                  ])
                },
                emphasis: {
                  focus: 'series'
                },
                data: [220, 402, 231, 134, 190, 230, 120]
              },
              {
                name: 'Line 5',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                  width: 0
                },
                showSymbol: false,
                label: {
                  show: true,
                  position: 'top'
                },
                areaStyle: {
                  opacity: 0.8,
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: 'rgb(255, 191, 0)'
                    },
                    {
                      offset: 1,
                      color: 'rgb(224, 62, 76)'
                    }
                  ])
                },
                emphasis: {
                  focus: 'series'
                },
                data: [220, 302, 181, 234, 210, 290, 150]
              },
              {
                name: 'Line 6',
                type: 'line',
                stack: 'Total',
                smooth: true,
                lineStyle: {
                  width: 0
                },
                showSymbol: false,
                label: {
                  show: true,
                  position: 'top'
                },
                areaStyle: {
                  opacity: 0.8,
                  color: 'red'
                },
                emphasis: {
                  focus: 'series'
                },
                data: [220, 302, 181, 234, 210, 290, 150]
              }
            ]
          }
        }
      }
    ],
    [
      {
        title: '30-40岁员工',
        titleshow: false,
        type: 'rows',
        name: '30-40',
        draggable: true,
        params: {
          appid: 'users',
          searching: {
            age: {
              min: 30,
              max: 40
            }
          }
        }
      },
      {
        title: '图片新闻',
        titleshow: false,
        type: 'gallery',
        name: 'image_news',
        draggable: true,
        params: {
          images: [
            {
              image: 'https://cdn.quasar.dev/img/mountains.jpg'
              //link暂定，还未确定站点链接如何实现。
            },
            {
              image: 'https://cdn.quasar.dev/img/parallax1.jpg'
              //link暂定，还未确定站点链接如何实现。
            },
            {
              image: 'https://cdn.quasar.dev/img/parallax2.jpg'
              //link暂定，还未确定站点链接如何实现。
            },
            {
              image: 'https://cdn.quasar.dev/img/quasar.jpg'
              //link暂定，还未确定站点链接如何实现。
            }
          ]
        }
      },
      {
        title: 'pieChart',
        titleshow: false,
        type: 'lineChart',
        name: 'desc',
        draggable: true,
        params: {
          options: {
            tooltip: {
              trigger: 'item'
            },
            series: [
              {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                  { value: 1048, name: 'Search Engine' },
                  { value: 735, name: 'Direct' },
                  { value: 580, name: 'Email' },
                  { value: 484, name: 'Union Ads' },
                  { value: 300, name: 'Video Ads' }
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }
        }
      }
    ]
  ]
}

let board_two = {
  title: '用户信息',
  name: 'users',
  columns: 3,
  items: [
    [
      {
        title: '简介',
        type: 'html',
        name: 'desc',
        draggable: true,
        params: {
          html: '员工总数6000，男性员工5000人，女性1000人。'
        }
      }
    ]
  ]
}

export default {
  installData: function (mock) {
    mock
      .onGet('/board', {
        params: {
          board: 'users'
        }
      })
      .reply(function (config) {
        return [200, board_one]
      })
  }
}
