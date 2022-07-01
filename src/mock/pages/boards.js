import * as echarts from 'echarts'
import { dates, data, calculateMA } from './echarts'
import { json } from './models/data'
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

let board_three = {
  title: '用户信息',
  name: 'users',
  columns: 3,
  items: [
    [
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
            toolbox: {
              feature: {
                saveAsImage: {},
                dataView: {
                  show: true,
                  readOnly: true,
                  optionToContent: function (options) {
                    var axisData = options.xAxis[0].data
                    var series = options.series
                    var tdHeaders =
                      '<td style="padding: 10px 10px">监测时间</td>' //表头
                    series.forEach(function (item) {
                      tdHeaders +=
                        '<td style="padding: 10px 10px">' + item.name + '</td>' //组装表头
                    })
                    let table = `<table border="1" style="margin-left:20px;border-collapse:collapse;font-size:14px;text-align:center"><tbody><tr>${tdHeaders} </tr>`
                    var tdBodys = '' //数据
                    for (let i = 0, l = axisData.length; i < l; i++) {
                      for (let j = 0; j < series.length; j++) {
                        tdBodys += '<td>' + series[j].data[i] + '℃' + '</td>' //组装表数据
                      }
                      table +=
                        '<tr><td style="padding: 10px 10px">' +
                        axisData[i] +
                        '</td>' +
                        tdBodys +
                        '</tr>'
                      tdBodys = ''
                    }
                    table += '</tbody></table></div>'
                    return table
                  }
                },
                restore: {}
              }
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
      },
      {
        title: 'lineChart',
        titleshow: true,
        type: 'lineChart',
        name: 'desc',
        draggable: true,
        params: {
          options: {
            xAxis: {
              scale: true
            },
            yAxis: {
              scale: true
            },
            series: [
              {
                type: 'effectScatter',
                symbolSize: 20,
                data: [
                  [172.7, 105.2],
                  [153.4, 42]
                ]
              },
              {
                type: 'scatter',
                // prettier-ignore
                data: [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
                          [170.0, 59.0], [159.1, 47.6], [166.0, 69.8], [176.2, 66.8], [160.2, 75.2],
                          [172.5, 55.2], [170.9, 54.2], [172.9, 62.5], [153.4, 42.0], [160.0, 50.0],
                          [147.2, 49.8], [168.2, 49.2], [175.0, 73.2], [157.0, 47.8], [167.6, 68.8],
                          [159.5, 50.6], [175.0, 82.5], [166.8, 57.2], [176.5, 87.8], [170.2, 72.8],
                          [174.0, 54.5], [173.0, 59.8], [179.9, 67.3], [170.5, 67.8], [160.0, 47.0],
                          [154.4, 46.2], [162.0, 55.0], [176.5, 83.0], [160.0, 54.4], [152.0, 45.8],
                          [162.1, 53.6], [170.0, 73.2], [160.2, 52.1], [161.3, 67.9], [166.4, 56.6],
                          [168.9, 62.3], [163.8, 58.5], [167.6, 54.5], [160.0, 50.2], [161.3, 60.3],
                          [167.6, 58.3], [165.1, 56.2], [160.0, 50.2], [170.0, 72.9], [157.5, 59.8],
                          [167.6, 61.0], [160.7, 69.1], [163.2, 55.9], [152.4, 46.5], [157.5, 54.3],
                          [168.3, 54.8], [180.3, 60.7], [165.5, 60.0], [165.0, 62.0], [164.5, 60.3],
                          [156.0, 52.7], [160.0, 74.3], [163.0, 62.0], [165.7, 73.1], [161.0, 80.0],
                          [162.0, 54.7], [166.0, 53.2], [174.0, 75.7], [172.7, 61.1], [167.6, 55.7],
                          [151.1, 48.7], [164.5, 52.3], [163.5, 50.0], [152.0, 59.3], [169.0, 62.5],
                          [164.0, 55.7], [161.2, 54.8], [155.0, 45.9], [170.0, 70.6], [176.2, 67.2],
                          [170.0, 69.4], [162.5, 58.2], [170.3, 64.8], [164.1, 71.6], [169.5, 52.8],
                          [163.2, 59.8], [154.5, 49.0], [159.8, 50.0], [173.2, 69.2], [170.0, 55.9],
                          [161.4, 63.4], [169.0, 58.2], [166.2, 58.6], [159.4, 45.7], [162.5, 52.2],
                          [159.0, 48.6], [162.8, 57.8], [159.0, 55.6], [179.8, 66.8], [162.9, 59.4],
                          [161.0, 53.6], [151.1, 73.2], [168.2, 53.4], [168.9, 69.0], [173.2, 58.4],
                          [171.8, 56.2], [178.0, 70.6], [164.3, 59.8], [163.0, 72.0], [168.5, 65.2],
                          [166.8, 56.6], [172.7, 105.2], [163.5, 51.8], [169.4, 63.4], [167.8, 59.0],
                          [159.5, 47.6], [167.6, 63.0], [161.2, 55.2], [160.0, 45.0], [163.2, 54.0],
                          [162.2, 50.2], [161.3, 60.2], [149.5, 44.8], [157.5, 58.8], [163.2, 56.4],
                          [172.7, 62.0], [155.0, 49.2], [156.5, 67.2], [164.0, 53.8], [160.9, 54.4],
                          [162.8, 58.0], [167.0, 59.8], [160.0, 54.8], [160.0, 43.2], [168.9, 60.5],
                          [158.2, 46.4], [156.0, 64.4], [160.0, 48.8], [167.1, 62.2], [158.0, 55.5],
                          [167.6, 57.8], [156.0, 54.6], [162.1, 59.2], [173.4, 52.7], [159.8, 53.2],
                          [170.5, 64.5], [159.2, 51.8], [157.5, 56.0], [161.3, 63.6], [162.6, 63.2],
                          [160.0, 59.5], [168.9, 56.8], [165.1, 64.1], [162.6, 50.0], [165.1, 72.3],
                          [166.4, 55.0], [160.0, 55.9], [152.4, 60.4], [170.2, 69.1], [162.6, 84.5],
                          [170.2, 55.9], [158.8, 55.5], [172.7, 69.5], [167.6, 76.4], [162.6, 61.4],
                          [167.6, 65.9], [156.2, 58.6], [175.2, 66.8], [172.1, 56.6], [162.6, 58.6],
                          [160.0, 55.9], [165.1, 59.1], [182.9, 81.8], [166.4, 70.7], [165.1, 56.8],
                          [177.8, 60.0], [165.1, 58.2], [175.3, 72.7], [154.9, 54.1], [158.8, 49.1],
                          [172.7, 75.9], [168.9, 55.0], [161.3, 57.3], [167.6, 55.0], [165.1, 65.5],
                          [175.3, 65.5], [157.5, 48.6], [163.8, 58.6], [167.6, 63.6], [165.1, 55.2],
                          [165.1, 62.7], [168.9, 56.6], [162.6, 53.9], [164.5, 63.2], [176.5, 73.6],
                          [168.9, 62.0], [175.3, 63.6], [159.4, 53.2], [160.0, 53.4], [170.2, 55.0],
                          [162.6, 70.5], [167.6, 54.5], [162.6, 54.5], [160.7, 55.9], [160.0, 59.0],
                          [157.5, 63.6], [162.6, 54.5], [152.4, 47.3], [170.2, 67.7], [165.1, 80.9],
                          [172.7, 70.5], [165.1, 60.9], [170.2, 63.6], [170.2, 54.5], [170.2, 59.1],
                          [161.3, 70.5], [167.6, 52.7], [167.6, 62.7], [165.1, 86.3], [162.6, 66.4],
                          [152.4, 67.3], [168.9, 63.0], [170.2, 73.6], [175.2, 62.3], [175.2, 57.7],
                          [160.0, 55.4], [165.1, 104.1], [174.0, 55.5], [170.2, 77.3], [160.0, 80.5],
                          [167.6, 64.5], [167.6, 72.3], [167.6, 61.4], [154.9, 58.2], [162.6, 81.8],
                          [175.3, 63.6], [171.4, 53.4], [157.5, 54.5], [165.1, 53.6], [160.0, 60.0],
                          [174.0, 73.6], [162.6, 61.4], [174.0, 55.5], [162.6, 63.6], [161.3, 60.9],
                          [156.2, 60.0], [149.9, 46.8], [169.5, 57.3], [160.0, 64.1], [175.3, 63.6],
                          [169.5, 67.3], [160.0, 75.5], [172.7, 68.2], [162.6, 61.4], [157.5, 76.8],
                          [176.5, 71.8], [164.4, 55.5], [160.7, 48.6], [174.0, 66.4], [163.8, 67.3]
                      ]
              }
            ]
          }
        }
      }
    ],
    [
      {
        title: '简介',
        titleshow: false,
        type: 'lineChart',
        name: 'desc',
        draggable: true,
        params: {
          options: {
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                  color: 'rgba(180, 180, 180, 0.2)'
                }
              }
            ]
          }
        }
      },
      {
        title: '简介',
        titleshow: false,
        type: 'lineChart',
        name: 'desc',
        draggable: true,
        params: {
          options: {
            legend: {
              data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],
              inactiveColor: '#777'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                animation: false,
                type: 'cross',
                lineStyle: {
                  color: '#376df4',
                  width: 2,
                  opacity: 1
                }
              }
            },
            xAxis: {
              type: 'category',
              data: dates,
              axisLine: { lineStyle: { color: '#8392A5' } }
            },
            yAxis: {
              scale: true,
              axisLine: { lineStyle: { color: '#8392A5' } },
              splitLine: { show: false }
            },
            grid: {
              bottom: 80
            },
            dataZoom: [
              {
                textStyle: {
                  color: '#8392A5'
                },
                handleIcon:
                  'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                dataBackground: {
                  areaStyle: {
                    color: '#8392A5'
                  },
                  lineStyle: {
                    opacity: 0.8,
                    color: '#8392A5'
                  }
                },
                brushSelect: true
              },
              {
                type: 'inside'
              }
            ],
            series: [
              {
                type: 'candlestick',
                name: 'Day',
                data: data,
                itemStyle: {
                  color: '#FD1050',
                  color0: '#0CF49B',
                  borderColor: '#FD1050',
                  borderColor0: '#0CF49B'
                }
              },
              {
                name: 'MA5',
                type: 'line',
                data: calculateMA(5, data),
                smooth: true,
                showSymbol: false,
                lineStyle: {
                  width: 1
                }
              },
              {
                name: 'MA10',
                type: 'line',
                data: calculateMA(10, data),
                smooth: true,
                showSymbol: false,
                lineStyle: {
                  width: 1
                }
              },
              {
                name: 'MA20',
                type: 'line',
                data: calculateMA(20, data),
                smooth: true,
                showSymbol: false,
                lineStyle: {
                  width: 1
                }
              },
              {
                name: 'MA30',
                type: 'line',
                data: calculateMA(30, data),
                smooth: true,
                showSymbol: false,
                lineStyle: {
                  width: 1
                }
              }
            ]
          }
        }
      },
      {
        title: '简介',
        titleshow: false,
        type: 'lineChart',
        name: 'desc',
        draggable: true,
        params: {
          options: {
            tooltip: {
              trigger: 'axis'
            },

            legend: {
              left: 'center',
              data: [
                'A Software',
                'A Phone',
                'Another Phone',
                'Precipitation',
                'Evaporation'
              ]
            },
            radar: [
              {
                indicator: [
                  { text: 'Brand', max: 100 },
                  { text: 'Content', max: 100 },
                  { text: 'Usability', max: 100 },
                  { text: 'Function', max: 100 }
                ],
                center: ['25%', '40%'],
                radius: 80
              },
              {
                indicator: [
                  { text: 'Look', max: 100 },
                  { text: 'Photo', max: 100 },
                  { text: 'System', max: 100 },
                  { text: 'Performance', max: 100 },
                  { text: 'Screen', max: 100 }
                ],
                radius: 80,
                center: ['50%', '60%']
              },
              {
                indicator: (function () {
                  var res = []
                  for (var i = 1; i <= 12; i++) {
                    res.push({ text: i + '月', max: 100 })
                  }
                  return res
                })(),
                center: ['75%', '40%'],
                radius: 80
              }
            ],
            series: [
              {
                type: 'radar',
                tooltip: {
                  trigger: 'item'
                },
                areaStyle: {},
                data: [
                  {
                    value: [60, 73, 85, 40],
                    name: 'A Software'
                  }
                ]
              },
              {
                type: 'radar',
                radarIndex: 1,
                areaStyle: {},
                data: [
                  {
                    value: [85, 90, 90, 95, 95],
                    name: 'A Phone'
                  },
                  {
                    value: [95, 80, 95, 90, 93],
                    name: 'Another Phone'
                  }
                ]
              },
              {
                type: 'radar',
                radarIndex: 2,
                areaStyle: {},
                data: [
                  {
                    name: 'Precipitation',
                    value: [
                      2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8,
                      6.0, 2.3
                    ]
                  },
                  {
                    name: 'Evaporation',
                    value: [
                      2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0,
                      6.4, 3.3
                    ]
                  }
                ]
              }
            ]
          }
        }
      }
    ],
    [
      {
        title: '简介',
        titleshow: false,
        type: 'lineChart',
        name: 'desc',
        draggable: true,
        params: {
          options: {
            title: {
              text: 'NPM Dependencies'
            },
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [
              {
                type: 'graph',
                layout: 'none',
                // progressiveThreshold: 700,
                data: json.nodes.map(function (node) {
                  return {
                    x: node.x,
                    y: node.y,
                    id: node.id,
                    name: node.label,
                    symbolSize: node.size,
                    itemStyle: {
                      color: node.color
                    }
                  }
                }),
                edges: json.edges.map(function (edge) {
                  return {
                    source: edge.sourceID,
                    target: edge.targetID
                  }
                }),
                emphasis: {
                  focus: 'adjacency',
                  label: {
                    position: 'right',
                    show: true
                  }
                },
                roam: true,
                lineStyle: {
                  width: 0.5,
                  curveness: 0.3,
                  opacity: 0.7
                }
              }
            ]
          }
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

    mock
      .onGet('/board', {
        params: {
          board: 'echarts'
        }
      })
      .reply(function (config) {
        return [200, board_three]
      })
  }
}
